import React from 'react';

export type AgentEventKind = 'agent' | 'tool' | 'approval' | 'handoff' | 'note';
export type AgentEventStatus = 'pending' | 'running' | 'success' | 'error';

export interface AgentEvent {
  /** Stable key; falls back to the index */
  key?: React.Key;
  /** Agent name rendered as a chip on the event */
  agent?: React.ReactNode;
  /** Icon variant @default 'note' */
  kind?: AgentEventKind;
  /** One-line summary of what happened */
  title: React.ReactNode;
  /** Optional detail shown under the title */
  detail?: React.ReactNode;
  /** @default 'success' */
  status?: AgentEventStatus;
  /** Duration in seconds, shown next to the title */
  duration?: number;
  /** Nested events, e.g. a sub-agent's own run */
  children?: Array<AgentEvent>;
  /** Epoch ms, rendered as an HH:mm:ss clock when `showTimestamp` is on */
  timestamp?: number;
}

export type AgentTimelineSemanticType =
  | 'root'
  | 'event'
  | 'event-icon'
  | 'event-main'
  | 'event-head'
  | 'event-agent'
  | 'event-title'
  | 'event-status'
  | 'event-duration'
  | 'event-time'
  | 'event-expand'
  | 'event-detail'
  | 'event-children';

export interface AgentTimelineLocale {
  /** Template for the nested-run toggle, `{count}` is replaced */
  subSteps?: string;
}

export interface AgentTimelineProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Custom class name prefix @default 'yee-agent-timeline' */
  prefixCls?: string;
  /** Class names for semantic sections */
  classNames?: Partial<Record<AgentTimelineSemanticType, string>>;
  /** Inline styles for semantic sections */
  styles?: Partial<Record<AgentTimelineSemanticType, React.CSSProperties>>;
  /** Events in chronological order */
  events: Array<AgentEvent>;
  /** Nested runs collapsed unless their key is listed */
  defaultExpandedKeys?: Array<React.Key>;
  /** Expand every nested run initially @default false */
  defaultExpandAll?: boolean;
  /** Render HH:mm:ss timestamps when events carry `timestamp` @default true */
  showTimestamp?: boolean;
  /** Locale overrides for built-in labels */
  locale?: AgentTimelineLocale;
}
