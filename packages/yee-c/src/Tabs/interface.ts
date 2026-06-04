import type { DataAttributeProps } from '../utils/types';

type SemanticDOM = 'header' | 'content';

export type TabItemType = {
  /**
   * Unique key corresponding to activeKey
   */
  key: string | number;
  /**
   * Tab display content
   */
  label: React.ReactNode;
  /**
   * Tab display icon
   */
  icon?: React.ReactNode;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Whether closable, effective when type="editable-card"
   * @default true
   */
  closable?: boolean;
  /**
   * Badge
   */
  badge?: number;
  /**
   * Sub-tabs
   */
  items?: Array<TabItemType>;
  /**
   * Display content
   */
  children?: React.ReactNode;
};

export interface TabsItemProps extends TabItemType {
  /**
   * Tab index
   */
  index?: number;
  /**
   * key
   * */
  $key: string | number;
  dropdown?: boolean;
  renderKeys?: Array<string | number>;
}

export interface TabsProps extends DataAttributeProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Custom root inline style
   */
  style?: React.CSSProperties;
  /**
   * @description Custom semantic class names
   */
  classNames?: Partial<Record<SemanticDOM, string>>;
  /**
   * @description Custom semantic styles
   */
  styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
  /**
   * Tab style
   */
  type?: 'card' | 'editable-card';
  /**
   * Key of the currently active tab panel
   */
  activeKey?: string | number;
  /**
   * Key of the default active tab panel
   */
  defaultActiveKey?: string | number;
  /**
   * Tab items content
   */
  items?: Array<TabItemType>;
  /**
   * Tab position
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Extra content in the tab header
   */
  headerExtra?: {
    prefix?: React.ReactNode | (() => React.ReactNode);
    suffix?: React.ReactNode | (() => React.ReactNode);
  };
  /**
   * Child elements
   */
  children?: Array<React.ReactElement>;
  /**
   * Whether to lazy load, only load content into DOM when switching to that tab
   */
  lazy?: boolean;
  /**
   * Callback when editing a tab
   */
  onEdit?: (type: 'add' | 'remove', key?: number | string) => void;
  /**
   * Callback when tab changes
   */
  onChange?: (key: string | number) => void;
  /**
   * Callback when a tab is clicked, returning false prevents tab switching and onChange
   */
  onTabClick?: (key: string | number) => void | boolean;
  /**
   * Whether to fix the header area using sticky positioning to keep it visible on scroll
   * @default false
   */
  fixedHeader?: boolean;
}
