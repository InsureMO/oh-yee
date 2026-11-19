import { Tooltip } from '@rainbow-oh/yee-c';
import clsx from 'clsx';
import { CheckCircle2, Clock, Undo2, XCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { formatClock } from '../utils/duration';
import {
  ApprovalCardLocale,
  ApprovalCardProps,
  ApprovalDecision,
  ApprovalRisk,
  ApprovalScope,
  ApprovalStatus,
} from './interface';
import './style/index.less';

const defaultLocale: Required<ApprovalCardLocale> = {
  approve: 'Approve',
  deny: 'Deny',
  undo: 'Undo',
  riskLow: 'Low risk',
  riskMedium: 'Medium risk',
  riskHigh: 'High risk',
  scopeOnce: 'Once',
  scopeSession: 'This session',
  scopeAlways: 'Always',
  approvedText: 'Approved',
  deniedText: 'Denied',
  expiredText: 'Expired without approval',
};

const riskLocaleKey: Record<ApprovalRisk, keyof ApprovalCardLocale> = {
  low: 'riskLow',
  medium: 'riskMedium',
  high: 'riskHigh',
};

const scopeLocaleKey: Record<ApprovalScope, keyof ApprovalCardLocale> = {
  once: 'scopeOnce',
  session: 'scopeSession',
  always: 'scopeAlways',
};

const ResolvedIcon: React.FC<{ status: ApprovalStatus; prefixCls: string }> = ({
  status,
  prefixCls,
}) => {
  if (status === 'approved') return <CheckCircle2 size={14} />;
  if (status === 'expired') return <Clock size={14} className={`${prefixCls}-resolved-amber`} />;
  return <XCircle size={14} />;
};

const ApprovalCard = (props: ApprovalCardProps) => {
  const {
    prefixCls = 'yee-approval-card',
    className,
    style,
    classNames,
    styles,
    title,
    agent,
    description,
    preview,
    risk = 'medium',
    countdown: countdownProp,
    onExpire,
    scopes = ['once', 'always'],
    defaultScope,
    onDecide,
    decision: decisionProp,
    onUndo,
    footer,
    locale: localeProp,
  } = props;

  const locale = { ...defaultLocale, ...localeProp };

  // ---- resolution ----
  const [innerDecision, setInnerDecision] = useState<ApprovalStatus | null>(null);
  const decision = decisionProp ?? innerDecision;
  const resolved = decision !== null && decision !== undefined;

  const [scope, setScope] = useState<ApprovalScope>(defaultScope ?? scopes[0] ?? 'once');

  const decide = (next: ApprovalDecision) => {
    const effectiveScope = scope ?? 'once';
    setInnerDecision(next);
    onDecide?.(next, effectiveScope);
  };

  // ---- pausing countdown ----
  const [remaining, setRemaining] = useState(countdownProp ?? 0);
  const remainingRef = useRef(countdownProp ?? 0);
  const paused = useRef(false);

  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  // arm (or re-arm, e.g. after undo reopens the card) the countdown.
  // All side effects live in the interval callback — state updaters stay
  // pure so StrictMode's double invocation can't fire onExpire twice.
  useEffect(() => {
    if (resolved || countdownProp === undefined) return;
    remainingRef.current = countdownProp;
    setRemaining(countdownProp);
    const timer = setInterval(() => {
      if (paused.current) return;
      remainingRef.current = Math.max(0, remainingRef.current - 1);
      const next = remainingRef.current;
      if (next <= 0) {
        clearInterval(timer);
        setRemaining(0);
        setInnerDecision('expired');
        onExpireRef.current?.();
      } else {
        setRemaining(next);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [resolved, countdownProp]);

  const urgency =
    countdownProp !== undefined && countdownProp > 0 && remaining <= Math.min(10, countdownProp / 3)
      ? 'urgent'
      : undefined;

  return (
    <div
      className={clsx(
        prefixCls,
        resolved && `${prefixCls}-${decision}`,
        className,
        classNames?.root,
      )}
      style={{ ...style, ...styles?.root }}
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      {resolved ? (
        <div className={clsx(`${prefixCls}-resolved`, classNames?.resolved)} style={styles?.resolved}>
          <ResolvedIcon status={decision!} prefixCls={prefixCls} />
          <span className={`${prefixCls}-resolved-title`}>{title}</span>
          <span className={`${prefixCls}-resolved-text`}>
            {locale[decision === 'approved' ? 'approvedText' : decision === 'denied' ? 'deniedText' : 'expiredText']}
          </span>
          {onUndo && (
            <Tooltip title={locale.undo}>
              <button
                type="button"
                className={`${prefixCls}-undo`}
                aria-label={locale.undo}
                onClick={() => {
                  // uncontrolled mode: undo revokes the decision and reopens
                  // the card (the re-arm effect restarts the countdown);
                  // controlled mode stays resolved until the consumer clears
                  // the decision prop
                  setInnerDecision(null);
                  onUndo();
                }}
              >
                <Undo2 size={13} />
              </button>
            </Tooltip>
          )}
        </div>
      ) : (
        <>
          <div className={clsx(`${prefixCls}-head`, classNames?.head)} style={styles?.head}>
            {agent && (
              <span className={clsx(`${prefixCls}-agent`, classNames?.agent)} style={styles?.agent}>
                {agent}
              </span>
            )}
            <span
              className={clsx(`${prefixCls}-title`, classNames?.title)}
              style={styles?.title}
            >
              {title}
            </span>
            <span
              className={clsx(`${prefixCls}-risk`, `${prefixCls}-risk-${risk}`, classNames?.risk)}
              style={styles?.risk}
            >
              {locale[riskLocaleKey[risk]]}
            </span>
          </div>

          {countdownProp !== undefined && (
            <div className={`${prefixCls}-countdown-row`}>
              <span
                className={clsx(
                  `${prefixCls}-countdown`,
                  urgency,
                  classNames?.countdown,
                )}
                style={styles?.countdown}
              >
                {formatClock(remaining)}
              </span>
            </div>
          )}

          {description && (
            <div
              className={clsx(`${prefixCls}-description`, classNames?.description)}
              style={styles?.description}
            >
              {description}
            </div>
          )}

          {preview && (
            <div
              className={clsx(`${prefixCls}-preview`, classNames?.preview)}
              style={styles?.preview}
            >
              {preview}
            </div>
          )}

          {scopes.length > 1 && (
            <div className={clsx(`${prefixCls}-scopes`, classNames?.scopes)} style={styles?.scopes}>
              {scopes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={clsx(
                    `${prefixCls}-scope`,
                    scope === s && 'active',
                    classNames?.scope,
                  )}
                  style={styles?.scope}
                  aria-pressed={scope === s}
                  onClick={() => setScope(s)}
                >
                  {locale[scopeLocaleKey[s]]}
                </button>
              ))}
            </div>
          )}

          <div className={clsx(`${prefixCls}-actions`, classNames?.actions)} style={styles?.actions}>
            <button
              type="button"
              className={`${prefixCls}-btn ${prefixCls}-btn-deny`}
              onClick={() => decide('denied')}
            >
              {locale.deny}
            </button>
            <button
              type="button"
              className={`${prefixCls}-btn ${prefixCls}-btn-approve`}
              onClick={() => decide('approved')}
            >
              {locale.approve}
            </button>
          </div>

          {footer}
        </>
      )}
    </div>
  );
};

export default ApprovalCard;
