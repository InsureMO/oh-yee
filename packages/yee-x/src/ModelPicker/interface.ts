import React from 'react';

export type ThinkingEffort = 'low' | 'medium' | 'high';

export interface AIModel {
  /** Unique model id */
  id: string;
  /** Display name */
  name: React.ReactNode;
  /** Optional group label, e.g. "Claude" */
  group?: string;
  /** Quality score 0-100 */
  quality?: number;
  /** Speed score 0-100 */
  speed?: number;
  /** Relative cost score 0-100 (higher = pricier) */
  cost?: number;
  /** Supports extended thinking; renders the toggle + effort control */
  thinking?: boolean;
  /** Static info line, e.g. "200k context" */
  meta?: React.ReactNode;
  /** Typical first-token latency line, e.g. "~0.9s" */
  firstToken?: React.ReactNode;
  /** Price line, e.g. "$3 / M tokens" */
  price?: React.ReactNode;
  /** Unavailable for selection */
  disabled?: boolean;
}

export type ModelPickerSemanticType =
  | 'root'
  | 'trigger'
  | 'trigger-name'
  | 'menu'
  | 'group-label'
  | 'item'
  | 'item-name'
  | 'item-meta'
  | 'metrics'
  | 'metric'
  | 'metric-label'
  | 'metric-bar'
  | 'metric-fill'
  | 'thinking-row'
  | 'effort'
  | 'effort-option'
  | 'info-row';

export interface ModelPickerLocale {
  thinking?: string;
  effort?: string;
  effortLow?: string;
  effortMedium?: string;
  effortHigh?: string;
  metricQuality?: string;
  metricSpeed?: string;
  metricCost?: string;
  /** aria-label for the trigger */
  trigger?: string;
}

export interface ModelPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  /** Custom class name prefix @default 'yee-model-picker' */
  prefixCls?: string;
  /** Class names for semantic sections */
  classNames?: Partial<Record<ModelPickerSemanticType, string>>;
  /** Inline styles for semantic sections */
  styles?: Partial<Record<ModelPickerSemanticType, React.CSSProperties>>;
  /** Available models */
  models: Array<AIModel>;
  /** Controlled selected model id */
  value?: string;
  /** Initial selection for the uncontrolled mode @default models[0].id */
  defaultId?: string;
  /** Called when a model is picked; also closes the menu */
  onChange?: (id: string, model: AIModel) => void;
  /** Controlled extended-thinking toggle */
  thinkingEnabled?: boolean;
  /** Initial toggle state for the uncontrolled mode @default false */
  defaultThinkingEnabled?: boolean;
  /** Called when the extended-thinking toggle flips */
  onThinkingChange?: (enabled: boolean) => void;
  /** Controlled effort level */
  effort?: ThinkingEffort;
  /** Initial effort for the uncontrolled mode @default 'medium' */
  defaultEffort?: ThinkingEffort;
  /** Called when the effort level changes */
  onEffortChange?: (effort: ThinkingEffort) => void;
  /** Hide the quality/speed/cost bars @default false */
  showMetrics?: boolean;
  /** Disable the trigger */
  disabled?: boolean;
  /** Custom trigger content; receives the selected model */
  renderTrigger?: (model: AIModel | undefined) => React.ReactNode;
  /** Locale overrides for built-in labels */
  locale?: ModelPickerLocale;
}
