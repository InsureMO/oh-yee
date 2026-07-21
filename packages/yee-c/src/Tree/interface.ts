export type SemanticType = '';

export type DragPosition = 'before' | 'after' | 'inside';

export type { MoveInfo } from './utils/tree-tools';

export type TreeNode<T> = {
  /**
   * Unique internal identifier built from key path joined by '\x00'.
   * Guaranteed unique even when user-provided `key` values repeat across branches.
   */
  uid: string;
  /**
   * User-provided key (may not be globally unique)
   */
  key: string | number;
  /**
   * Display node text
   */
  label: string;
  /**
   * Title attribute for label
   */
  title?: string;
  /**
   * Child nodes (only present in raw tree; not used in flat list)
   */
  children?: Array<TreeNode<T>>;
  /**
   * Depth level
   */
  depth: number;
  /**
   * Parent node uid (null for root nodes)
   */
  pUid: string | null;
  /**
   * Whether this is a leaf node
   */
  isLeaf: boolean;
  /**
   * Whether this is the last node at its level
   */
  isLast: boolean;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Custom icon
   */
  icon?: React.ReactNode | (() => React.ReactNode);
  /**
   * Ancestor keys (user-provided keys, for building uid path)
   */
  path: Array<string | number>;
  /**
   * Whether to show connecting lines at given depth levels
   */
  lines: number[];
  /**
   * All descendant uids (collected bottom-up). Used for check/uncheck propagation.
   */
  childUids?: Array<string>;
  /**
   * Original data
   */
  original: T;
};

export interface TreeNodeProps<T> {
  node: TreeNode<T>;
  style?: React.CSSProperties;
}

export interface TreeProps<T> {
  /**
   * Custom class name prefix
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
   * Add Checkbox before nodes
   */
  checkable?: boolean;
  /**
   * Whether to expand all tree nodes by default
   */
  defaultExpandAll?: boolean;
  /**
   * Specify which tree nodes to expand by default (user keys)
   */
  defaultExpandedKeys?: string[];
  /**
   * Controlled expanded tree nodes (user keys)
   */
  expandedKeys?: string[];
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Whether to allow dragging
   */
  draggable?: boolean;
  /**
   * Whether to allow dropping a dragged node at the given position.
   * Return false to forbid the drop (cursor shows "no-drop").
   */
  allowDrop?: (info: {
    dragNode: T;
    dropNode: T;
    position: DragPosition;
  }) => boolean;
  /**
   * Callback after a node is dropped. Pure controlled: the Tree does not
   * mutate dataSource — reorder it yourself (e.g. with `moveTreeNode`).
   */
  onDrop?: (info: {
    /** Original data of the dragged node */
    dragNode: T;
    /** Original data of the target node */
    dropNode: T;
    dragKey: string | number;
    dropKey: string | number;
    /** Full key path from root to the dragged node (for non-unique key support) */
    dragPath: Array<string | number>;
    /** Full key path from root to the drop target (for non-unique key support) */
    dropPath: Array<string | number>;
    position: DragPosition;
    /** Convenience flag: true when position is 'before' or 'after' */
    dropToGap: boolean;
  }) => void;
  /**
   * Whether to show connecting lines
   */
  showLine?: boolean;
  /**
   * @description Whether to show node icons
   * @default true
   */
  showIcon?: boolean;
  /**
   * Icon before the title, requires showIcon to be true
   */
  icon?: React.ReactNode | ((props: TreeProps<T>) => React.ReactNode);
  /**
   * Expand/collapse button icon
   */
  switcherIcon?: [React.ReactNode, React.ReactNode];
  /**
   * Whether tree nodes support multiple selection
   *  @default false
   */
  multiple?: boolean;
  /**
   * Customize node key, title, children field names
   */
  fieldNames?: { key?: keyof T; label?: keyof T; children?: keyof T };
  /**
   * Asynchronous data loading
   */
  loadData?: () => void;
  /**
   * Data source
   */
  dataSource?: Array<T> | T;
  /**
   * Enable virtual scrolling for large datasets.
   * Requires `height` to be set.
   * @default false
   */
  virtual?: boolean;
  /**
   * Height of the scrollable container in pixels.
   * Required when `virtual` is true.
   */
  height?: number;
  /**
   * Fixed height of each tree node row in pixels.
   * Used for virtual scroll calculation.
   * @default 28
   */
  itemHeight?: number;
  /**
   * Checked tree nodes (controlled, user keys)
   */
  checkedKeys?: Array<string | number>;
  /**
   * Checked tree nodes (uncontrolled, user keys)
   */
  defaultCheckedKeys?: Array<string | number>;
  /**
   * Set selected tree nodes, set multiple to true for multi-select (user keys)
   */
  selectedKeys?: Array<string | number>;
  /**
   * Set default selected tree nodes (user keys)
   */
  defaultSelectedKeys?: Array<string | number>;
  /**
   * Callback when checkbox is checked
   */
  onCheck?: (
    checkedKeys: Array<string | number>,
    params: {
      checked: boolean;
      checkedNodes: T[];
      node: T;
    },
  ) => void;
  /**
   * Callback when tree node is clicked
   */
  onSelect?: (
    selectedKeys: Array<string | number>,
    params: {
      selected: boolean;
      selectedNodes: T[];
      node: T;
    },
  ) => void;
  /**
   * Callback when expand/collapse
   */
  onExpand?: (
    expandedKeys: Array<string | number>,
    params: {
      expanded: boolean;
      expandedNodes: T[];
      node: T;
    },
  ) => void;
}
