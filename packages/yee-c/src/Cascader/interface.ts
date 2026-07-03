import type { SelectorProps } from '../Selector';

export type CascaderPlacementType =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomRight'
  | 'bottomLeft';

export type Option = {
  label: string;
  value: string | number;
  children?: Option[];
  disabled?: boolean;
  isLeaf?: boolean;
  level?: number;
  [prop: string]: unknown;
};

export type FieldNames = {
  label: string;
  value: string;
  children: string;
};

/**
 * Flattened representation of a tree node.
 *
 * Deliberately a concrete type (not `Option & ...`) so that:
 *  - `.label` / `.value` / `.isLeaf` resolve to their precise types (an index
 *    signature on `Option` would otherwise widen them to `unknown`),
 *  - `.children` is a compile error — flattened nodes intentionally do not
 *    carry children; use `getChildren(data, uid)` instead.
 * Dynamic/extra-field access should go through `$source` (the raw node).
 */
export type FlattenOption = {
  $source: Option;
  label: string;
  value: string | number;
  pid: string;
  uid: string;
  path: Array<string | number>;
  labelPath: string[];
  level: number;
  isLeaf: boolean;
  disabled?: boolean;
};

export type NodeProps = FlattenOption & {
  level: number;
  index: number;
};

export type CascaderContextValue = {
  prefixCls: string;
  multiple: boolean;
  expandTrigger: 'click' | 'hover';
  mergedValue: Array<string | number> | Array<Array<string | number>>;
  nodeMap: Map<string, FlattenOption>;
  flatOptions: FlattenOption[];
  expandedPath: Array<{ key: string; label: string }>;
  loadData?: (option: Option) => Promise<Array<Option>>;
  onNodeMouseEnter: (item: FlattenOption, level: number) => void;
  onItemClick: (item: FlattenOption, checkable?: boolean) => void;
};

export interface CascaderProps extends Omit<
  SelectorProps,
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'optionLabelProp'
  | 'selectedKeys'
> {
  /**
   * custom class name prefix
   */
  prefixCls?: string;
  /**
   * custom root element class name
   */
  className?: string;
  /**
   * custom root element style
   */
  style?: React.CSSProperties;
  /**
   * data
   */
  options?: Option[];
  /**
   * expand trigger type
   */
  expandTrigger?: 'hover' | 'click';
  /**
   * default value, uncontroled
   */
  defaultValue?: Array<string | number> | Array<Array<string | number>>;
  /**
   * value, controled
   */
  value?: Array<string | number> | Array<Array<string | number>>;
  /**
   * disabled
   * */
  disabled?: boolean;
  /**
   * custom trigger node
   * */
  children?: React.ReactNode;
  /**
   * data is loading
   */
  loading?: boolean;
  /**
   * multiple
   */
  multiple?: boolean;
  /**
   * Is it searchable
   * @default true
   */
  searchable?: boolean;
  /**
   * popup position
   */
  placement?: CascaderPlacementType;
  /**
   * input suffix
   */
  suffix?: React.ReactNode | (() => React.ReactNode);
  /**
   * Clicking on each level of menu options will result in changes in the values.
   */
  changeOnSelect?: boolean;
  /**
   * custom option field name
   * @default  { label: 'label', value: 'value', children: 'children' }
   */
  fieldNames?: FieldNames;
  /**
   * custom option label
   */
  optionLabelProp?: string | ((obj: object) => React.ReactNode);
  /**
   * value change callback
   * @param value - When multiple is true, value is Array<Array<string | number>> (array of paths), otherwise Array<string | number> (single path)
   * @param options - Array of selected Option objects representing the full path
   */
  onChange?: (
    value: Array<Array<string | number>> | Array<string | number> | undefined,
    options: Array<Option>,
  ) => void;
  /**
   * Show/hide callback
   * */
  onOpenChange?: (open: boolean) => void;
  /**
   * Async load data
   * */
  loadData?: (option: Option) => Promise<Array<Option>>;

  fullNode?: boolean;
  onlyParentNode?: boolean;

  popupClassName?: string;
}
