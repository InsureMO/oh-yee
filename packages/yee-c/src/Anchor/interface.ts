import type { DataAttributeProps } from '../utils/types';

export type AnchorItemType = {
  /**
   * Unique identifier
   */
  key: string;
  /**
   * Title
   */
  title: React.ReactNode;
  /**
   * Status
   */
  status?: 'success' | 'error' | 'warning';
};

export interface AnchorItemProps {
  /**
   * Target element key
   */
  targetKey: string;
  /**
   * Title
   */
  title: React.ReactNode;
  /**
   * Status
   */
  status?: 'success' | 'error' | 'warning';
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Level
   */
  level?: number;
  /**
   * Children
   */
  children?: React.ReactNode;
}

export type AnchorSemanticDOM = 'item' | 'active' | 'content';

export interface AnchorProps extends DataAttributeProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom root element class name
   */
  className?: string;
  /**
   * Custom root element style
   */
  style?: React.CSSProperties;
  /**
   * Semantic class names
   */
  classNames?: Partial<Record<AnchorSemanticDOM, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<AnchorSemanticDOM, React.CSSProperties>>;
  /**
   * Anchor configuration items
   */
  items?: Array<AnchorItemType>;
  /**
   * Children
   */
  children?: React.ReactNode;
  /**
   * Whether to auto-generate anchors
   * @default false
   */
  auto?: boolean;
  /**
   * Anchor group name (for auto-generation)
   */
  name?: string;
  /**
   * Default active anchor position
   */
  defaultActiveKey?: string;
  /**
   * Anchor position (controlled)
   */
  activeKey?: string;
  /**
   * Whether affixed
   * @default true
   */
  affix?: boolean;
  /**
   * Navigation direction
   * @default vertical
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * Distance from top to trigger anchor change
   * @default 0
   */
  offsetTop?: number;
  /**
   * Get the scroll container element
   */
  getContainer?: () => HTMLElement | Window;
  /**
   * Anchor change callback
   */
  onChange?: (key: string) => void;
}

export interface AnchorContextType {
  prefixCls: string;
  activeKey?: string;
  onClick?: (key: string) => void;
  classNames?: Partial<Record<AnchorSemanticDOM, string>>;
  styles?: Partial<Record<AnchorSemanticDOM, React.CSSProperties>>;
}
