import type { DataAttributeProps } from '../utils/types';

export type AvatarSemanticDOM = 'image' | 'icon' | 'text';

export interface AvatarProps extends DataAttributeProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom inline style
   */
  style?: React.CSSProperties;
  /**
   * Semantic class names
   */
  classNames?: Partial<Record<AvatarSemanticDOM, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<AvatarSemanticDOM, React.CSSProperties>>;
  /**
   * Custom icon for the avatar
   */
  icon?: React.ReactNode | (() => React.ReactNode);
  /**
   * Avatar shape
   * @default circle
   */
  shape?: 'circle' | 'square';
  /**
   * Avatar size
   * @default default
   */
  size?: 'small' | 'default' | 'large' | number;
  /**
   * Image source URL for the avatar
   */
  src?: string;
  /**
   * Alt text when the image fails to load
   */
  alt?: string;
  /**
   * Text avatar content
   */
  children?: React.ReactNode;
}
