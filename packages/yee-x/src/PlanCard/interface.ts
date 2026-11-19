import React from 'react';

export type PlanStepStatus = 'pending' | 'running' | 'success' | 'error' | 'skipped';

export type PlanCardMode = 'review' | 'run';

export type PlanCardSemanticType =
  | 'root'
  | 'header'
  | 'title'
  | 'collapse'
  | 'body'
  | 'step'
  | 'step-index'
  | 'step-title'
  | 'step-desc'
  | 'step-status'
  | 'step-duration'
  | 'step-actions'
  | 'footer'
  | 'add-step';

export interface PlanStep {
  /** Stable key; falls back to the index */
  key?: React.Key;
  /** One line describing the step */
  title: string;
  /** Optional longer explanation */
  description?: React.ReactNode;
  /**
   * Explicit status. In run mode statuses are otherwise derived from the
   * `current` cursor: steps before it run count as success, after as pending.
   */
  status?: PlanStepStatus;
  /** Static duration in seconds, shown once the step settled */
  duration?: number;
}

export interface PlanCardLocale {
  /** Confirm button in review mode */
  run?: string;
  /** Cancel button in review mode */
  cancel?: string;
  /** "Add step" row in review mode */
  addStep?: string;
  /** Tooltip for the retry button on a failed step */
  retry?: string;
  /** Input placeholder while renaming */
  titlePlaceholder?: string;
  /** Title of steps appended via "Add step" */
  newStep?: string;
  /** Collapse aria-label */
  collapse?: string;
  /** Expand aria-label */
  expand?: string;
}

export interface PlanCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  /** Custom class name prefix @default 'yee-plan-card' */
  prefixCls?: string;
  /** Class names for semantic sections */
  classNames?: Partial<Record<PlanCardSemanticType, string>>;
  /** Inline styles for semantic sections */
  styles?: Partial<Record<PlanCardSemanticType, React.CSSProperties>>;
  /** Plan steps */
  steps: Array<PlanStep>;
  /**
   * `review` shows an editable checklist with a confirm button;
   * `run` shows live execution tracking. @default 'review'
   */
  mode?: PlanCardMode;
  /** Header title */
  title?: React.ReactNode;
  /** Whether the body can be folded @default false */
  collapsible?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Initial collapsed state for the uncontrolled mode @default false */
  defaultCollapsed?: boolean;
  /** Called when the collapsed state changes */
  onCollapseChange?: (collapsed: boolean) => void;

  // ---- review mode ----
  /**
   * Allow renaming, reordering, removing and adding steps while reviewing.
   * @default true in review mode
   */
  editable?: boolean;
  /** Called after any step edit (rename, reorder, remove, add) */
  onStepsChange?: (steps: Array<PlanStep>) => void;
  /** Called by the confirm button with the final steps */
  onConfirm?: (steps: Array<PlanStep>) => void;
  /** Renders a cancel button next to confirm when provided */
  onCancel?: () => void;

  // ---- run mode ----
  /**
   * Index of the running step. Steps before it show as success, after it as
   * pending; per-step `status` overrides the derivation.
   */
  current?: number;
  /** Epoch ms when the current step started; enables the live per-step timer */
  startedAt?: number;
  /** Called when the retry button of a failed step is clicked */
  onStepRetry?: (index: number) => void;
  /** Called when a step row is clicked */
  onStepClick?: (index: number) => void;

  /** Locale overrides for built-in labels */
  locale?: PlanCardLocale;
}
