export type SemanticType = '';

export type TreeNode<T> = {
  /**
   * uid
   */
  uid: string;
  /**
   * Unique key
   * */
  key: string;
  /**
   * Display node text
   */
  label: string;
  /**
   * Title attribute for label
   */
  title?: string;
  /**
   * Child nodes
   */
  children?: Array<TreeNode<T>>;
  /**
   * Depth level
   */
  depth: number;
  /**
   * Parent node key
   * */
  pKey: string | null;
  /**
   * Whether this is a leaf node
   * */
  isLeaf: boolean;
  /**
   * Whether this is the last node at its level
   * */
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
   * Ancestor keys
   */
  path: string[];
  /**
   * Whether to show connecting lines
   */
  lines: number[];
  /**
   * List of child node keys
   */
  childKeys?: Array<string | number>;
  /**
   * Original data
   */
  original: T;
};

export interface TreeNodeProps<T> {
  node: TreeNode<T>;
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
   * Specify which tree nodes to expand by default
   */
  defaultExpandedKeys?: string[];
  /**
   * Controlled expanded tree nodes
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
   * */
  dataSource?: Array<T> | T;
  /**
   * Checked tree nodes (controlled)
   */
  checkedKeys?: Array<string | number>;
  /**
   * Checked tree nodes (uncontrolled)
   */
  defaultCheckedKeys?: Array<string | number>;
  /**
   * Set selected tree nodes, set multiple to true for multi-select
   */
  selectedKeys?: Array<string | number>;
  /**
   * Set default selected tree nodes, set multiple to true for multi-select
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
      node: T[];
    },
  ) => void;
}
