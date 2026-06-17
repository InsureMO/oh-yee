export type CompositionDOM = 'inner';

export interface FlowProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
  /**
   * Class names for structural sections
   */
  classNames?: Partial<Record<CompositionDOM, string>>;
  /**
   * Inline styles for structural sections
   */
  styles?: Partial<Record<CompositionDOM, React.CSSProperties>>;
  /**
   * Child elements
   */
  children: React.ReactNode;
  /**
   * Whether to stop the animation on mouse hover
   * @default true
   */
  stopOnHover?: boolean;
  /**
   * Distance to scroll per interval, in pixels
   * @default 1
   */
  distance?: number | { x: number; y: number };
  /**
   * Scroll interval in milliseconds; combined with `distance` to control scroll speed
   * @default 10
   */
  interval?: number | { x: number; y: number };
}
