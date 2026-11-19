import React from 'react';

export type MessageActionsSemanticType =
  | 'root'
  | 'item'
  | 'item-icon'
  | 'item-label'
  | 'version'
  | 'version-text'
  | 'extra';

export type MessageActionFeedback = 'like' | 'dislike';

export interface MessageActionsLocale {
  /** Tooltip for the copy button */
  copy?: string;
  /** Tooltip shown on the copy button after a successful copy */
  copied?: string;
  /** Tooltip for the regenerate button */
  regenerate?: string;
  /** Tooltip for the like button */
  like?: string;
  /** Tooltip for the dislike button */
  dislike?: string;
  /** Tooltip for the read-aloud button */
  readAloud?: string;
  /** Tooltip for the read-aloud button while speaking */
  stop?: string;
  /** Tooltip for the previous-version button */
  prevVersion?: string;
  /** Tooltip for the next-version button */
  nextVersion?: string;
}

export interface MessageActionsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onCopy'> {
  /** Custom class name prefix @default 'yee-message-actions' */
  prefixCls?: string;
  /** Class names for semantic sections */
  classNames?: Partial<Record<MessageActionsSemanticType, string>>;
  /** Inline styles for semantic sections */
  styles?: Partial<Record<MessageActionsSemanticType, React.CSSProperties>>;
  /**
   * Text used by the built-in copy button. When omitted the button only
   * renders if `onCopy` is provided (consumer-owned copy logic).
   */
  text?: string;
  /**
   * Called when the copy button is clicked. When `text` is provided the
   * component writes it to the clipboard first; `succeeded` reports whether
   * that write worked (always `true` when the consumer owns copying).
   */
  onCopy?: (text: string | undefined, succeeded: boolean) => void;
  /** Show a spinning regenerate button; the button renders when `onRegenerate` is set */
  regenerating?: boolean;
  /** Called when the regenerate button is clicked */
  onRegenerate?: () => void;
  /** Current answer version, 1-based. Uncontrolled when omitted */
  version?: number;
  /** Initial version for the uncontrolled mode @default 1 */
  defaultVersion?: number;
  /** Total number of answer versions. The switcher renders when `total > 1` */
  total?: number;
  /** Called when the version changes via the prev/next buttons */
  onVersionChange?: (version: number) => void;
  /** Controlled feedback state; uncontrolled when omitted */
  feedback?: MessageActionFeedback;
  /** Initial feedback for the uncontrolled mode */
  defaultFeedback?: MessageActionFeedback;
  /**
   * Called with the new feedback value. Clicking the active button clears it
   * and the callback receives `undefined`.
   */
  onFeedbackChange?: (feedback?: MessageActionFeedback) => void;
  /**
   * Called when the read-aloud button toggles. The button renders when this
   * prop is set.
   */
  onReadAloud?: (speaking: boolean) => void;
  /** Controlled speaking state; uncontrolled when omitted */
  speaking?: boolean;
  /** Custom actions appended after the built-in ones */
  extra?: React.ReactNode;
  /** Locale overrides for built-in tooltips */
  locale?: MessageActionsLocale;
}
