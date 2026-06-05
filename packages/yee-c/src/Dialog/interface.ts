import { ButtonType } from '../Button';
import type { DataAttributeProps } from '../utils/types';

export type SemanticDOM = 'content' | 'footer' | 'mask';

export interface DialogProps extends DataAttributeProps {
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
   * Whether to show the close button
   * @default true
   */
  closable?: boolean;
  /**
   * Footer buttons
   */
  footer?: boolean | React.ReactNode;
  /**
   * Whether to show the mask layer
   * @default true
   */
  showMask?: boolean;
  /**
   * Whether clicking the mask layer closes the dialog
   * @default true
   */
  maskClosable?: boolean;
  /**
   * Width
   */
  width?: number | string;
  /**
   * Child nodes
   */
  children?: React.ReactNode;
  /**
   * Title
   */
  title?: string;
  /**
   * Cancel button text
   * @default Cancel
   */
  cancelText?: string;
  /**
   * Cancel button type
   */
  cancelType?: ButtonType;
  /**
   * Confirm button text
   */
  confirmText?: string;
  /**
   * Confirm button type
   */
  confirmType?: ButtonType;
  /**
   * Whether to show the dialog, controlled mode
   */
  open: boolean;
  /**
   * Whether to show the dialog by default
   */
  defaultOpen?: boolean;
  /**
   * Whether to destroy the DOM node on close
   */
  destroyOnClose?: boolean;
  /**
   * Custom dialog mount node
   */
  getContainer?: () => HTMLElement;
  /**
   * Callback when closing the dialog, including clicking mask, close button, and cancel
   */
  onCancel?: () => void;
  /**
   * Callback when clicking confirm
   */
  onConfirm?: () => void;
  /**
   * Whether the dialog is draggable
   */
  draggable?: boolean;
  /**
   * Whether to limit dragging within the current window
   * @default true
   */
  dragLimitInWindow?: boolean;
  /**
   * Whether to reset position when reopening after dragging and closing
   * @default true
   */
  openResetLocation?: boolean;
  /**
   * Whether to support keyboard operations, such as ESC to close
   * @default true
   */
  keyboard?: boolean;
  /**
   * Whether to display in fullscreen
   * @default false
   */
  fullscreen?: boolean;
}
