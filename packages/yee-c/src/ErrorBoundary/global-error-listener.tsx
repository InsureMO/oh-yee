import React from 'react';
import { classifyError, CATEGORY_LABEL } from './classify';
import type { ErrorCategory } from './interface';

export interface GlobalErrorListenerProps {
  onError?: (params: {
    category: ErrorCategory;
    label: string;
    error: Error;
    source?: string;
  }) => void;
  children: React.ReactNode;
}

/**
 * Catches errors that ErrorBoundary cannot handle:
 * - window error (capture phase): synchronous errors in event handlers, resource load failures
 * - unhandledrejection: uncaught Promise rejections
 */
export default class GlobalErrorListener extends React.Component<
  GlobalErrorListenerProps
> {
  private handleErrorEvent = (event: ErrorEvent) => {
    const target = event.target as HTMLElement | null;
    // Resource load failure (img/script/link)
    if (
      target &&
      (target.tagName === 'IMG' ||
        target.tagName === 'SCRIPT' ||
        target.tagName === 'LINK')
    ) {
      const src =
        target.getAttribute('src') || target.getAttribute('href') || '';
      const error = new Error(
        `Resource failed to load: <${target.tagName.toLowerCase()}> ${src}`,
      );
      this.report('resource', error, src);
      event.preventDefault();
      return;
    }

    const error =
      event.error instanceof Error ? event.error : new Error(event.message);
    const category = classifyError(error);
    this.report(category, error, event.filename);
    event.preventDefault();
  };

  private handleRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    let error: Error;
    let category: ErrorCategory;

    if (reason instanceof Error) {
      category = classifyError(reason);
      error = reason;
    } else {
      category = 'unknown';
      error = new Error(
        typeof reason === 'string' ? reason : JSON.stringify(reason),
      );
    }

    this.report(category, error);
    event.preventDefault();
  };

  private report(category: ErrorCategory, error: Error, source?: string) {
    this.props.onError?.({
      category,
      label: CATEGORY_LABEL[category],
      error,
      source,
    });
  }

  componentDidMount() {
    window.addEventListener('error', this.handleErrorEvent, true);
    window.addEventListener('unhandledrejection', this.handleRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleErrorEvent, true);
    window.removeEventListener('unhandledrejection', this.handleRejection);
  }

  render() {
    return this.props.children;
  }
}
