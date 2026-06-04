import type { DataAttributeProps } from '../utils/types';

export type SemanticType = 'item';

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Child components
   */
  children?: Array<React.ReactNode | null | undefined> | React.ReactNode;
  /**
   * Gap size
   */
  gap?: number;
  /**
   * Layout direction
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Whether to auto wrap
   */
  wrap?: boolean;
  /**
   * Alignment
   */
  align?: 'center' | 'start' | 'end' | 'baseline' | 'flex-start';
  /**
   * Whether to take up the entire row
  */
  block?: boolean;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom inline style
   */
  style?: React.CSSProperties;
  /**
   * Semantic class names
   */
  classNames?: Partial<Record<SemanticType, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<SemanticType, React.CSSProperties>>;
}

export interface SpaceItemProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface SpaceCompactProps extends DataAttributeProps {
  /**
   * Child elements
   */
  children: React.ReactElement[];
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Layout direction
   */
  direction?: 'horizontal' | 'vertical';
}
