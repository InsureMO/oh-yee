import React from 'react';

export interface ListItemProps extends React.HtmlHTMLAttributes<HTMLLIElement> {
  /**
   * Unique key
   */
  key: string | number;
  /**
   * Display content
   */
  label?: React.ReactNode;
  /**
   * Value
   */
  value?: unknown;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Class name
   * */
  className?: string;
  /**
   * Other custom properties
   */
  [prop: string]: any;
}

export interface ListProps extends Omit<
  React.HTMLAttributes<HTMLUListElement>,
  'onClick'
> {
  /**
   * Custom prefix class name
   */
  prefixCls?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom inline style
   */
  style?: React.CSSProperties;
  /**
   * List items collection
   */
  items?: Array<ListItemProps>;
  /**
   * Whether to show border
   */
  bordered?: boolean;
  /**
   * Set the focused item (controlled)
   */
  focusedKey?: string | number;
  /**
   * Render list item as a function
   */
  itemRender?: (item: ListItemProps) => React.ReactNode;
  /**
   * Click event for list items
   */
  onClick?: (item: ListItemProps) => void;
  /**
   * Callback when focused item changes via keyboard navigation
   */
  onFocusChange?: (key: string | number) => void;
  /**
   * Enable virtual scrolling for large lists.
   * Requires `height` to be set.
   * @default false
   */
  virtual?: boolean;
  /**
   * Height of the scrollable container in pixels.
   * Required when `virtual` is true.
   */
  height?: number;
  /**
   * Fixed height of each list item row in pixels.
   * Used for virtual scroll calculation.
   * @default 32
   */
  itemHeight?: number;
  /**
   * Number of columns in the list layout.
   * When greater than 1, items are displayed in a grid.
   * @default 1
   */
  columns?: number;
}

export type ListCtxType = {
  prefixCls: string;
  focusedKey?: string | number;
  onClick?: (item: ListItemProps) => void;
};
