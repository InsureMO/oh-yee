export type SemanticDOM = 'handle' | 'inner' | 'unchecked' | 'checked';

import type { DataAttributeProps } from '../utils/types';

export interface SwitchProps extends DataAttributeProps {
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
  classNames?: Record<SemanticDOM, string>;
  /**
   * Semantic structure styles
   */
  styles?: Record<SemanticDOM, React.CSSProperties>;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Size
   */
  size?: 'small' | 'default' | 'large';
  /**
   * Whether loading
   */
  loading?: boolean;
  /**
   * Content when checked
   */
  checkedChildren?: React.ReactNode;
  /**
   * Content when unchecked
   */
  unCheckedChildren?: React.ReactNode;
  /**
   * Whether checked
   */
  checked?: boolean;
  /**
   * Whether checked by default
   */
  defaultChecked?: boolean;
  /**
   * Callback when state changes
   */
  onChange?: (checked: boolean) => void;
}
