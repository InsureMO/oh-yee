import type { DataAttributeProps } from '../utils/types';

export type SemanticDOM =
  | 'mask'
  | 'wrapper'
  | 'close'
  | 'header'
  | 'content'
  | 'body'
  | 'footer';

export interface DrawerProps extends DataAttributeProps {
  /**
   * Custom prefix class name
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
   * Title
   */
  title?: React.ReactNode;
  /**
   * Drawer footer
   */
  footer?: React.ReactNode | (() => React.ReactNode);
  /**
   * Whether to show the mask
   * @default true
   */
  showMask?: boolean;
  /**
   * Whether clicking the mask closes the drawer
   * @default true
   */
  maskClosable?: boolean;
  /**
   * Drawer direction
   * @default right
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Height; only effective when placement is top or bottom
   */
  height?: number | string;
  /**
   * Width; only effective when placement is left or right
   */
  width?: number | string;
  /**
   * Whether the drawer is open
   */
  open: boolean;
  /**
   * Whether to destroy DOM on close
   */
  destroyOnClose?: boolean;
  /**
   * Child elements
   */
  children?: React.ReactNode;
  /**
   * Whether to show the close button in the top-right corner
   * @default true
   */
  closable?: boolean | { icon: React.ReactNode; placement: 'left' | 'right' };
  /**
   * Specifies the mount point for the drawer
   */
  getContainer?: () => HTMLElement;
  /**
   * Whether to support keyboard operations, such as ESC to close
   * @default true
   */
  keyboard?: boolean;
  /**
   * Callback when the drawer is closed
   */
  onClose?: () => void;
}
