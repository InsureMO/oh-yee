import type { DataAttributeProps } from '../utils/types';

export type TagType =
  | 'success'
  | 'error'
  | 'warning'
  | 'disabled'
  | 'info'
  | 'default';

type SemanticDOM = 'icon' | 'content' | 'close';

export interface TagProps extends DataAttributeProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Child nodes
   */
  children: React.ReactNode;
  /**
   * Custom inline style
   * */
  style?: React.CSSProperties;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Semantic structure class names
  */
  classNames?: Partial<Record<SemanticDOM, string>>;
  /**
   * Semantic structure styles
  */
  styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
  /**
   * Whether closable, can also customize the close icon
   * */
  closable?: boolean | React.ReactNode;
  /**
   * Built-in status
   */
  status?: TagType;
  /**
   * Whether to use dashed style
   */
  dashed?: boolean;
  /**
   * Size
   */
  size?: 'small' | 'default' | 'large';
  /**
   * Set icon
   */
  icon?: React.ReactNode;
  /**
   * Whether checkable
   */
  checkable?: boolean;
  /**
   * Set checked state
   */
  checked?: boolean;
  /**
   * Whether to show border
   * @default true
   */
  bordered?: boolean;
  /**
   * Callback when checked state changes
   */
  onChange?: (checked: boolean) => void;
  /**
   * Callback when tag is closed
   * */
  onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export interface CheckableTagProps extends TagProps {
  /**
   * Set default checked state
   */
  defaultChecked?: boolean;
  /**
   * Set checked state
   */
  checked?: boolean;
  /**
   * Callback when checked state changes
   */
  onChange?: (checked: boolean) => void;
}
