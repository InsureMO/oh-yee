import type { DataAttributeProps } from '../utils/types';

export interface EllipsisProps extends DataAttributeProps {
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
   * Text content
   */
  children?: React.ReactNode;
  /**
   * Maximum number of lines to display
   * @default 3
   */
  lines?: number;
  /**
   * Expand button text
   * @default "Expand"
   */
  expandText?: string;
  /**
   * Collapse button text
   * @default "Collapse"
   */
  collapseText?: string;
  /**
   * Whether to expand by default
   * @default false
   */
  defaultExpanded?: boolean;
  /**
   * Controlled mode: whether expanded
   */
  expanded?: boolean;
  /**
   * Expand/collapse callback
   */
  onExpand?: (expanded: boolean) => void;
  /**
   * Whether to show the expand button (even if text overflows)
   * @default true
   */
  showExpandButton?: boolean;
  /**
   * Whether to enable animation
   * @default true
   */
  animated?: boolean;
  /**
   * Animation duration (milliseconds)
   * @default 300
   */
  animationDuration?: number;
}
