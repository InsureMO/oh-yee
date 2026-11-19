import clsx from 'clsx';
import {
  Check,
  ChevronDown,
  CircleDashed,
  Clock,
  ExternalLink,
  PauseCircle,
  Play,
  Square,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { formatCompactDuration } from '../utils/duration';
import {
  AgentTask,
  AgentTaskFilter,
  AgentTaskStatus,
  AgentTasksLocale,
  AgentTasksProps,
} from './interface';
import './style/index.less';

const defaultLocale: Required<AgentTasksLocale> = {
  all: 'All',
  queued: 'Queued',
  running: 'Running',
  waiting: 'Waiting',
  success: 'Done',
  failed: 'Failed',
  cancelled: 'Cancelled',
  approve: 'Approve',
  reject: 'Reject',
  retry: 'Retry',
  open: 'Open',
  empty: 'No tasks',
};

const statusLocaleKey: Record<AgentTaskStatus, keyof AgentTasksLocale> = {
  queued: 'queued',
  running: 'running',
  waiting: 'waiting',
  success: 'success',
  failed: 'failed',
  cancelled: 'cancelled',
};

const ALL_STATUSES: Array<AgentTaskStatus> = [
  'queued',
  'running',
  'waiting',
  'success',
  'failed',
  'cancelled',
];

const StatusIcon: React.FC<{ status: AgentTaskStatus }> = ({ status }) => {
  switch (status) {
    case 'success':
      return <Check size={13} />;
    case 'failed':
      return <XCircle size={13} />;
    case 'cancelled':
      return <Square size={11} />;
    case 'waiting':
      return <PauseCircle size={13} />;
    case 'queued':
      return <Clock size={13} />;
    case 'running':
      return <Play size={12} />;
    default:
      return <CircleDashed size={13} />;
  }
};

const AgentTasks = (props: AgentTasksProps) => {
  const {
    prefixCls = 'yee-agent-tasks',
    className,
    style,
    classNames,
    styles,
    tasks,
    filter: filterProp,
    defaultFilter = 'all',
    onFilterChange,
    filters: filtersProp,
    onApprove,
    onReject,
    onRetry,
    onOpen,
    expandedKeys: expandedProp,
    defaultExpandedKeys = [],
    onExpandedKeysChange,
    empty,
    locale: localeProp,
  } = props;

  const locale = { ...defaultLocale, ...localeProp };

  // ---- filter ----
  const [innerFilter, setInnerFilter] = useState<AgentTaskFilter>(defaultFilter);
  const filter = filterProp ?? innerFilter;

  const filters = useMemo(
    () =>
      filtersProp ?? ALL_STATUSES.filter((status) => tasks.some((task) => task.status === status)),
    [filtersProp, tasks],
  );

  const counts = useMemo(() => {
    const map = new Map<AgentTaskStatus, number>();
    tasks.forEach((task) => map.set(task.status, (map.get(task.status) ?? 0) + 1));
    return map;
  }, [tasks]);

  const changeFilter = (next: AgentTaskFilter) => {
    setInnerFilter(next);
    onFilterChange?.(next);
  };

  const visibleTasks = useMemo(
    () => (filter === 'all' ? tasks : tasks.filter((task) => task.status === filter)),
    [tasks, filter],
  );

  // ---- expand ----
  const [innerExpanded, setInnerExpanded] = useState<Array<React.Key>>(defaultExpandedKeys);
  const expanded = expandedProp ?? innerExpanded;

  const toggleExpand = (key: React.Key) => {
    const next = expanded.includes(key)
      ? expanded.filter((k) => k !== key)
      : [...expanded, key];
    setInnerExpanded(next);
    onExpandedKeysChange?.(next);
  };

  // ---- live clock ----
  const [, setTick] = useState(0);

  useEffect(() => {
    // tick only when some row actually renders the live clock (i.e. no
    // static duration overriding it)
    const hasLive = tasks.some(
      (task) =>
        task.createdAt !== undefined &&
        task.duration === undefined &&
        (task.status === 'running' || task.status === 'waiting' || task.status === 'queued'),
    );
    if (!hasLive) return;
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [tasks]);

  const liveSeconds = (task: AgentTask) =>
    task.createdAt !== undefined ? (Date.now() - task.createdAt) / 1000 : undefined;

  return (
    <div
      className={clsx(prefixCls, className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      <div className={clsx(`${prefixCls}-tabs`, classNames?.tabs)} style={styles?.tabs}>
        <button
          type="button"
          className={clsx(`${prefixCls}-tab`, filter === 'all' && 'active', classNames?.tab)}
          style={styles?.tab}
          onClick={() => changeFilter('all')}
        >
          {locale.all}
          <span className={clsx(`${prefixCls}-tab-count`, classNames?.['tab-count'])} style={styles?.['tab-count']}>
            {tasks.length}
          </span>
        </button>
        {filters.map((status) => (
          <button
            key={status}
            type="button"
            className={clsx(
              `${prefixCls}-tab`,
              `${prefixCls}-tab-${status}`,
              filter === status && 'active',
              classNames?.tab,
            )}
            style={styles?.tab}
            onClick={() => changeFilter(status)}
          >
            {locale[statusLocaleKey[status]]}
            <span
              className={clsx(`${prefixCls}-tab-count`, classNames?.['tab-count'])}
              style={styles?.['tab-count']}
            >
              {counts.get(status) ?? 0}
            </span>
          </button>
        ))}
      </div>

      {visibleTasks.length === 0 ? (
        <div className={clsx(`${prefixCls}-empty`, classNames?.empty)} style={styles?.empty}>
          {empty ?? locale.empty}
        </div>
      ) : (
        <div className={clsx(`${prefixCls}-list`, classNames?.list)} style={styles?.list}>
          {visibleTasks.map((task) => {
            const expandedRow = expanded.includes(task.key);
            const hasSteps = Boolean(task.steps?.length);
            const live = liveSeconds(task);
            return (
              <div key={task.key} className={clsx(`${prefixCls}-item`, classNames?.item)} style={styles?.item}>
                <div className={`${prefixCls}-item-row`}>
                  <span
                    className={clsx(
                      `${prefixCls}-item-status`,
                      `${prefixCls}-item-status-${task.status}`,
                      classNames?.['item-status'],
                    )}
                    style={styles?.['item-status']}
                  >
                    <StatusIcon status={task.status} />
                    {locale[statusLocaleKey[task.status]]}
                  </span>
                  <span
                    className={clsx(`${prefixCls}-item-title`, classNames?.['item-title'])}
                    style={styles?.['item-title']}
                  >
                    {task.title}
                  </span>
                  {task.meta && (
                    <span
                      className={clsx(`${prefixCls}-item-meta`, classNames?.['item-meta'])}
                      style={styles?.['item-meta']}
                    >
                      {task.meta}
                    </span>
                  )}
                  {task.duration !== undefined ? (
                    <span
                      className={clsx(`${prefixCls}-item-time`, classNames?.['item-time'])}
                      style={styles?.['item-time']}
                    >
                      {formatCompactDuration(task.duration)}
                    </span>
                  ) : (
                    live !== undefined && (
                      <span
                        className={clsx(`${prefixCls}-item-time`, classNames?.['item-time'])}
                        style={styles?.['item-time']}
                      >
                        {formatCompactDuration(live)}
                      </span>
                    )
                  )}

                  <span
                    className={clsx(
                      `${prefixCls}-item-actions`,
                      classNames?.['item-actions'],
                    )}
                    style={styles?.['item-actions']}
                  >
                    {task.status === 'waiting' && onApprove && (
                      <button
                        type="button"
                        className={`${prefixCls}-action ${prefixCls}-action-approve`}
                        onClick={() => onApprove(task)}
                      >
                        {locale.approve}
                      </button>
                    )}
                    {task.status === 'waiting' && onReject && (
                      <button
                        type="button"
                        className={`${prefixCls}-action ${prefixCls}-action-reject`}
                        onClick={() => onReject(task)}
                      >
                        {locale.reject}
                      </button>
                    )}
                    {task.status === 'failed' && onRetry && (
                      <button type="button" className={`${prefixCls}-action`} onClick={() => onRetry(task)}>
                        {locale.retry}
                      </button>
                    )}
                    {onOpen && (
                      <button
                        type="button"
                        className={`${prefixCls}-action-icon`}
                        aria-label={locale.open}
                        title={locale.open}
                        onClick={() => onOpen(task)}
                      >
                        <ExternalLink size={12} />
                      </button>
                    )}
                    {hasSteps && (
                      <button
                        type="button"
                        className={clsx(
                          `${prefixCls}-item-toggle`,
                          expandedRow && 'open',
                          classNames?.['item-toggle'],
                        )}
                        style={styles?.['item-toggle']}
                        aria-label={expandedRow ? 'Collapse' : 'Expand'}
                        onClick={() => toggleExpand(task.key)}
                      >
                        <ChevronDown size={13} />
                      </button>
                    )}
                  </span>
                </div>

                {hasSteps && expandedRow && (
                  <div className={clsx(`${prefixCls}-steps`, classNames?.steps)} style={styles?.steps}>
                    {task.steps!.map((step, i) => (
                      <div
                        key={step.key ?? i}
                        className={clsx(
                          `${prefixCls}-step`,
                          `${prefixCls}-step-${step.status ?? 'pending'}`,
                          classNames?.step,
                        )}
                        style={styles?.step}
                      >
                        <span className={`${prefixCls}-step-dot`} />
                        <span className={`${prefixCls}-step-title`}>{step.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AgentTasks;
