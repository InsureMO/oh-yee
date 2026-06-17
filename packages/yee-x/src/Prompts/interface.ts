import React from 'react';

export type SemanticType = 'item' | 'title' | 'list';

export interface PromptProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onClick'> {
  /**
   * Unique identifier
   */
  key: string | number;
  /**
   * Icon
   * */
  icon?: React.ReactNode;
  /**
   * Title label
   */
  label?: React.ReactNode;
  /**
   * Description
   */
  description?: React.ReactNode;

  /**
   * Nested prompt items
   */
  children?: Array<PromptProps>;

  /**
   * Click event
   */
  onClick?: (info: { data: Omit<PromptProps, 'onClick'> }) => void;
}

export interface PromptsProps {
  /**
   * Class name prefix
   */
  prefixCls?: string;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Custom root styles
   */
  style?: React.CSSProperties;
  /**
   * Class names for each structural section
   */
  classNames?: Partial<Record<SemanticType, string>>;

  /**
   * Inline styles for each structural section
   */
  styles?: Partial<Record<SemanticType, React.CSSProperties>>;
  /**
   * Title
   */
  title?: React.ReactNode;
  /**
   * Prompt item list
   */
  items: Array<PromptProps>;
  /**
   * Layout direction
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Whether items wrap to the next line
   */
  wrap?: boolean;
  /**
   * Callback when a prompt item is clicked
   */
  onItemClick?: (info: { data: PromptProps }) => void;
}
