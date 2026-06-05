import type { TreeProps } from '../Tree/interface';
import type { DataAttributeProps } from '../utils/types';

export interface TreeSelectProps<T = any>
  extends
    Omit<TreeProps<T>, 'onSelect' | 'onCheck' | 'fieldNames'>,
    DataAttributeProps {
  /**
   * Custom class name prefix
   */
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
   */
  searchable?: boolean;
  /**
   * Selection mode, supports multiple
   */
  mode?: 'multiple';
  /**
   * Whether to show checkboxes
   */
  checkable?: boolean;
  /**
   * Customize node key, title, children field names
   */
  fieldNames?: { key?: keyof T; label?: keyof T; children?: keyof T };
  /**
   * Property to backfill into the select box
   */
  optionLabelProp?: string | ((option: T) => string);
  /**
   * Callback when value changes
   */
  onChange?: (
    value: string | number | Array<string | number>,
    nodes?: T | T[],
  ) => void;
  /**
   * Callback when searching
   */
  onFilter?: (value: string, dataSource: Array<T>) => Array<T>;
}
