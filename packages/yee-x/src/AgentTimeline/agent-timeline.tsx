import clsx from 'clsx';
import {
  ArrowLeftRight,
  Bot,
  Check,
  ChevronDown,
  CircleDashed,
  Loader2,
  MessageSquare,
  ShieldCheck,
  Wrench,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { formatSeconds } from '../utils/duration';
import { AgentEvent, AgentEventKind, AgentTimelineLocale, AgentTimelineProps } from './interface';
import './style/index.less';

const defaultLocale: Required<AgentTimelineLocale> = {
  subSteps: '{count} steps',
};

function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

const KindIcon: React.FC<{ kind: AgentEventKind }> = ({ kind }) => {
  switch (kind) {
    case 'agent':
      return <Bot size={12} />;
    case 'tool':
      return <Wrench size={12} />;
    case 'approval':
      return <ShieldCheck size={12} />;
    case 'handoff':
      return <ArrowLeftRight size={12} />;
    default:
      return <MessageSquare size={12} />;
  }
};

const StatusIcon: React.FC<{ status: string; spinCls: string }> = ({ status, spinCls }) => {
  switch (status) {
    case 'success':
      return <Check size={10} />;
    case 'error':
      return <X size={10} />;
    case 'running':
      return <Loader2 size={10} className={spinCls} />;
    default:
      return <CircleDashed size={10} />;
  }
};

const AgentTimeline = (props: AgentTimelineProps) => {
  const {
    prefixCls = 'yee-agent-timeline',
    className,
    style,
    classNames,
    styles,
    events,
    defaultExpandedKeys = [],
    defaultExpandAll = false,
    showTimestamp = true,
    locale: localeProp,
  } = props;

  const locale = { ...defaultLocale, ...localeProp };

  const keyOf = (event: AgentEvent, path: string, i: number) => event.key ?? `e-${path}-${i}`;

  const collectChildKeys = (list: Array<AgentEvent>, path: string): Array<React.Key> => {
    const keys: Array<React.Key> = [];
    list.forEach((event, i) => {
      if (event.children?.length) {
        const key = keyOf(event, path, i);
        keys.push(key);
        keys.push(...collectChildKeys(event.children, `${path}-${i}`));
      }
    });
    return keys;
  };

  const [expandedKeys, setExpandedKeys] = useState<Array<React.Key>>(() =>
    defaultExpandAll ? collectChildKeys(events, '0') : defaultExpandedKeys,
  );

  const toggle = (key: React.Key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const renderEvents = (list: Array<AgentEvent>, path: string) =>
    list.map((event, i) => {
      const key = keyOf(event, path, i);
      const status = event.status ?? 'success';
      const hasChildren = Boolean(event.children?.length);
      const expanded = expandedKeys.includes(key);

      return (
        <div
          key={key}
          className={clsx(
            `${prefixCls}-event`,
            `${prefixCls}-event-${status}`,
            classNames?.event,
          )}
          style={styles?.event}
        >
          <span className={clsx(`${prefixCls}-event-rail`, `${prefixCls}-event-icon`, classNames?.['event-icon'])} style={styles?.['event-icon']}>
            <KindIcon kind={event.kind ?? 'note'} />
            <span className={`${prefixCls}-event-status`} style={styles?.['event-status']}>
              <StatusIcon status={status} spinCls={`${prefixCls}-spin`} />
            </span>
          </span>

          <div className={clsx(`${prefixCls}-event-main`, classNames?.['event-main'])} style={styles?.['event-main']}>
            <div className={clsx(`${prefixCls}-event-head`, classNames?.['event-head'])} style={styles?.['event-head']}>
              {event.agent && (
                <span
                  className={clsx(`${prefixCls}-event-agent`, classNames?.['event-agent'])}
                  style={styles?.['event-agent']}
                >
                  {event.agent}
                </span>
              )}
              <span
                className={clsx(`${prefixCls}-event-title`, classNames?.['event-title'])}
                style={styles?.['event-title']}
              >
                {event.title}
              </span>
              {event.duration !== undefined && (
                <span
                  className={clsx(`${prefixCls}-event-duration`, classNames?.['event-duration'])}
                  style={styles?.['event-duration']}
                >
                  {formatSeconds(event.duration)}
                </span>
              )}
              {showTimestamp && event.timestamp !== undefined && (
                <span
                  className={clsx(`${prefixCls}-event-time`, classNames?.['event-time'])}
                  style={styles?.['event-time']}
                >
                  {formatTimestamp(event.timestamp)}
                </span>
              )}
              {hasChildren && (
                <button
                  type="button"
                  className={clsx(
                    `${prefixCls}-event-expand`,
                    expanded && 'open',
                    classNames?.['event-expand'],
                  )}
                  style={styles?.['event-expand']}
                  onClick={() => toggle(key)}
                >
                  <ChevronDown size={12} />
                  {locale.subSteps.replace('{count}', String(event.children!.length))}
                </button>
              )}
            </div>

            {event.detail && (
              <div
                className={clsx(`${prefixCls}-event-detail`, classNames?.['event-detail'])}
                style={styles?.['event-detail']}
              >
                {event.detail}
              </div>
            )}

            {hasChildren && expanded && (
              <div
                className={clsx(`${prefixCls}-event-children`, classNames?.['event-children'])}
                style={styles?.['event-children']}
              >
                {renderEvents(event.children!, `${path}-${i}`)}
              </div>
            )}
          </div>
        </div>
      );
    });

  return (
    <div className={clsx(prefixCls, className, classNames?.root)} style={{ ...style, ...styles?.root }}>
      {renderEvents(events, '0')}
    </div>
  );
};

export default AgentTimeline;
