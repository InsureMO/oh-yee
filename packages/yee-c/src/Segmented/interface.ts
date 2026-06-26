import type { DataAttributeProps } from '../utils/types';

export type SegmentedValue = string | number;

export type SegmentedSemanticDOM = 'item' | 'thumb';

export interface SegmentedLabeledOption {
  /**
   * Custom item class name
   */
  className?: string;
  /**
   * Item label
   */
  label?: React.ReactNode;
  /**
   * Item value
   */
  value: SegmentedValue;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  /**
   * Item icon
   */
  icon?: React.ReactNode;
}

export type SegmentedRawOption = SegmentedValue;

export type SegmentedOption = SegmentedLabeledOption | SegmentedRawOption;

export interface SegmentedProps extends DataAttributeProps {
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
  classNames?: Partial<Record<SegmentedSemanticDOM, string>>;
  /**
   * Semantic structure styles
   */
  styles?: Partial<Record<SegmentedSemanticDOM, React.CSSProperties>>;
  /**
   * Options, supports config objects or primitive shorthand (string/number)
   */
  options?: SegmentedOption[];
  /**
   * Controlled selected value
   */
  value?: SegmentedValue;
  /**
   * Default selected value
   */
  defaultValue?: SegmentedValue;
  /**
   * Callback when selected value changes
   */
  onChange?: (value: SegmentedValue) => void;
  /**
   * Whether to disable all options
   */
  disabled?: boolean;
  /**
   * Size
   */
  size?: 'small' | 'default' | 'large';
  /**
   * Visual style variant. `pill` renders the selected item as a colored capsule with no container background
   * @default default
   */
  variant?: 'default' | 'pill';
  /**
   * Whether to fill the container width, options share the space equally
   */
  block?: boolean;
  /**
   * Group name for the underlying radio inputs
   */
  name?: string;
}
