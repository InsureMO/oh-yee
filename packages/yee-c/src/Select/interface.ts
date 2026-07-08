import type { SelectorProps } from '../Selector';
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

export interface SelectProps
  extends DataAttributeProps, Pick<SelectorProps, 'size'> {
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
  /**
   * Enable virtual scrolling for the dropdown.
   *
   * When enabled, only the options inside the visible window are rendered
   * (the DOM node count stays constant regardless of how many options there
   * are). Recommended for large option sets (hundreds or thousands).
   * @default false
   */
  virtual?: boolean;
  /**
   * Height of each option in pixels. Required to be a fixed value when
   * `virtual` is enabled (the list assumes every option has exactly this height).
   * @default 32
   */
  itemHeight?: number;
  /**
   * Max height of the dropdown popup in pixels.
   * @default 200
   */
  listHeight?: number;
}

/**
 * Props for the internal Option component (renders a single dropdown option).
 */
export interface OptionProps {
  /**
   * Display label
   */
  label: string;
  /**
   * Value
   */
  value: string | number;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Native title attribute
   */
  title?: string;
  /**
   * Test id forwarded to the option element
   */
  dataTestId?: string;
  /**
   * Inline style forwarded to the option element.
   * Used by virtual scrolling to position each option absolutely.
   */
  style?: React.CSSProperties;
}

/**
 * Context value shared between Options and each Option.
 */
export interface OptionsContextValue {
  prefixCls: string;
  selectedKeys: Array<string | number>;
  focusedKey: string | number;
  multiple: boolean;
  onSelect: (
    key: string | number,
    e?: React.MouseEvent | React.KeyboardEvent,
  ) => void;
}

/**
 * Props for the internal Options (popup list) component.
 */
export interface OptionsProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onSelect'
> {
  /**
   * Custom class name prefix
   */
  prefixCls: string;
  /**
   * Dropdown options
   */
  options: Array<Option>;
  /**
   * Popup container class name
   */
  popupClassName?: string;
  /**
   * Popup container inline style
   */
  popupStyle?: React.CSSProperties;
  /**
   * Selected option values
   */
  selectedKeys: Array<string | number>;
  /**
   * Currently focused option value
   */
  focusedKey: string | number;
  /**
   * Test id prefix used to generate each option's test id.
   * Accepts any `data-*` attribute value (see DataAttributeProps).
   */
  dataTestId?: string | number | boolean;
  /**
   * Whether multiple selection mode is active
   */
  multiple: boolean;
  /**
   * Whether virtual scrolling is enabled
   */
  virtual?: boolean;
  /**
   * Fixed option height in pixels (only meaningful when `virtual` is enabled)
   */
  itemHeight?: number;
  /**
   * Max popup height in pixels (only meaningful when `virtual` is enabled)
   */
  listHeight?: number;
  /**
   * Ref that receives the virtual list API (currently `scrollToIndex`),
   * so the parent can wire keyboard navigation to the virtual viewport.
   */
  virtualApiRef?: React.MutableRefObject<{
    scrollToIndex: (index: number) => void;
  } | null>;
  /**
   * Callback when an option is selected
   */
  onSelect: (
    key: string | number,
    e?: React.MouseEvent | React.KeyboardEvent,
  ) => void;
}
