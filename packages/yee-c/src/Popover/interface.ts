import React from 'react';
import { TriggerProps } from '../Trigger';

export type CompositionDOM = 'header' | 'content';

export interface PopoverProps extends Omit<TriggerProps, 'popup'> {
  /**
   * Children elements
   */
  children: React.ReactElement;
  /**
   * Title
   */
  title?: React.ReactNode | (() => React.ReactNode);
  /**
   * Content
   */
  content?: React.ReactNode | (() => React.ReactNode);
  /**
   * Custom popup root element class name
   */
  className?: string;
  /**
   * Custom popup root element style
   */
  style?: React.CSSProperties;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<CompositionDOM, React.CSSProperties>>;
  /**
   * Semantic class names
   */
  classNames?: Partial<Record<CompositionDOM, string>>;
  /**
   * Callback when popup open state changes
   */
  onOpenChange?: (open: boolean) => void;
}
