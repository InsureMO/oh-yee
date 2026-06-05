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
   * Set the focused item
   * */
  focusedKey?: string | number;
  /**
   * Render list item as a function
   */
  itemRender?: (item: ListItemProps) => React.ReactNode;
  /**
   * Click event for list items
   */
  onClick?: (item: ListItemProps) => void;
}

export type ListCtxType = {
  prefixCls: string;
  focusedKey?: string | number;
  onClick?: (item: ListItemProps) => void;
};
