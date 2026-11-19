import React from 'react';

export type ApprovalRisk = 'low' | 'medium' | 'high';
export type ApprovalDecision = 'approved' | 'denied';
export type ApprovalScope = 'once' | 'session' | 'always';
/** Resolved states include the automatic expiry outcome */
export type ApprovalStatus = ApprovalDecision | 'expired';

export type ApprovalCardSemanticType =
  | 'root'
  | 'head'
  | 'agent'
  | 'title'
  | 'risk'
  | 'countdown'
  | 'description'
  | 'preview'
  | 'scopes'
  | 'scope'
  | 'actions'
  | 'resolved';

export interface ApprovalCardLocale {
  approve?: string;
  deny?: string;
  undo?: string;
  riskLow?: string;
  riskMedium?: string;
  riskHigh?: string;
  scopeOnce?: string;
  scopeSession?: string;
  scopeAlways?: string;
  approvedText?: string;
  deniedText?: string;
  expiredText?: string;
}

export interface ApprovalCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  /** Custom class name prefix @default 'yee-approval-card' */
  prefixCls?: string;
  /** Class names for semantic sections */
  classNames?: Partial<Record<ApprovalCardSemanticType, string>>;
  /** Inline styles for semantic sections */
  styles?: Partial<Record<ApprovalCardSemanticType, React.CSSProperties>>;
  /** What the agent wants to do, e.g. "Delete 3 rows from claims" */
  title: React.ReactNode;
  /** Who is asking; rendered as a chip in the header */
  agent?: React.ReactNode;
  /** Why it is needed */
  description?: React.ReactNode;
  /** Payload preview shown above the actions */
  preview?: React.ReactNode;
  /** Risk badge in the corner @default 'medium' */
  risk?: ApprovalRisk;
  /**
   * Countdown in seconds before the request auto-expires (resolved as
   * denied). Pauses while the pointer hovers the card.
   */
  countdown?: number;
  /** Called when the countdown reaches zero */
  onExpire?: () => void;
  /**
   * Scope options rendered next to the approve button.
   * @default ['once', 'always']
   */
  scopes?: Array<ApprovalScope>;
  /** Initially selected scope @default scopes[0] */
  defaultScope?: ApprovalScope;
  /** Called when the user approves or denies */
  onDecide?: (decision: ApprovalDecision, scope: ApprovalScope) => void;
  /** Controlled resolved state; the component resolves internally when omitted */
  decision?: ApprovalStatus;
  /** Shows an undo button on the resolved row when provided */
  onUndo?: () => void;
  /** Extra content under the actions */
  footer?: React.ReactNode;
  /** Locale overrides for built-in labels */
  locale?: ApprovalCardLocale;
}
