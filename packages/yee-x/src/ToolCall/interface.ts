import React from 'react';

export type ToolCallStatus = 'pending' | 'running' | 'success' | 'error';

export type ToolCallSemanticType =
  | 'root'
  | 'header'
  | 'icon'
  | 'name'
  | 'status'
  | 'duration'
  | 'collapse'
  | 'body'
  | 'section'
  | 'section-label'
  | 'section-copy'
  | 'pre';

export interface ToolCallLocale {
  /** Section label for arguments */
  arguments?: string;
  /** Section label for the result */
  result?: string;
  /** Section label for an error */
  error?: string;
  /** Tooltip for the retry button */
  retry?: string;
  /** Status text fallbacks */
  statusPending?: string;
  statusRunning?: string;
  statusSuccess?: string;
  statusError?: string;
}

export interface ToolCallProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /** Custom class name prefix @default 'yee-toolcall' */
  prefixCls?: string;
  /** Class names for semantic sections */
  classNames?: Partial<Record<ToolCallSemanticType, string>>;
  /** Inline styles for semantic sections */
  styles?: Partial<Record<ToolCallSemanticType, React.CSSProperties>>;
  /** Current state of the call @default 'running' */
  status?: ToolCallStatus;
  /** Tool name shown in the summary line */
  name: string;
  /** Optional icon in front of the name */
  icon?: React.ReactNode;
  /**
   * Override for the whole summary line. By default the line is
   * `icon name · status · duration`.
   */
  title?: React.ReactNode;
  /** Arguments object; pretty-printed as JSON in the expandable body */
  args?: unknown;
  /** Result object; pretty-printed as JSON in the expandable body */
  result?: unknown;
  /** Error object; shown in its own section when status is 'error' */
  error?: unknown;
  /**
   * Elapsed seconds, shown in the header. While `status` is 'running' and
   * `startTime` is provided the component ticks live; otherwise the static
   * value is displayed.
   */
  duration?: number;
  /** Epoch ms when a running call started; enables the live timer */
  startTime?: number;
  /** Whether the body can be folded @default true */
  collapsible?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Initial collapsed state for the uncontrolled mode @default true */
  defaultCollapsed?: boolean;
  /** Called when the collapsed state changes */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Called when the retry button is clicked; the button renders on error when provided */
  onRetry?: () => void;
  /** Locale overrides for built-in labels */
  locale?: ToolCallLocale;
}

export interface ToolCallGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /** Custom class name prefix @default 'yee-toolcall-group' */
  prefixCls?: string;
  /** Class names for semantic sections */
  classNames?: Partial<Record<'root' | 'summary' | 'items', string>>;
  /** Inline styles for semantic sections */
  styles?: Partial<Record<'root' | 'summary' | 'items', React.CSSProperties>>;
  /** Tool calls to render */
  items: Array<ToolCallProps>;
  /** Override the auto summary, e.g. `3 tool calls · 2 success · 1 error` */
  summary?: React.ReactNode;
  /** Whether the group can be folded @default true */
  collapsible?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Initial collapsed state for the uncontrolled mode @default false */
  defaultCollapsed?: boolean;
  /** Called when the collapsed state changes */
  onCollapseChange?: (collapsed: boolean) => void;
}
