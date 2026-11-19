import React from 'react';

export type ThinkingStatus = 'pending' | 'thinking' | 'success' | 'error';

export type ThinkingSemanticType =
  | 'root'
  | 'header'
  | 'status'
  | 'label'
  | 'timer'
  | 'collapse'
  | 'body'
  | 'steps'
  | 'step'
  | 'step-marker'
  | 'step-title'
  | 'step-content'
  | 'content';

export interface ThinkingStep {
  /** Stable key; falls back to the index */
  key?: React.Key;
  /** One-line summary of what the model is doing */
  title: React.ReactNode;
  /** Optional detail shown under the title */
  content?: React.ReactNode;
}

export interface ThinkingLocale {
  /** Default label while status is 'thinking' */
  thinking?: string;
  /** Default label while status is 'success' */
  success?: string;
  /** Default label while status is 'error' */
  error?: string;
  /** Default label while status is 'pending' */
  pending?: string;
}

export interface ThinkingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'content'> {
  /** Custom class name prefix @default 'yee-thinking' */
  prefixCls?: string;
  /** Class names for semantic sections */
  classNames?: Partial<Record<ThinkingSemanticType, string>>;
  /** Inline styles for semantic sections */
  styles?: Partial<Record<ThinkingSemanticType, React.CSSProperties>>;
  /** Current state of the reasoning process @default 'thinking' */
  status?: ThinkingStatus;
  /** Header label. Falls back to a locale string based on `status` */
  label?: React.ReactNode;
  /**
   * Elapsed time in seconds, shown as a `m:ss` chip. While `status` is
   * 'thinking' and this is omitted the component counts from mount.
   */
  duration?: number;
  /** Steps that appear one by one as the model works */
  steps?: Array<ThinkingStep>;
  /** Free-form reasoning content shown under the steps */
  content?: React.ReactNode;
  /** Whether the body can be folded @default true */
  collapsible?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Initial collapsed state for the uncontrolled mode @default false */
  defaultCollapsed?: boolean;
  /** Called when the collapsed state changes */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Content appended to the header row */
  extra?: React.ReactNode;
  /** Locale overrides for the default labels */
  locale?: ThinkingLocale;
}
