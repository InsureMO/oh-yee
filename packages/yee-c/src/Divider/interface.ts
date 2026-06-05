import type { DataAttributeProps } from '../utils/types';

export type SemanticDOM = 'text';

export interface DividerProps extends DataAttributeProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Custom root style
   */
  style?: React.CSSProperties;
  /**
   * Semantic structure class names
   */
  classNames?: Partial<Record<SemanticDOM, string>>;
  /**
   * Semantic structure styles
   */
  styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
  /**
   * Position of the divider title
   * @default center
   */
  orientation?: 'left' | 'center' | 'right';
  /**
   * Divider style: solid, dashed, or dotted line
   * @default solid
   */
  variant?: 'solid' | 'dashed' | 'dotted';
  /**
   * Child elements
   */
  children?: React.ReactNode;
  /**
   * Whether the divider is horizontal or vertical
   * @default horizontal
   */
  type?: 'vertical' | 'horizontal';
}
