import type { TagType } from '../Selector/interface';
import type { RowSelectionType, SelectionKeyType } from '../Table/interface';
import type { TriggerProps } from '../Trigger';

/**
 * Selected item key type
 */
type SelectedKeyType = string | number;

/**
 * Data item type
 */
type InDataType = {
  [propName: string]: any;
};

/**
 * InternalTable component Props interface
 * @internal
 */
export interface InternalTableProps {
  /**
   * Prefix class name
   * */
  prefixCls?: string;
  /**
   * Selection type
   */
  type?: 'radio' | 'checkbox';
  /**
   * Unique identifier field name for data
   */
  rowKey?: string | ((record: any) => string);
  /**
   * Selected value
   */
  value?: SelectedKeyType | Array<SelectedKeyType>;
  /**
   * Table column config
   */
  columns: Array<Record<string, any>>;
  /**
   * Data source
   */
  dataSource: Array<InDataType>;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Row selection config
   */
  rowSelection?: RowSelectionType;
  /**
   * Whether to show filter (All/Selected toggle)
   */
  isShowFilter?: boolean;
  /**
   * Change callback
   */
  onChange?: () => void;
  /**
   * Whether popup is visible (for focus trap)
   */
  visible?: boolean;
}

/**
 * TableSelect component Props interface
 */
export interface TableSelectProps
  extends
    Omit<
      InternalTableProps,
      | 'value'
      | 'onChange'
      | 'idField'
      | 'visible'
      | 'type'
      | 'columns'
      | 'dataSource'
      | 'className'
      | 'style'
      | 'rowSelection'
      | 'isShowFilter'
    >,
    Omit<TriggerProps, 'popup' | 'children' | 'onOpenChange'> {
  /**
   * Table column config
   */
  columns: Array<any>;
  /**
   * Data source
   */
  dataSource: Array<InDataType>;
  /**
   * Single or multiple selection
   * @default: 'radio'
   * */
  type?: 'radio' | 'checkbox';
  /**
   * Row selection config
   */
  rowSelection: Omit<RowSelectionType, 'onChange'>;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Selected value (controlled)
   */
  value?: SelectionKeyType | SelectionKeyType[];
  /**
   * Default selected value (uncontrolled)
   */
  defaultValue?: SelectionKeyType | SelectionKeyType[];
  /**
   * Popup placement
   * @default 'bottomLeft'
   */
  placement?: 'bottomLeft' | 'topLeft';
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Input direction (for special scenarios)
   */
  io?: 'out';
  /**
   * Container ID (for popup mounting)
   */
  containerId?: string;
  /**
   * Preset options (for displaying selected items)
   */
  options?: TagType[];
  /**
   * Whether to allow clearing
   * @default true
   */
  allowClear?: boolean;
  /**
   * Whether tags are closable
   * @default true
   */
  closable?: boolean;
  /**
   * Whether searchable
   * @default true
   */
  searchable?: boolean;
  /**
   * Whether to search on input
   * @default true
   */
  searchOnInput?: boolean;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether to show filter
   */
  isShowFilter?: boolean;
  /**
   * Option label property (text field for displaying labels)
   * @default 'name'
   */
  optionLabelProp?: string | ((option: InDataType) => string);
  /**
   * Selection change callback
   * @param keys Selected keys
   * @param data Selected data
   * @param checked Whether selected
   * @param changeData Changed data
   */
  onChange?: (
    selectedRowKeys: Array<SelectionKeyType> | SelectionKeyType | undefined,
    selectedRows: unknown,
  ) => void;
  /**
   * Search callback
   * @param value Search value
   * @param e Event object
   */
  onSearch?: (value: string, e?: any) => void;
  /**
   * Popup state change callback
   * @param open Whether open
   */
  onOpenChange?: (open: boolean) => void;
}

export type TableSelectRowSelectionType = RowSelectionType;
