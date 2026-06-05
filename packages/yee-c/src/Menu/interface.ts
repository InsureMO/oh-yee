import type { DataAttributeProps } from '../utils/types';

export type MenuItemType = {
  /**
   * Menu item type
   * @default 'item'
   */
  type?: 'item';
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Menu icon
   */
  icon?: React.ReactNode;
  /**
   * Unique identifier
   */
  key: string;
  /**
   * Menu item title
   */
  label: React.ReactNode;
  /**
   * Hover title
   */
  title?: string;
  /**
   * Sub-menu items
   */
  children?: Array<MenuItemType>;
  /**
   * Other properties
   */
  [prop: string]: unknown;
};

export type MenuItemGroupType = {
  /**
   * Group type
   */
  type: 'group';
  /**
   * Group title
   */
  label: React.ReactNode;
  /**
   * Menu items within the group
   */
  children: Array<MenuItemType>;
};

export type MenuDividerType = {
  /**
   * Divider type
   */
  type: 'divider';
  /**
   * Unique identifier
   */
  key?: string;
};

export type MenuItemCommonType =
  | MenuItemType
  | MenuItemGroupType
  | MenuDividerType;

export type WrapperedMenuItem = MenuItemType & {
  keyPath: Array<string>;
};

export type MenuItemProps = { item: MenuItemCommonType };

export type SemanticType = 'item';

export interface MenuProps extends DataAttributeProps {
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
   * Semantic structure class names
   */
  classNames?: Partial<Record<SemanticType, string>>;
  /**
   * Semantic structure styles
   */
  styles?: Partial<Record<SemanticType, React.CSSProperties>>;
  /**
   * Default open menu item keys
   */
  defaultOpenKeys?: Array<string>;
  /**
   * Default selected menu item keys
   */
  defaultSelectedKeys?: Array<string>;
  /**
   * Controlled open menu item keys
   */
  openKeys?: Array<string>;
  /**
   * Controlled selected menu item keys
   */
  selectedKeys?: Array<string>;
  /**
   * Menu type, supports vertical, inline and horizontal
   */
  mode?: 'vertical' | 'inline' | 'horizontal';
  /**
   * Menu items
   */
  items: Array<MenuItemCommonType>;
  /**
   * Whether to allow multiple selection
   * @default false
   */
  multiple?: boolean;
  /**
   * Whether to enable keyboard control
   */
  keyboard?: boolean;
  /**
   * Expand sub-menu on mouse hover
   * @default true
   */
  expandedOnHover?: boolean;
  /**
   * Whether to collapse to icon-only in inline mode
   * @default false
   */
  inlineCollapsed?: boolean;
  /**
   * Called when sub-menu is expanded or collapsed
   */
  onOpenChange?: (openKeys: Array<string>) => void;
  /**
   * Called when an item is selected
   */
  onSelect?: (params: {
    item: MenuItemType;
    key: string;
    keyPath: Array<string>;
    selectedKeys: Array<string>;
    event: KeyboardEvent | MouseEvent;
  }) => void;
  /**
   * Called when a menu item is clicked
   */
  onClick?: (params: {
    item: MenuItemType;
    key: string;
    keyPath: Array<string>;
  }) => void;
  /**
   * Called when an item is deselected (in multiple mode)
   */
  onDeselect?: (params: {
    item: MenuItemType;
    key: string;
    keyPath: Array<string>;
    selectedKeys: Array<string>;
    event: KeyboardEvent | MouseEvent;
  }) => void;
  /**
   * Only expand one sub-menu at the same level
   */
  openOnly?: boolean;
  /**
   * Menu footer area
   */
  footer?: React.ReactNode;
}
