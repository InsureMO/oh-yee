import React, { ChangeEvent } from 'react';
import { ButtonProps } from '../Button';
import { PaginationProps } from '../Pagination';
import type { DataAttributeProps } from '../utils/types';

export interface ExpandableType {
  /**
   * Set which column the expand control element is in
   * @default 1
   */
  index?: number;
  /**
   * Custom expand/collapse icon
   */
  icon?: (expanded: boolean) => React.ReactNode;
  /**
   * Column width
   */
  width?: number | string;
  /**
   * Whether to expand all rows initially
   */
  defaultExpandAllRows?: boolean;
  /**
   * Default expanded rows
   */
  defaultExpandedRowKeys?: string[]; // Default expanded rows
  /**
   * Expanded rows
   */
  expandedRowKeys?: Array<number | string>;
  /**
   * Whether the expand column is visible
   * @default true
   */
  visible?: boolean;
  /**
   * Set whether the row is expandable
   */
  rowExpandable?: (record: object) => boolean;
  /**
   * Triggered when the expand icon is clicked
   */
  onExpand?: (expanded: boolean, record: Record<string, any>) => void;
  /**
   * Triggered when expanded rows change
   */
  onExpandedRowsChange?: (expandedKeys?: Array<number | string>) => void;
  /**
   * Extra expanded row
   */
  expandedRowRender?: (
    record: object,
    index: number,
    page: Record<string, any>,
  ) => React.ReactNode;
}

export type SelectionKeyType = string | number;

export type ColumnSemanticType = 'inner' | 'action';

export interface HeadCellProps extends Omit<WrapedColumnProps, 'title'> {
  prefixCls?: string;
  title?: string;
  sortOrder?: number;
  tableActionBarShowOnHover?: boolean;
  sorters?: { [prop: string]: number };
  showSorterTooltip?: boolean;
  internalFilters?: { [dataIndex: string]: boolean }; // Whether this column is filtered
  onSort?: (dataIndex: string, sorter: any) => void;
  onInternalFilter?: (dataIndex: string, value: string) => void;
}

// Row selection config
export interface RowSelectionType {
  /**
   * Single or multiple selection
   */
  type: 'checkbox' | 'radio';
  /**
   * Column width
   */
  width?: number | string;
  /**
   * Set the select-all node
   * @default true
   */
  selectAll?: React.ReactNode | boolean;
  /**
   * (Controlled) Selected row keys
   */
  selectedRowKeys?: string[] | number[];
  /**
   * Default selected row keys
   */
  defaultSelectedRowKeys?: string[] | number[];
  /**
   * Set which column the Checkbox or Radio is in
   * @default 1
   */
  index?: number;
  /***
   * Whether disabled
   * */
  disabled?:
  | boolean
  | Array<boolean>
  | ((record: Record<string, unknown>, index: number) => boolean);
  /**
   * Set Checkbox or Radio properties
   */
  onCell?: (
    record: Record<string, unknown>,
    rowIndex: number,
  ) => Record<string, unknown>;
  /**
   * Render checkbox, can be used to hide Checkbox for specific rows
   */
  renderCell?: (
    record: Record<string, unknown>,
    rowIndex: number,
  ) => React.ReactNode;
  /**
   * Callback when selection changes
   */
  onChange?: (
    selectedRowKeys: string[] | number[],
    selectedRows: Array<Record<string, unknown>> | Record<string, unknown>,
  ) => void;
  /**
   * Callback when select-all is toggled
   */
  onSelectAll?: (
    selected: boolean,
    selectedRowKeys: string[] | number[],
    selectedRows: unknown,
  ) => void;

  selections?: Array<any>;
}

export interface ColumnProps {
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Semantic class names
  */
  classNames?: Partial<Record<ColumnSemanticType, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<ColumnSemanticType, React.CSSProperties>>;
  /**
   * Alignment
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Fixed column, setting to true is equivalent to left
   */
  fixed?: 'left' | 'right' | true; // Whether fixed, and whether fixed to left or right
  /**
   * Filter config
   */
  filter?: {
    /**
     * Filter mode
     */
    filterMode?: 'tree' | 'menu';
    /**
     * Filter menu items
     */
    items?: Array<Record<string, any>>;
    /**
     * Whether filtered, icon highlighted
     * @default true
     */
    filtered?: boolean;
    /**
     * Whether to filter when the filter menu closes
     * @default true
     */
    filterOnClose?: boolean;
    /**
     * Whether searchable, when items is undefined, it acts as a search component
     */
    searchable?: boolean;
    /**
     * Filter icon
     */
    icon?: (filtered: boolean) => React.ReactNode;
    /**
     * Custom filter function, e.g. custom search
     */
    render?: () => React.ReactNode;
    /**
     * Filter callback function
     */
    onFilter?: (value: string, record: Record<string, any>) => boolean;
  };
  /**
   * Sorter config
   */
  sorter?:
  | boolean
  | {
    /**
     * Sort function
     */
    sort?: () => number | boolean;
    /**
     * Whether to support multi-column sort, if set to a number, it indicates the number of sortable columns
     */
    multiple?: boolean | number;
    /**
     * Controlled sort order
     */
    sortOrder?: 'ascend' | 'descend' | null;
    /**
     * Default sort order
     */
    defaultSortOrder?: 'ascend' | 'descend';
    /**
     * Set sort icon
     */
    icon?: (sortOrder: 'ascend' | 'descend' | null) => React.ReactNode;
  };
  /**
   * Row data index
   */
  dataIndex?: string;
  /**
   * Unique key for React rendering. If dataIndex is set, key can be omitted
   */
  key?: string | number;
  /**
   * Set width
   */
  width?: number | string;
  /**
   * Set header display text
   */
  title?: React.ReactNode;
  /**
   * Set header help icon
  */
  helper?: string | React.ReactNode;
  /**
   * Callback function for custom cell content
   */
  children?: (record: Record<string, any>, rowIndex: number) => React.ReactNode;
  /**
   * Set cell properties
   */
  onCell?: (record: Record<string, unknown>, rowIndex: number) => object;
  /**
   * Set header cell properties
   */
  onHeaderCell?: (column: ColumnProps) => object;
  /**
   * Custom render cell content
   */
  render?: (record: HeadCellProps | Record<string, unknown>, rowIndex: number) => React.ReactNode;
}

export interface WrapedColumnProps
  extends ColumnProps, ExpandableType, Omit<RowSelectionType, 'onCell'> {
  /**
   * Whether this is the last column fixed to the left
   */
  isFixedLeftLast?: boolean;
  /**
   * Whether this is the first column fixed to the right
   */
  isFixedRightFirst?: boolean;
  /**
   * prefixCls
   */
}

type DownloadType = ButtonProps;

export type SemanticProps = {
  /**
   * Semantic class names
   */
  classNames?: Partial<Record<SemanticType, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<SemanticType, React.CSSProperties>>;
  /**
   * Custom table elements
   */
  components?: Partial<Record<SemanticType, React.ReactNode>>;
};

export interface HeaderProps extends SemanticProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom table top area
   */
  header?: React.ReactNode | (() => React.ReactNode);
  /**
   * Whether CSV data download is enabled
   */
  download?:
  | boolean
  | DownloadType
  | ((obj: {
    columns: ColumnProps[];
    data: Array<Record<string, any>>;
    pageData: Array<Record<string, any>>;
  }) => DownloadType);
  /**
   * Raw data
   */
  dataSource: Array<Record<string, any>>;
  /**
   * Current page data
   */
  pageData: Array<Record<string, any>>;
  /**
   * Column config
   */
  columns: Array<ColumnProps>;
}

export interface FooterProps {
  /**
   * Configure table footer area
   */
  footer?: React.ReactNode | (() => React.ReactNode);
}

export interface TableRowProps {
  current: number;
  pageSize: number;
  index: number;
  record: Record<string, any>;
  columns: ColumnProps[];
  expandable?: ExpandableType;
  expandedRowKeys?: Array<string | number>;
  selectedRowKeys?: Array<string | number>;
  highlight?: 'odd' | 'even' | Array<number>;
  stripe?: boolean;
  expandedKeyType?: string;
  onRow?: (record: Record<string, any>, index: number) => Record<string, any>;
  rowClassName?: (record: Record<string, any>, index: number) => string;
  rowStyle?: (
    record: Record<string, any>,
    index: number,
  ) => React.CSSProperties;
  onDoubleClick?: (
    record: Record<string, any>,
    event: React.MouseEvent<HTMLTableRowElement>,
  ) => void;
  // Internal events
  onExpand: ({
    expanded,
    record,
    index,
  }: {
    expanded: boolean;
    record: Record<string, any>;
    index: number;
  }) => void;
  // Checkbox or Radio onChange event
  onSelectionChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

type LazyLoadType = {
  lazyLoadRows?: number; // Number of rows to lazy load
  safeRows?: number; // Number of safe rows above and below during lazy load
  onLazyLoad?: () =>
    | Promise<Array<Record<string, any>>>
    | Array<Record<string, any>>;
};

export interface LazyRowProps extends TableRowProps {
  range?: { start: number; end: number };
  lazyLoad?: boolean | LazyLoadType;
}

export interface TableBodyProps extends Omit<LazyRowProps, 'index' | 'record'> {
  pageData: Array<Record<string, any>>;
  noData?: React.ReactNode;
}

export type SemanticType =
  | 'header'
  | 'thead'
  | 'th'
  | 'tr'
  | 'td'
  | 'tbody'
  | 'tfooter'
  | 'table'
  | 'footer';

export type onChangeParams = {
  /**
   * Pagination info
   */
  pagination?: object;
  /**
   * Sorter info
   */
  sorter?: object;
  /**
   * Filter info
   */
  filters?: object;
  /**
   * Current data
   */
  currentDataSource?: Array<object>;
  /**
   * onChange action type
   */
  action: 'paginate' | 'sort' | 'filter';
};

export type PaginationType = PaginationProps & {
  /**
   * Pagination position
   */
  position?: 'top' | 'bottom';
  /**
   * Override current type
   */
  current: number;
  /**
   * Override pageSize type
   */
  pageSize: number;
};

export interface TableProps extends FooterProps, Omit<HeaderProps, 'pageData'>, DataAttributeProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom root class name
   */
  className?: string; //act on table wrapper
  /**
   * Custom root style
   */
  style?: React.CSSProperties; // act on table wrapper
  /**
   * Semantic class names
   */
  classNames?: Partial<Record<SemanticType, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<SemanticType, React.CSSProperties>>;
  /**
   * Custom table elements
   */
  components?: Partial<Record<SemanticType, React.ReactNode>>;
  /**
   * Whether to show outer and column borders
   */
  bordered?: boolean;
  /**
   * Table column config
   */
  columns: ColumnProps[]; // Includes expandable and selection columns
  /**
   * Children, set column config via Column
   */
  children?:
  | Array<React.ReactElement<ColumnProps>>
  | React.ReactElement<ColumnProps>;
  /**
   * Locale text, including sort and empty data hints
   */
  locale?: Record<string, string>;
  /**
   * Data
   */
  dataSource: Array<Record<string, any>>; // Data source
  /**
   * Table footer
   */
  footer?: React.ReactNode | (() => React.ReactNode);
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Zebra stripes
   */
  stripe?: boolean;
  /**
   * Set the render container for popup components inside the table
   */
  getPopupContainer?: () => HTMLElement;
  /**
   * Row class name, unlike classNames, this prop can be set dynamically via a function
   */
  rowClassName?: (record: object) => string;
  /**
   * Pagination config
   */
  pagination?: Partial<PaginationType> | boolean;
  /**
   * Whether table rows are selectable
   */
  rowSelection?: RowSelectionType;
  /**
   * Whether expandable
   */
  expandable?: ExpandableType;
  /**
   * Column filter
   */
  //   columnFilter?: ColumnFilterType;
  /**
   * Whether the table is scrollable
   */
  scroll?: { y?: number; x?: number };
  /**
   * Whether to show header
   * @default true
   */
  showHeader?: boolean;
  /**
   * Configure sort tooltip
   */
  showSorterTooltip?: boolean;
  /**
   * Table size
   */
  size?: 'small' | 'default' | 'large';
  /**
   * Set the unique key for rows
   * @default id
   */
  rowKey?: string | ((record: Record<string, any>) => string);
  /**
   * Summary bar
   */
  summary?: (pageData: Array<Record<string, any>>) => React.ReactNode;
  /**
   * Set table layout
   */
  tableLayout?: 'auto' | 'fixed'; // Table layout, act on table tag
  /**
   * Whether to enable virtual list
   */
  virtual?: boolean;
  /**
   * Callback when pagination, sorting, or filtering changes
   */
  onChange?: ({
    /**
     * Pagination info
     * */
    pagination,
    /**
     * Filter info
     * */
    filters,
    /**
     * Sorter info
     */
    sorter,
    /**
     * Current data
     */
    currentDataSource,
    /**
     * onChange action type
     */
    action,
  }: onChangeParams) => void;
  /**
   * Custom row properties
   */
  onRow?: (record: Record<string, any>, index: number) => Record<string, any>;
  /**
   * Custom header row properties
   */
  onHeaderRow?: () => Record<string, any>;
}

export interface TFooterProps {
  summary: (pageData: Record<string, any>[]) => React.ReactNode;
  pageData: Array<Record<string, any>>;
}
