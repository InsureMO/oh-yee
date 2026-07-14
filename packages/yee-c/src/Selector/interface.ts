export type Tid = string | number;

export type TagType = {
  label: React.ReactNode;
  value: string | number;
  [prop: string]: unknown;
};

export interface PureSelectorProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Whether searchable
   */
  searchable?: boolean;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Whether to allow clearing
   */
  allowClear?: boolean;
  /**
   * Input placeholder text
   */
  placeholder?: string;
  /**
   * Whether to allow removing tags
   */
  closable?: boolean | ((option: TagType) => boolean);
  /**
   * Whether to search while typing
   */
  searchOnInput?: boolean;
  /**
   * In multiple or tags mode, the maximum number of selectable items
   */
  maxCount?: number;
  /**
   * size
   * */
  size?: 'small' | 'default' | 'large';
  /**
   * Selection mode
   */
  mode?: 'multiple' | 'tags';
  /**
   * Custom root element class name
   */
  className?: string;
  /**
   * Custom root element inline style
   */
  style?: React.CSSProperties;
  /**
   * Selected options
   */
  options?: Array<TagType>;
  /**
   * Selected keys
   */
  selectedKeys: Array<string | number>;
  /**
   * Custom suffix
   */
  suffix?: React.ReactNode | (() => React.ReactNode);
  /**
   * Whether the popup is open
   */
  open?: boolean;
  /**
   * Whether loading
   * */
  loading?: boolean;
  /**
   * Custom text displayed in the input
   */
  optionLabelProp?: string | ((option: TagType) => string);
  /**
   * Extra class name applied to the displayed value/tag when its key is not
   * found in `options` (an "orphan" value). The orphan value is shown as the
   * raw key itself; this lets you style it differently (e.g. to flag stale data).
   */
  orphanClassName?: string;
  /**
   * Extra inline style applied to the displayed value/tag when its key is not
   * found in `options` (an "orphan" value).
   */
  orphanStyle?: React.CSSProperties;

  /**
   * Control the open state
   * */
  onOpenChange?: (open: boolean) => void;
  /**
   * Callback when searching
   * */
  onSearch?: (value: string, e?: any) => void;

  value?: string;

  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface SelectorProps
  extends
    PureSelectorProps,
    Omit<React.HTMLAttributes<HTMLInputElement>, 'onClick'> {
  onClear?: () => void;
  onRemove?: (option: TagType) => void;
}
