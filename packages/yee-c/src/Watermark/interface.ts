import type { DataAttributeProps } from '../utils/types';

type SemanticDOM = 'wrapper';

export interface WatermarkProps extends DataAttributeProps {
  /**
   * Custom prefix class name
   */
  prefixCls?: string;
  /**
   * Child nodes
   */
  children?: React.ReactNode;
  /**
   * Custom root style
   */
  style?: React.CSSProperties;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Semantic structure class names
   */
  classNames?: Record<SemanticDOM, string>;
  /**
   * Semantic structure styles
   */
  styles?: Record<SemanticDOM, React.CSSProperties>;
  /**
   * Watermark text content
   */
  content?: string | string[];
  /**
   * Watermark image source
   */
  image?: string;
  /**
   * Watermark width
   * - Text watermark: optional, auto-calculated if not specified, forced to fixed width when specified
   * - Image watermark: must be specified
   */
  width?: number;
  /**
   * Watermark height
   * - Text watermark: optional, auto-calculated if not specified, forced to fixed height when specified
   * - Image watermark: must be specified
   */
  height?: number;
  /**
   * Watermark rotation angle
   * @default -22
   */
  rotate?: number;
  /**
   * Horizontal gap between watermarks
   * @default 100
   */
  gapX?: number;
  /**
   * Vertical gap between watermarks
   * @default 0
   */
  gapY?: number;
  /**
   * X-axis offset of the watermark from the container's top-left corner
   * @default 0
   */
  offsetLeft?: number;
  /**
   * Y-axis offset of the watermark from the container's top-left corner
   * @default 0
   */
  offsetTop?: number;
  /**
   * Z-index of the watermark
   * @default 9
   */
  zIndex?: number;
  /**
   * Watermark text color
   * @default 'rgba(0, 0, 0, 0.15)'
   */
  fontColor?: string;
  /**
   * Watermark text size
   * @default 16
   */
  fontSize?: number;
  /**
   * Watermark text font family
   * @default 'sans-serif'
   */
  fontFamily?: string;
  /**
   * Watermark text font weight
   * @default 'normal'
   */
  fontWeight?: 'normal' | 'light' | 'weight' | number;
  /**
   * Watermark text style
   * @default 'normal'
   */
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
  /**
   * Watermark opacity
   * @default 1
   */
  opacity?: number;
  /**
   * Whether to enable anti-deletion protection
   * @default true
   */
  preventDelete?: boolean;
}
