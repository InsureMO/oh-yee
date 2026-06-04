import type { DataAttributeProps } from '../utils/types';

export type SemanticDOM = 'toolbar' | 'wrapper';

export interface ImageViewerProps extends DataAttributeProps {
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
   * Image URL
   */
  src?: string;
  /**
   * Image alt text
   */
  alt?: string;
  /**
   * Toolbar position
   * @default bottom
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Download file name
   */
  name?: string;
  /**
   * Minimum zoom ratio
   * @default 0.5
   */
  min?: number;
  /**
   * Maximum zoom ratio
   * @default 3
   */
  max?: number;
}

export interface ImageViewerPopupProps {
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
   * Whether to show the popup
   */
  open: boolean;
  /**
   * Whether to show the popup by default
   */
  defaultOpen?: boolean;
  /**
   * Whether to destroy DOM on close
   */
  destroyOnClose?: boolean;
  /**
   * Custom mount node
   */
  getContainer?: () => HTMLElement;
  /**
   * Whether clicking the mask closes the popup
   * @default true
   */
  maskClosable?: boolean;
  /**
   * Whether to support ESC key to close
   * @default true
   */
  keyboard?: boolean;
  /**
   * Child nodes
   */
  children?: React.ReactNode;
  /**
   * Close callback
   */
  onClose?: () => void;
}
