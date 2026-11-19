import React from 'react';

export type AgentTaskStatus =
  | 'queued'
  | 'running'
  | 'waiting'
  | 'success'
  | 'failed'
  | 'cancelled';

export type AgentTaskStepStatus = 'pending' | 'running' | 'success' | 'error';

export interface AgentTaskStep {
  key?: React.Key;
  title: React.ReactNode;
  status?: AgentTaskStepStatus;
}

export interface AgentTask {
  /** Unique task id */
  key: string;
  title: React.ReactNode;
  status: AgentTaskStatus;
  /**
   * Epoch ms when the task entered its current phase; drives the live clock
   * for queued/running/waiting tasks.
   */
  createdAt?: number;
  /** Static duration in seconds, shown for finished tasks */
  duration?: number;
  /** Recent steps shown when the row unfolds */
  steps?: Array<AgentTaskStep>;
  /** Secondary line, e.g. the queue or model name */
  meta?: React.ReactNode;
}

export type AgentTaskFilter = AgentTaskStatus | 'all';

export type AgentTasksSemanticType =
  | 'root'
  | 'tabs'
  | 'tab'
  | 'tab-count'
  | 'list'
  | 'item'
  | 'item-status'
  | 'item-title'
  | 'item-meta'
  | 'item-time'
  | 'item-toggle'
  | 'item-actions'
  | 'steps'
  | 'step'
  | 'empty';

export interface AgentTasksLocale {
  all?: string;
  queued?: string;
  running?: string;
  waiting?: string;
  success?: string;
  failed?: string;
  cancelled?: string;
  approve?: string;
  reject?: string;
  retry?: string;
  open?: string;
  empty?: string;
}

export interface AgentTasksProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Custom class name prefix @default 'yee-agent-tasks' */
  prefixCls?: string;
  /** Class names for semantic sections */
  classNames?: Partial<Record<AgentTasksSemanticType, string>>;
  /** Inline styles for semantic sections */
  styles?: Partial<Record<AgentTasksSemanticType, React.CSSProperties>>;
  tasks: Array<AgentTask>;
  /** Controlled active filter */
  filter?: AgentTaskFilter;
  /** Initial filter for the uncontrolled mode @default 'all' */
  defaultFilter?: AgentTaskFilter;
  /** Called when the active filter changes */
  onFilterChange?: (filter: AgentTaskFilter) => void;
  /** Filter tabs to render; defaults to the statuses present in `tasks` */
  filters?: Array<AgentTaskStatus>;
  /** Renders Approve/Reject on waiting rows when provided */
  onApprove?: (task: AgentTask) => void;
  /** Renders Reject on waiting rows when provided */
  onReject?: (task: AgentTask) => void;
  /** Renders Retry on failed rows when provided */
  onRetry?: (task: AgentTask) => void;
  /** Renders Open on every row when provided */
  onOpen?: (task: AgentTask) => void;
  /** Controlled set of unfolded row keys */
  expandedKeys?: Array<React.Key>;
  /** Initial unfolded keys for the uncontrolled mode */
  defaultExpandedKeys?: Array<React.Key>;
  /** Called when a row unfolds or folds */
  onExpandedKeysChange?: (keys: Array<React.Key>) => void;
  /** Empty-state content; defaults to `locale.empty` */
  empty?: React.ReactNode;
  /** Locale overrides for built-in labels */
  locale?: AgentTasksLocale;
}
