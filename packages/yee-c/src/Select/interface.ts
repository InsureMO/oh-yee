import type { DataAttributeProps } from '../utils/types';

export type Option = {
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Native title attribute
   */
  title?: string;
  /**
   * Display label
   */
  label: string;
  /**
   * Value
   */
  value: string | number;
  /**
   * Other properties
   */
  [prop: string]: any;
};

export interface SelectProps extends DataAttributeProps {
  /**
   * Custom class name prefix
   * */
  prefixCls?: string;
  /**
   * Root element class name
   */
  className?: string;
  /**
   * Root element inline style
   */
  style?: React.CSSProperties;
  /**
   * Whether to show the clear button
   * @default true
   */
  allowClear?: boolean;
  /**
   * Whether the dropdown is open by default
   */
  defaultOpen?: boolean;
  /**
   * Default value
   */
  defaultValue?: string | number | Array<string | number>;
  /**
   * Controlled value
   */
  value?: string | number | Array<string | number>;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Placeholder text for the select box
   */
  placeholder?: string;
  /**
   * Dropdown popup placement
   */
  placement?:
    | 'top'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight';
  /**
   * Whether searchable
   * @default true
   */
  searchable?: boolean;
  /**
   * Dropdown options
   */
  options: Array<Option>;
  /**
   * Selection mode
   */
  mode?: 'multiple' | 'tags';
  /**
   * Property to compare when searching
   * @default label
   */
  optionFilterProp?: string;
  /**
   * Property to backfill into the select box
   */
  optionLabelProp?: 'string' | (() => string);
  /**
   * Callback when value changes
   */
  onChange?: (
    value: string | number | Array<string | number>,
    options?: Option | undefined | Option[],
  ) => void;
  /**
   * Callback when searching
   */
  onFilter?: (value: string, options: Array<Option>) => Array<Option>;
}
