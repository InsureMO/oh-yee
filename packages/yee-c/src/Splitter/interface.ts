import type { DataAttributeProps } from '../utils/types';

export interface SplitterItemProps {
  /**
   * custom item element class name prefix
   */
  prefixCls?: string;
  /**
   * custom item element class name
   * */
  className?: string;
  /**
   * custom item element style
   * */
  style?: React.CSSProperties;
  /**
   *quick collapse
   */
  collapsible?: boolean | { start?: boolean; end?: boolean };
  /**
   * Do you want to enable drag and drop scaling
   */
  resizable?: boolean;
  /**
   * children
   * */
  children: React.ReactNode;
  /**
   * panel min size
   * */
  min?: string | number;
  /**
   * panel max size
   * */
  max?: string | number;
  /**
   * panel size, controlled
   */
  size?: string | number;
  /**
   * default panel size, uncontrolled
   */
  defaultSize?: string | number;
  onExpand?: (expanded: boolean) => void;
}

export interface SplitterProps extends DataAttributeProps {
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
   * layout direction
   * @default horizontal
   * */
  layout?: 'horizontal' | 'vertical';
  /**
   * children
   */
  children?: React.ReactElement[];
  /**
   * display border or not
   * */
  bordered?: boolean;
  itemPadding?: number | string;
  /**
   * panel size change event
   * */
  onResize?: (sizes: number[]) => void;
}
