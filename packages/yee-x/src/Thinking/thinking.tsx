import clsx from 'clsx';
import { Check, ChevronDown, CircleDashed, Loader2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useMemo, useState } from 'react';
import { formatClock } from '../utils/duration';
import { ThinkingLocale, ThinkingProps, ThinkingStatus } from './interface';
import './style/index.less';

const defaultLocale: Required<ThinkingLocale> = {
  thinking: 'Thinking…',
  success: 'Thought for a moment',
  error: 'Thinking failed',
  pending: 'Queued',
};

const StatusIcon: React.FC<{ status: ThinkingStatus; prefixCls: string }> = ({
  status,
  prefixCls,
}) => {
  switch (status) {
    case 'success':
      return <Check size={14} />;
    case 'error':
      return <X size={14} />;
    case 'pending':
      return <CircleDashed size={14} />;
    default:
      return <Loader2 size={14} className={`${prefixCls}-status-spin`} />;
  }
};

const Thinking = (props: ThinkingProps) => {
  const {
    prefixCls = 'yee-thinking',
    className,
    style,
    classNames,
    styles,
    status = 'thinking',
    label,
    duration: durationProp,
    steps,
    content,
    collapsible = true,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    onCollapseChange,
    extra,
    locale: localeProp,
  } = props;

  const locale = useMemo(() => ({ ...defaultLocale, ...localeProp }), [localeProp]);

  // ---- live timer while thinking ----
  const [elapsed, setElapsed] = useState(0);
  const liveTimer = status === 'thinking' && durationProp === undefined;

  useEffect(() => {
    if (!liveTimer) return;
    const startedAt = Date.now();
    setElapsed((Date.now() - startedAt) / 1000);
    const timer = setInterval(() => {
      setElapsed((Date.now() - startedAt) / 1000);
    }, 1000);
    return () => clearInterval(timer);
  }, [liveTimer]);

  // keep the counted time after the live timer stops, unless an explicit duration arrives
  const duration = liveTimer ? elapsed : durationProp ?? (elapsed > 0 ? elapsed : undefined);

  // ---- collapse ----
  const [innerCollapsed, setInnerCollapsed] = useState(defaultCollapsed);
  const collapsed = collapsedProp ?? innerCollapsed;

  const toggleCollapsed = () => {
    const next = !collapsed;
    setInnerCollapsed(next);
    onCollapseChange?.(next);
  };

  const defaultLabel = locale[status];
  const showBody = collapsible ? !collapsed : true;

  const renderSteps = () => {
    if (!steps?.length) return null;
    return (
      <div
        className={clsx(`${prefixCls}-steps`, classNames?.steps)}
        style={styles?.steps}
      >
        {steps.map((step, i) => {
          const key = step.key ?? i;
          const isLast = i === steps.length - 1;
          return (
            <motion.div
              key={key}
              className={clsx(`${prefixCls}-step`, classNames?.step)}
              style={styles?.step}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <span
                className={clsx(
                  `${prefixCls}-step-marker`,
                  isLast && status === 'thinking' && 'blinking',
                  classNames?.['step-marker'],
                )}
                style={styles?.['step-marker']}
              />
              <div className={`${prefixCls}-step-main`}>
                <div
                  className={clsx(`${prefixCls}-step-title`, classNames?.['step-title'])}
                  style={styles?.['step-title']}
                >
                  {step.title}
                </div>
                {step.content && (
                  <div
                    className={clsx(
                      `${prefixCls}-step-content`,
                      classNames?.['step-content'],
                    )}
                    style={styles?.['step-content']}
                  >
                    {step.content}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={clsx(
        prefixCls,
        `${prefixCls}-${status}`,
        className,
        classNames?.root,
      )}
      style={{ ...style, ...styles?.root }}
    >
      <div
        className={clsx(`${prefixCls}-header`, collapsible && 'clickable', classNames?.header)}
        style={styles?.header}
        onClick={collapsible ? toggleCollapsed : undefined}
      >
        <span
          className={clsx(`${prefixCls}-status`, classNames?.status)}
          style={styles?.status}
        >
          <StatusIcon status={status} prefixCls={prefixCls} />
        </span>
        <span
          className={clsx(`${prefixCls}-label`, classNames?.label)}
          style={styles?.label}
        >
          {label ?? defaultLabel}
        </span>
        {duration !== undefined && (
          <span
            className={clsx(`${prefixCls}-timer`, classNames?.timer)}
            style={styles?.timer}
          >
            {formatClock(duration)}
          </span>
        )}
        {extra}
        {collapsible && (
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
            <ChevronDown size={14} />
          </span>
        )}
      </div>

      <AnimatePresence initial={false}>
        {showBody && (
          <motion.div
            className={clsx(`${prefixCls}-body`, classNames?.body)}
            style={styles?.body}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {renderSteps()}
            {content && (
              <div
                className={clsx(`${prefixCls}-content`, classNames?.content)}
                style={styles?.content}
              >
                {content}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Thinking;
