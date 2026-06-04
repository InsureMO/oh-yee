export interface AvatarProps {
  /**
   * Set avatar shape
   * @default circle
   */
  shape?: 'circle' | 'square';
}

export interface TitleProps {
  /**
   * Set title width
   */
  width?: number | string;
}

export interface ParagraphProps {
  /**
   * Set the number of paragraph rows
   */
  rows?: number;
  /**
   * Paragraph width
   */
  width?: number | string | Array<string | number>;
}

import type { DataAttributeProps } from '../utils/types';

export interface SkeletonProps extends DataAttributeProps {
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
   * Whether to show animation
   */
  active?: boolean;
  /**
   * Set avatar
   */
  avatar?: boolean | AvatarProps;
  /**
   * Set title
   * @default true
   */
  title?: boolean | TitleProps;
  /**
   * Set paragraph
   */
  paragraph?: boolean | ParagraphProps;
}
