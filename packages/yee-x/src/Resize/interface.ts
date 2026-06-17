export interface ResizeProps {
  /**
   * Custom class name prefix
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
   * Container width
   */
  width?: string | number;
  /**
   * Child elements
   */
  children: React.ReactNode;
  /**
   * Position of the resize handle
   * @default right
   */
  placement?: 'left' | 'right';
  /**
   * Callback when the width changes
   */
  onResize?: (width: number) => void;
}
