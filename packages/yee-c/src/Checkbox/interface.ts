import { ChangeEvent } from 'react';
import type { DataAttributeProps } from '../utils/types';

export type SemanticDOM = 'label' | 'inner';

export interface CheckboxProps extends DataAttributeProps {
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
  classNames?: Partial<Record<SemanticDOM, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
  /**
   * Whether checked
   */
  checked?: boolean;
  /**
   * Whether checked by default
   */
  defaultChecked?: boolean;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Children
   */
  children?: React.ReactNode;
  /**
   * Bound value
   */
  value?: string | number;
  /**
   * Whether indeterminate (half-selected)
   */
  indeterminate?: boolean;
  /**
   * Callback when checked state changes
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type CheckboxOption = {
  label?: React.ReactNode;
  value?: string | number;
  disabled?: boolean;
};

export interface CheckboxGroupProps {
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
   * Button style
   */
  buttonStyle?: 'outline' | 'solid';
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Default value
   * */
  defaultValue?: Array<any>;
  /**
   * Controlled value
   */
  value?: Array<any>;
  /**
   * The name attribute value of the checkbox
   */
  name?: string;
  /**
   * Options
   */
  options?: Array<CheckboxOption>;
  /**
   * Callback when value changes
   */
  onChange?: (value: Array<string | number>) => void;
}
