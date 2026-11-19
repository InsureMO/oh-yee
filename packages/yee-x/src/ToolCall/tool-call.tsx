import { Tooltip } from '@rainbow-oh/yee-c';
import clsx from 'clsx';
import {
  Check,
  ChevronDown,
  CircleDashed,
  Copy,
  Loader2,
  RotateCcw,
  X,
} from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { copyText } from '../utils/clipboard';
import { formatSeconds } from '../utils/duration';
import {
  ToolCallGroupProps,
  ToolCallLocale,
  ToolCallProps,
  ToolCallSemanticType,
  ToolCallStatus,
} from './interface';
import './style/index.less';

const defaultLocale: Required<ToolCallLocale> = {
  arguments: 'Arguments',
  result: 'Result',
  error: 'Error',
  retry: 'Retry',
  statusPending: 'Pending',
  statusRunning: 'Running',
  statusSuccess: 'Done',
  statusError: 'Failed',
};

function stringify(value: unknown): string {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}


const statusLocaleKey: Record<ToolCallStatus, keyof ToolCallLocale> = {
  pending: 'statusPending',
  running: 'statusRunning',
  success: 'statusSuccess',
  error: 'statusError',
};

const StatusIcon: React.FC<{ status: ToolCallStatus; prefixCls: string }> = ({
  status,
  prefixCls,
}) => {
  switch (status) {
    case 'success':
      return <Check size={13} />;
    case 'error':
      return <X size={13} />;
    case 'pending':
      return <CircleDashed size={13} />;
    default:
      return <Loader2 size={13} className={`${prefixCls}-spin`} />;
  }
};
/** Section with a label, a copy button and a pre-formatted payload */
const Section: React.FC<{
  prefixCls: string;
  label: string;
  payload: unknown;
  kind: 'args' | 'result' | 'error';
  classNames?: Partial<Record<ToolCallSemanticType, string>>;
  styles?: Partial<Record<ToolCallSemanticType, React.CSSProperties>>;
}> = ({ prefixCls, label, payload, kind, classNames, styles }) => {
  const [copied, setCopied] = useState(false);
  const text = useMemo(() => stringify(payload), [payload]);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    const ok = await copyText(text);
    if (ok) {
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <div
      className={clsx(`${prefixCls}-section`, `${prefixCls}-section-${kind}`, classNames?.section)}
      style={styles?.section}
    >
      <div className={`${prefixCls}-section-head`}>
        <span
          className={clsx(`${prefixCls}-section-label`, classNames?.['section-label'])}
          style={styles?.['section-label']}
        >
          {label}
        </span>
        <button
          type="button"
          className={clsx(`${prefixCls}-section-copy`, classNames?.['section-copy'])}
          style={styles?.['section-copy']}
          aria-label={`Copy ${label}`}
          onClick={handleCopy}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      </div>
      <pre
        className={clsx(`${prefixCls}-pre`, classNames?.pre)}
        style={styles?.pre}
      >
        {text}
      </pre>
    </div>
  );
};

const InternalToolCall = (props: ToolCallProps) => {
  const {
    prefixCls = 'yee-toolcall',
    className,
    style,
    classNames,
    styles,
    status = 'running',
    name,
    icon,
    title,
    args,
    result,
    error,
    duration: durationProp,
    startTime,
    collapsible = true,
    collapsed: collapsedProp,
    defaultCollapsed = true,
    onCollapseChange,
    onRetry,
    locale: localeProp,
  } = props;

  const locale = useMemo(() => ({ ...defaultLocale, ...localeProp }), [localeProp]);

  // ---- live timer while running ----
  const [elapsed, setElapsed] = useState(0);
  const liveTimer = status === 'running' && startTime !== undefined;

  useEffect(() => {
    if (!liveTimer) return;
    setElapsed((Date.now() - startTime) / 1000);
    const timer = setInterval(() => {
      setElapsed((Date.now() - startTime) / 1000);
    }, 1000);
    return () => clearInterval(timer);
  }, [liveTimer, startTime]);

  const duration = liveTimer ? elapsed : durationProp;

  // ---- collapse ----
  const [innerCollapsed, setInnerCollapsed] = useState(defaultCollapsed);
  const collapsed = collapsedProp ?? innerCollapsed;

  const toggleCollapsed = () => {
    const next = !collapsed;
    setInnerCollapsed(next);
    onCollapseChange?.(next);
  };

  const hasBody = args !== undefined || result !== undefined || error !== undefined;
  const showBody = hasBody && (collapsible ? !collapsed : true);

  return (
    <div
      className={clsx(
        prefixCls,
        `${prefixCls}-${status}`,
        className,
        classNames?.root,
      )}
      style={{ ...style, ...styles?.root }}
      data-status={status}
    >
      <div
        className={clsx(
          `${prefixCls}-header`,
          collapsible && hasBody && 'clickable',
          classNames?.header,
        )}
        style={styles?.header}
        onClick={collapsible && hasBody ? toggleCollapsed : undefined}
      >
        <span className={clsx(`${prefixCls}-icon`, classNames?.icon)} style={styles?.icon}>
          {icon ?? <StatusIcon status={status} prefixCls={prefixCls} />}
        </span>
        {title !== undefined ? (
          <span className={clsx(`${prefixCls}-name`, classNames?.name)} style={styles?.name}>
            {title}
          </span>
        ) : (
          <>
            <span className={clsx(`${prefixCls}-name`, classNames?.name)} style={styles?.name}>
              {name}
            </span>
            <span className={clsx(`${prefixCls}-status`, classNames?.status)} style={styles?.status}>
              {locale[statusLocaleKey[status]]}
            </span>
          </>
        )}
        {duration !== undefined && (
          <span
            className={clsx(`${prefixCls}-duration`, classNames?.duration)}
            style={styles?.duration}
          >
            {liveTimer ? `${Math.floor(duration)}s` : formatSeconds(duration)}
          </span>
        )}
        {status === 'error' && onRetry && (
          <Tooltip title={locale.retry}>
            <button
              type="button"
              className={`${prefixCls}-retry`}
              aria-label={locale.retry}
              onClick={(e) => {
                e.stopPropagation();
                onRetry();
              }}
            >
              <RotateCcw size={12} />
            </button>
          </Tooltip>
        )}
        {collapsible && hasBody && (
          <span
            className={clsx(
              `${prefixCls}-collapse`,
              collapsed && 'folded',
              classNames?.collapse,
            )}
            style={styles?.collapse}
            aria-label={collapsed ? 'Expand' : 'Collapse'}
            role="button"
          >
            <ChevronDown size={13} />
          </span>
        )}
      </div>

      {showBody && (
        <div className={clsx(`${prefixCls}-body`, classNames?.body)} style={styles?.body}>
          {args !== undefined && (
            <Section
              prefixCls={prefixCls}
              kind="args"
              label={locale.arguments}
              payload={args}
              classNames={classNames}
              styles={styles}
            />
          )}
          {result !== undefined && (
            <Section
              prefixCls={prefixCls}
              kind="result"
              label={locale.result}
              payload={result}
              classNames={classNames}
              styles={styles}
            />
          )}
          {error !== undefined && (
            <Section
              prefixCls={prefixCls}
              kind="error"
              label={locale.error}
              payload={error}
              classNames={classNames}
              styles={styles}
            />
          )}
        </div>
      )}
    </div>
  );
};

const ToolCallGroup = (props: ToolCallGroupProps) => {
  const {
    prefixCls = 'yee-toolcall-group',
    className,
    style,
    classNames,
    styles,
    items,
    summary,
    collapsible = true,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    onCollapseChange,
  } = props;

  const [innerCollapsed, setInnerCollapsed] = useState(defaultCollapsed);
  const collapsed = collapsedProp ?? innerCollapsed;

  const toggleCollapsed = () => {
    const next = !collapsed;
    setInnerCollapsed(next);
    onCollapseChange?.(next);
  };

  const showItems = collapsible ? !collapsed : true;

  const autoSummary = useMemo(() => {
    const success = items.filter((item) => item.status === 'success').length;
    const failed = items.filter((item) => item.status === 'error').length;
    const running = items.filter((item) => item.status === 'running').length;
    const parts = [`${items.length} tool calls`];
    if (success) parts.push(`${success} success`);
    if (failed) parts.push(`${failed} failed`);
    if (running) parts.push(`${running} running`);
    return parts.join(' · ');
  }, [items]);

  return (
    <div
      className={clsx(prefixCls, className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      <div
        className={clsx(`${prefixCls}-summary`, collapsible && 'clickable', classNames?.summary)}
        style={styles?.summary}
        onClick={collapsible ? toggleCollapsed : undefined}
      >
        {summary ?? autoSummary}
        {collapsible && (
          <span
            className={clsx(`${prefixCls}-collapse`, collapsed && 'folded')}
            aria-label={collapsed ? 'Expand' : 'Collapse'}
            role="button"
          >
            <ChevronDown size={13} />
          </span>
        )}
      </div>
      {showItems && (
        <div className={clsx(`${prefixCls}-items`, classNames?.items)} style={styles?.items}>
          {items.map((item) => (
            <InternalToolCall key={item.id ?? item.name} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export type ToolCallType = typeof InternalToolCall & {
  Group: typeof ToolCallGroup;
};

const ToolCall = InternalToolCall as ToolCallType;

ToolCall.Group = ToolCallGroup;

export default ToolCall;
