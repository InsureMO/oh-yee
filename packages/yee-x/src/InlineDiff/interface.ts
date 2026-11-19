import React from 'react';

export type DiffDecision = 'accepted' | 'rejected';

export type InlineDiffSemanticType =
  | 'root'
  | 'toolbar'
  | 'text'
  | 'del'
  | 'ins';

export interface InlineDiffLocale {
  acceptAll?: string;
  rejectAll?: string;
  reset?: string;
  /** Tooltip on a pending change, `{action}` becomes Accept/Reject */
  pendingHint?: string;
  acceptedHint?: string;
  rejectedHint?: string;
}

export interface InlineDiffProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  /** Custom class name prefix @default 'yee-inline-diff' */
  prefixCls?: string;
  /** Class names for semantic sections */
  classNames?: Partial<Record<InlineDiffSemanticType, string>>;
  /** Inline styles for semantic sections */
  styles?: Partial<Record<InlineDiffSemanticType, React.CSSProperties>>;
  /** Original text */
  original: string;
  /** AI-proposed text */
  modified: string;
  /**
   * Controlled decisions per change id. Ids are stable positional indices
   * (`"0"`, `"1"`, …) emitted through `onDecide`.
   */
  decisions?: Record<string, DiffDecision>;
  /** Initial decisions for the uncontrolled mode */
  defaultDecisions?: Record<string, DiffDecision>;
  /** Called when one change is decided */
  onDecide?: (id: string, decision: DiffDecision | undefined) => void;
  /** Called with the resolved text after any decision changes */
  onResolve?: (text: string) => void;
  /** Show the Accept all / Reject all / Reset toolbar @default true */
  showToolbar?: boolean;
  /** Locale overrides for built-in labels */
  locale?: InlineDiffLocale;
}
