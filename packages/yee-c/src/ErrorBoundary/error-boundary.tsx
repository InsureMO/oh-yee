import clsx from 'clsx';
import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  FileCode2,
  RefreshCw,
  X,
} from 'lucide-react';
import React from 'react';
import Button from '../Button';
import { pickDataAttrs } from '../utils/types';
import { CATEGORY_LABEL, classifyError } from './classify';
import type { ErrorBoundaryProps } from './interface';
import type { SourceLocation, SourceSnippet } from './source-loader';
import { fetchSourceSnippet, parseSourceLocation } from './source-loader';
import './style/index.less';

export interface ErrorBoundaryState {
  errored: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  copied: boolean;
  showCallStack: boolean;
  showComponentStack: boolean;
  sourceSnippet: SourceSnippet | null;
  sourceLocation: SourceLocation | null;
  copiedSection: 'callStack' | 'componentStack' | null;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      errored: false,
      error: null,
      errorInfo: null,
      copied: false,
      showCallStack: false,
      showComponentStack: false,
      sourceSnippet: null,
      sourceLocation: null,
      copiedSection: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { errored: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const sourceLocation = parseSourceLocation(error.stack);
    this.setState({ errorInfo, sourceLocation });

    if (sourceLocation) {
      fetchSourceSnippet(sourceLocation).then((snippet) => {
        if (snippet) {
          this.setState({ sourceSnippet: snippet });
        }
      });
    }

    this.props.onError?.({ error, errorInfo });
  }

  handleCopy = () => {
    const { error, errorInfo, sourceSnippet } = this.state;
    const category = classifyError(error);
    const text = [
      `[${CATEGORY_LABEL[category]}]`,
      error?.message || 'Something went wrong',
      '',
      'Call Stack:',
      error?.stack || '',
      '',
      'Component Stack:',
      errorInfo?.componentStack || '',
      '',
      sourceSnippet
        ? [
            'Source Code:',
            sourceSnippet.lines
              .map((l: { lineNo: number; content: string }) => {
                const marker = l.lineNo === sourceSnippet.errorLine ? '>' : ' ';
                return `${marker} ${String(l.lineNo).padStart(4)} | ${l.content}`;
              })
              .join('\n'),
          ].join('\n')
        : '',
    ]
      .filter(Boolean)
      .join('\n');
    navigator.clipboard.writeText(text).then(() => {
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    });
  };

  handleCopySection = (section: 'callStack' | 'componentStack') => {
    const { error, errorInfo } = this.state;
    const content =
      section === 'callStack' ? error?.stack : errorInfo?.componentStack;
    if (content) {
      navigator.clipboard.writeText(content).then(() => {
        this.setState({ copiedSection: section });
        setTimeout(() => this.setState({ copiedSection: null }), 2000);
      });
    }
  };

  handleRetry = () => {
    this.setState({
      errored: false,
      error: null,
      errorInfo: null,
      copied: false,
      showCallStack: false,
      showComponentStack: false,
      sourceSnippet: null,
      sourceLocation: null,
      copiedSection: null,
    });
  };

  handleDismiss = () => {
    this.setState({
      errored: false,
      error: null,
      errorInfo: null,
      sourceSnippet: null,
      sourceLocation: null,
      copiedSection: null,
    });
    this.props.onDismiss?.();
  };

  toggleCallStack = () => {
    this.setState((s) => ({ showCallStack: !s.showCallStack }));
  };

  toggleComponentStack = () => {
    this.setState((s) => ({ showComponentStack: !s.showComponentStack }));
  };

  render() {
    const {
      prefixCls = 'yee-error-boundary',
      className,
      style,
      renderError,
      children,
    } = this.props;
    const dataAttrs = pickDataAttrs(this.props as Record<string, unknown>);
    const {
      error,
      errorInfo,
      copied,
      showCallStack,
      showComponentStack,
      sourceSnippet,
      sourceLocation,
      copiedSection,
    } = this.state;

    if (this.state.errored) {
      if (renderError) {
        return (
          <div {...dataAttrs} className={className} style={style}>
            {renderError()}
          </div>
        );
      }

      const category = classifyError(error);

      return (
        <div
          {...dataAttrs}
          className={clsx(prefixCls, className)}
          style={style}
        >
          <div className={`${prefixCls}-overlay`}>
            <div className={`${prefixCls}-container`}>
              {/* Badge */}
              <div className={`${prefixCls}-badge`}>
                <AlertTriangle size={12} />
                {CATEGORY_LABEL[category]}
              </div>

              {/* Message */}
              <h1 className={`${prefixCls}-message`}>
                {error?.message || 'Something went wrong'}
              </h1>

              {/* Timestamp */}
              <div className={`${prefixCls}-timestamp`}>
                {new Date().toLocaleString()}
              </div>

              {/* Source Code */}
              {sourceSnippet && (
                <div className={`${prefixCls}-section`}>
                  <div className={`${prefixCls}-source-header`}>
                    <FileCode2 size={14} />
                    <span className={`${prefixCls}-source-file`}>
                      {sourceLocation?.fileName?.split('/').slice(-2).join('/')}
                    </span>
                    <span className={`${prefixCls}-source-line`}>
                      :{sourceSnippet.errorLine}
                    </span>
                  </div>
                  <div className={`${prefixCls}-source`}>
                    {sourceSnippet.lines.map((l) => (
                      <div
                        key={l.lineNo}
                        className={clsx(`${prefixCls}-source-line-el`, {
                          [`${prefixCls}-source-line-error`]:
                            l.lineNo === sourceSnippet.errorLine,
                        })}
                      >
                        <span className={`${prefixCls}-source-gutter`}>
                          {l.lineNo === sourceSnippet.errorLine ? '>' : ''}
                        </span>
                        <span className={`${prefixCls}-source-num`}>
                          {l.lineNo}
                        </span>
                        <span className={`${prefixCls}-source-text`}>
                          {l.content}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Call Stack */}
              {error?.stack && (
                <div className={`${prefixCls}-section`}>
                  <div className={`${prefixCls}-section-header`}>
                    <button
                      className={`${prefixCls}-section-toggle`}
                      onClick={this.toggleCallStack}
                      type="button"
                    >
                      {showCallStack ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                      Call Stack
                    </button>
                    <button
                      className={`${prefixCls}-section-copy`}
                      onClick={() => this.handleCopySection('callStack')}
                      type="button"
                    >
                      {copiedSection === 'callStack' ? (
                        <Check size={13} />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                  {showCallStack && (
                    <pre className={`${prefixCls}-stack`}>{error.stack}</pre>
                  )}
                </div>
              )}

              {/* Component Stack */}
              {errorInfo?.componentStack && (
                <div className={`${prefixCls}-section`}>
                  <div className={`${prefixCls}-section-header`}>
                    <button
                      className={`${prefixCls}-section-toggle`}
                      onClick={this.toggleComponentStack}
                      type="button"
                    >
                      {showComponentStack ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                      Component Stack
                    </button>
                    <button
                      className={`${prefixCls}-section-copy`}
                      onClick={() => this.handleCopySection('componentStack')}
                      type="button"
                    >
                      {copiedSection === 'componentStack' ? (
                        <Check size={13} />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                  {showComponentStack && (
                    <pre className={`${prefixCls}-stack`}>
                      {errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className={`${prefixCls}-actions`}>
                <Button
                  variant="solid"
                  color="danger"
                  onClick={this.handleRetry}
                  icon={<RefreshCw size={14} />}
                >
                  Retry
                </Button>
                <Button
                  variant="outlined"
                  ghost
                  onClick={this.handleCopy}
                  icon={copied ? <Check size={14} /> : <Copy size={14} />}
                >
                  {copied ? 'Copied!' : 'Copy Error'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={this.handleDismiss}
                  icon={<X size={14} />}
                  className={`${prefixCls}-dismiss`}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}
