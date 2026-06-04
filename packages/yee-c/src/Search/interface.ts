import { TriggerProps } from '../Trigger';
import type { ListItemProps } from '../List';

export type SemanticDOM = 'prefix' | 'input' | 'suffix' | 'clear' | 'button';

export type SearchOption = ListItemProps;

export interface SearchProps
  extends
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'prefix' | 'onChange'
  >,
  Omit<TriggerProps, 'children' | 'popup'> {
  /**
   * @description Custom class name prefix
   * @default 'yee-search'
   */
  prefixCls?: string;

  /**
   * @description Custom class name
   */
  className?: string;

  /**
   * @description Custom inline style
   */
  style?: React.CSSProperties;

  /**
   * @description Structured class names
   */
  classNames?: Record<SemanticDOM, string>;

  /**
   * @description Structured inline styles
   */
  styles?: Record<SemanticDOM, React.CSSProperties>;

  /**
   * @description Size of the search input
   * @default 'default'
   */
  size?: 'small' | 'default' | 'large';

  /**
   * @description Controlled value
   */
  value?: string;

  /**
   * @description Default value
   */
  defaultValue?: string;

  /**
   * @description Whether to show border
   * @default true
   */
  bordered?: boolean;

  /**
   * @description Prefix content
   */
  prefix?: React.ReactNode;

  /**
   * @description Suffix content
   */
  suffix?: React.ReactNode;

  /**
   * @description Whether disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * @description placeholder text
   */
  placeholder?: string;

  /**
   * @description Whether to allow clear
   * @default false
   */
  allowClear?: boolean;

  /**
   * @description trigger search event
   * @default 'typing'
   */
  searchOnAction?: 'typing' | 'enter';

  /**
   * @description suggest data
   */
  suggestions?: Array<SearchOption>;

  /**
   * @description search options
   */
  options?: Array<SearchOption>;
  /**
   * @description custom option node
   */
  optionRender?: (option: SearchOption) => React.ReactNode;
  /**
   * @description custom suggestion node
   */
  suggestionRender?: (option: SearchOption) => React.ReactNode;
  /**
   * @description Callback when input value changes
   */
  onChange?: (option: SearchOption | null) => void;
  /**
   * @description Callback when search is triggered (Enter or click search button)
   */
  onSearch?: (value: string) => void;
}
