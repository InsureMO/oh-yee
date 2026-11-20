import React from 'react';

export interface PromptTemplate {
  /** Unique template id */
  id: string;
  /** Display title */
  title: React.ReactNode;
  /** Template body; variables use the `{{name}}` syntax */
  template: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Optional one-line description */
  description?: React.ReactNode;
}

export type PromptLibrarySemanticType =
  | 'root'
  | 'list'
  | 'item'
  | 'item-icon'
  | 'item-main'
  | 'item-title'
  | 'item-desc'
  | 'editor'
  | 'var-input'
  | 'preview'
  | 'preview-label'
  | 'preview-text'
  | 'footer'
  | 'use-btn';

export interface PromptLibraryLocale {
  /** Button that emits the final prompt */
  use?: string;
  /** Label above the assembled prompt */
  preview?: string;
  /** Input placeholder for a variable, `{name}` is replaced */
  variablePlaceholder?: string;
  /** aria-label for the template list */
  templates?: string;
}

export interface PromptLibraryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'> {
  /** Custom class name prefix @default 'yee-prompt-library' */
  prefixCls?: string;
  /** Class names for semantic sections */
  classNames?: Partial<Record<PromptLibrarySemanticType, string>>;
  /** Inline styles for semantic sections */
  styles?: Partial<Record<PromptLibrarySemanticType, React.CSSProperties>>;
  /** Saved templates */
  templates: Array<PromptTemplate>;
  /** Controlled selected template id */
  value?: string;
  /** Initial selection for the uncontrolled mode @default templates[0].id */
  defaultId?: string;
  /** Called when a template is picked; uncontrolled values reset */
  onSelect?: (template: PromptTemplate) => void;
  /** Controlled variable values keyed by variable name */
  values?: Record<string, string>;
  /** Initial values for the uncontrolled mode */
  defaultValues?: Record<string, string>;
  /** Called when any variable input changes */
  onValuesChange?: (values: Record<string, string>, template: PromptTemplate) => void;
  /** Called by the use button with the assembled prompt; disabled until every variable is filled */
  onUse?: (prompt: string, template: PromptTemplate) => void;
  /** Hide the assembled-prompt preview @default false */
  showPreview?: boolean;
  /** Hide the template list (single-template mode) @default false */
  showList?: boolean;
  /** Locale overrides for built-in labels */
  locale?: PromptLibraryLocale;
}
