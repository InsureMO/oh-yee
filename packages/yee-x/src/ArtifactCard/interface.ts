import React from 'react';

export interface ArtifactCardLocale {
  /** Preview action text @default 'View' */
  preview?: string;
  /** Download action text @default 'Download' */
  download?: string;
}

export interface ArtifactCardProps {
  /** Custom class name prefix @default 'yee-artifact-card' */
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Display title, e.g. the document name `Product Memo Plan` */
  title: React.ReactNode;
  /** File name shown next to the title, e.g. `product-memo-plan.md` */
  fileName?: string;
  /** Muted meta line below the title, e.g. generate time */
  description?: React.ReactNode;
  /** Leading icon; defaults to an extension-tinted document glyph */
  icon?: React.ReactNode;
  /** Replace the default trailing actions (View / Download) */
  actions?: React.ReactNode;
  /** Called when the View action is clicked */
  onPreview?: () => void;
  /** Called when the Download action is clicked */
  onDownload?: () => void;
  /** Called when the card body is clicked (e.g. open a side preview) */
  onClick?: () => void;
  /** Locale overrides for the built-in actions */
  locale?: ArtifactCardLocale;
}

export interface ArtifactCardGroupProps {
  /** Custom class name prefix @default 'yee-artifact-card' */
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Section title, e.g. `Generated documents` */
  title?: React.ReactNode;
  /** Count badge; defaults to `items.length` */
  count?: number;
  /** Artifact cards to render */
  items: Array<ArtifactCardProps & { key?: React.Key }>;
}
