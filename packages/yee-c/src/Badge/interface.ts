import type { DataAttributeProps } from '../utils/types';

export type BadgeSemanticDOM = 'badge' | 'text' | 'sup' | 'dot';

export interface BadgeProps extends DataAttributeProps {
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
   * Semantic class names
   */
  classNames?: Partial<Record<BadgeSemanticDOM, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<BadgeSemanticDOM, React.CSSProperties>>;
  /**
   * Child component
   */
  children?: React.ReactNode;
  /**
   * Number to display or custom content
   */
  count?: number | React.ReactNode;
  /**
   * Whether to show Badge when count is 0
   * @default false
   */
  showZero?: boolean;
  /**
   * Whether to show breathing effect
   * @default false
   */
  active?: boolean;
  /**
   * Show red dot
   * @default false
   */
  dot?: boolean;
  /**
   * Badge size
   * @default default
   */
  size?: 'default' | 'small' | 'large';
  /**
   * Status
   */
  status?: 'success' | 'info' | 'warning' | 'error' | 'processing';
  /**
   * Custom color
   */
  color?: string;
  /**
   * Custom Badge offset [x, y]
   */
  offset?: [number, number];
  /**
   * When count exceeds overflowCount, display overflowCount+
   * @default 99
   */
  overflowCount?: number;
  /**
   * Status dot text content (used with status)
   */
  text?: string;
}

export interface RibbonProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Description text
   */
  text: React.ReactNode;
  /**
   * Ribbon position
   * @default end
   */
  placement?: 'start' | 'end';
  /**
   * Custom color
   */
  color?: string;
  /**
   * Children
   */
  children?: React.ReactNode;
}
