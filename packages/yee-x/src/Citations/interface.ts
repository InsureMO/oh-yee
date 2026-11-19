import React from 'react';

export interface CitationSource {
  /** Unique id the inline chips reference */
  id: string;
  /** Source title, e.g. the page or document name */
  title?: React.ReactNode;
  /** Link opened when the source is clicked */
  url?: string;
  /** Icon in front of the card; falls back to a globe icon when `url` is set */
  icon?: React.ReactNode;
  /** Short preview shown in the hover popover */
  snippet?: React.ReactNode;
  /** Quoted passage highlighted from the source */
  quote?: React.ReactNode;
  /** Secondary line, e.g. domain or date */
  meta?: React.ReactNode;
}

export type CitationsSemanticType =
  | 'root'
  | 'list'
  | 'source'
  | 'source-icon'
  | 'source-main'
  | 'source-title'
  | 'source-meta'
  | 'overflow';

export interface CitationsLocale {
  /** Label above the card list */
  sources?: string;
  /** Text of the "+N" overflow chip */
  more?: string;
}

export interface CitationsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Custom class name prefix @default 'yee-citations' */
  prefixCls?: string;
  /** Class names for semantic sections */
  classNames?: Partial<Record<CitationsSemanticType, string>>;
  /** Inline styles for semantic sections */
  styles?: Partial<Record<CitationsSemanticType, React.CSSProperties>>;
  /**
   * Sources to render. When omitted the list falls back to the nearest
   * `CitationsProvider` so answer and sources share one definition.
   */
  sources?: Array<CitationSource>;
  /**
   * Visual variant: `card` renders preview cards, `chip` renders compact
   * numbered chips. @default 'card'
   */
  layout?: 'card' | 'chip';
  /** Show only the first N sources and a "+N" chip that expands the rest */
  maxVisible?: number;
  /** Called when a source is clicked; without it a `url` opens in a new tab */
  onSourceClick?: (source: CitationSource, index: number) => void;
  /** Hide the "Sources" label @default false */
  showLabel?: boolean;
  /** Locale overrides for built-in labels */
  locale?: CitationsLocale;
}

export interface CitationChipProps
  extends Omit<React.HTMLAttributes<HTMLAnchorElement>, 'children' | 'onClick'> {
  /** Custom class name prefix @default 'yee-citation-chip' */
  prefixCls?: string;
  /** Source id resolved against the nearest `CitationsProvider` */
  sourceId?: string;
  /** Explicit source; skips the provider lookup */
  source?: CitationSource;
  /** 1-based number shown in the chip; defaults to the provider position */
  index?: number;
  /** Called on click; without it (or a handler in `Citations`) a `url` opens in a new tab */
  onClick?: (source: CitationSource, index: number) => void;
  /** Custom chip content; defaults to the index number */
  children?: React.ReactNode;
}
