type SemanticDOM = 'tip' | 'indicator';

export type SpinType =
  | 'blank'
  | 'balls'
  | 'bars'
  | 'bubbles'
  | 'cubes'
  | 'cylon'
  | 'spin'
  | 'spinningBubbles'
  | 'spokes';

import type { DataAttributeProps } from '../utils/types';

export type SpinProps = DataAttributeProps & {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Loading type
   */
  type?: SpinType;
  /**
   * Color
   */
  color?: 'info' | 'success' | 'warning' | 'error' | 'default' | string;
  /**
   * Whether to display fullscreen
   */
  fullscreen?: boolean;
  /**
   * Get the mount node for Spin, only effective when fullscreen is true
   */
  getContainer?: () => HTMLElement;
  /**
   * Icon size
   * */
  size?: 'small' | 'default' | 'large';
  /**
   * Whether in loading state
   */
  spinning?: boolean;
  /**
   * Custom width
   * */
  width?: number;
  /**
   * Custom height
   * */
  height?: number | string;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Custom root inline style
   */
  style?: React.CSSProperties;
  /**
   * Semantic structure class names
   * */
  classNames?: Partial<Record<SemanticDOM, string>>;
  /**
   * Semantic structure styles
   * */
  styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
  /**
   * Loading state tip text
   */
  tip?: React.ReactNode;
  /**
   * Delay before showing loading effect (in milliseconds)
   */
  delay?: number;
  /**
   * Indicator variant
   * */
  variant?: 'dot' | 'ring' | 'spokes';
  /**
   * Loading indicator
   */
  indicator?: React.ReactNode;
  /**
   * Whether to show mask overlay
   */
  mask?: boolean;
  /**
   * Child elements
   */
  children?: React.ReactNode;
};
