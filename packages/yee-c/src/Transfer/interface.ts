import type { PaginationProps } from '../Pagination';
import type { DataAttributeProps } from '../utils/types';

export type Key = string | number;

export interface DataSource {
  /**
   * Native title attribute
   * */
  title?: string;
  /**
   * Option value
   * */
  key: string | number;
  /**
   * Option label
   * */
  label: string;
  /**
   * Whether disabled
   * */
  disabled?: boolean;
  [key: string]: any;
}

export interface TransferProps extends DataAttributeProps {
  /**
   * Class name prefix
   * */
  prefixCls?: string;
  /**
   * Class name
   * */
  className?: string;
  /**
   * Style
   * */
  style?: React.CSSProperties;
  /**
   * Data source
   * */
  dataSource: DataSource[];
  /**
   * Titles
   * */

  titles?: [string, string];
  /**
   * Whether searchable
   * */
  searchable?: boolean;
  /**
   * Target keys
   * */
  targetKeys?: Array<string | number>;
  /**
   * Default target keys
   * */
  defaultTargetKeys?: Array<string | number>;
  /**
   * Selected keys
   * */
  selectedKeys?: Array<string | number>;
  /**
   * Default selected keys
   * */
  defaultSelectedKeys?: Array<string | number>;
  /**
   * Whether one-way transfer
   */
  oneWay?: boolean;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Custom left/right transfer operation buttons
   */
  operations?: [React.ReactNode, React.ReactNode];
  /**
   * Custom pagination
   */
  pagination?: PaginationProps;
  searchIconPosition?: 'left' | 'right';
  /**
   * Whether draggable
   */
  draggable?: boolean;
  /**
   * Specify the key for each item, defaults to 'key'
   * */
  rowKey?: string | ((option: DataSource) => string);
  /**
   * Specify the display text for each item, defaults to 'label'
   */
  rowLabel?: string | ((option: DataSource) => string);
  /**
   * Callback when selection changes
   */
  onChange?: (
    targetKeys: Array<string | number>,
    direction: 'left' | 'right',
    moveKeys: Array<string | number>,
  ) => void;
  /**
   * Callback when selected items change
   */
  onSelectChange?: (
    source: Array<string | number>,
    target: Array<string | number>,
  ) => void;
  /**
   * Callback when dragging
   */
  onDrop?: (dropObj: Record<string, any>, dataSource: DataSource[]) => void;
}

export interface TransferListProps {
  type: 'source' | 'target';
  title: string;
  dataSource: DataSource[];
  searchable: boolean;
  checkedKeys: Array<string | number>;
  oneWay?: boolean;
  pagination?: Omit<PaginationProps, 'total'> & { total?: number };
  draggable?: boolean;
  targetMinCountLimit?: number;
  onDrop?: (dropObj: Record<string, any>, dataSource: DataSource[]) => void;
  onDelete?: (key: string | number) => void;
  onItemSelect: (keys: Array<string | number>) => void;
  onItemSelectAll: (checked: boolean) => void;
}

export interface TransferContextValue {
  rowKey: string | ((option: DataSource) => string);
  rowLabel: string | ((option: DataSource) => string);
  disabled?: boolean;
}
