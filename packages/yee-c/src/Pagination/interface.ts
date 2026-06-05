export type SemanticType = 'next' | 'prev' | 'jumpPrev' | 'jumpNext' | 'item';

export interface PaginationItemsProps {
  /**
   * Custom prefix class name
   */
  prefixCls?: string;
  /**
   * Semantic class names
   */
  classNames?: Partial<Record<SemanticType, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<SemanticType, React.CSSProperties>>;
  /**
   * Semantic structure
   */
  components?: Partial<Record<SemanticType, React.ReactNode>>;
  /**
   * Total page count
   */
  pageCount: number;
  /**
   * Current page number
   */
  current: number;
  overPage?: number;
  /**
   * Page change callback
   */
  onChange: (current: number) => void;
}

import type { DataAttributeProps } from '../utils/types';

export interface PaginationProps extends DataAttributeProps {
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
   * Semantic class names
   */
  classNames?: Partial<Record<SemanticType, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<SemanticType, React.CSSProperties>>;
  /**
   * Semantic structure
   */
  components?: Partial<Record<SemanticType, React.ReactNode>>;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * (Controlled) Current page number
   */
  current?: number;
  /**
   * Default page number
   * @default 1
   */
  defaultCurrent?: number;
  /**
   * Number of items per page
   */
  pageSize?: number;
  /**
   * Default number of items per page
   */
  defaultPageSize?: number;
  /**
   * Total number of items
   */
  total: number;
  /**
   * Whether to hide the paginator when there is only one page
   */
  hideOnSinglePage?: boolean;
  /**
   * Specify how many items can be displayed per page
   * @default '[5, 10, 15, 20, 30, 50]'
   */
  pageSizeOptions?: Array<number>;
  /**
   * Whether to enable quick jump to a page
   */
  showQuickJumper?: boolean;
  /**
   * Whether to show the page size changer
   */
  showSizeChanger?: boolean;
  /**
   * Whether to show the total number of pages and current page number
   */
  showTotal?: boolean | ((total: number, current: number) => React.ReactNode);
  /**
   * Whether to enable simple mode
   */
  simple?: boolean;
  /**
   * Set size
   * @default default
   */
  size?: 'small' | 'default';
  /**
   * Callback when page number or pageSize changes
   */
  onChange?: ({
    current,
    pageSize,
  }: {
    current: number;
    pageSize: number;
  }) => void;
  /**
   * Callback when pageSize changes
   */
  onPageSizeChange?: ({
    current,
    pageSize,
  }: {
    current: number;
    pageSize: number;
  }) => void;
}
