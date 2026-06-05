import type { DataAttributeProps } from '../utils/types';

export interface RateProps extends DataAttributeProps {
  /**
   * Custom prefix class name
   */
  prefixCls?: string;
  /**
   * Children elements, used for custom rating icon or content
   */
  children?: React.ReactElement;
  /**
   * Custom inline style
   */
  style?: React.CSSProperties;
  /**
   * Custom CSS class name
   */
  className?: string;
  /**
   * Total rating count
   * @default 5
   */
  count?: number;
  /**
   * Current rating value (controlled mode)
   */
  value?: number;
  /**
   * Default rating value (uncontrolled mode)
   */
  defaultValue?: number;
  /**
   * Whether to disable rating
   */
  disabled?: boolean;
  /**
   * Whether to allow half-star rating
   */
  allowHalf?: boolean;
  /**
   * Whether to allow clearing the selected rating
   */
  allowClear?: boolean;
  /**
   * Custom rating icon or content
   */
  character?:
    | React.ReactNode
    | ((params: { index: number }) => React.ReactNode);
  /**
   * Callback when rating changes
   */
  onChange?: (value: number) => void;
  /**
   * Callback when mouse hovers over rating
   */
  onHoverChange?: (value: number) => void;
}

export interface StarProps extends Omit<RateProps, 'value' | 'defaultValue'> {
  /**
   * Star index
   */
  index: number;
  /**
   * Active state
   */
  active: boolean;
  /**
   * Current rating value
   */
  value: number;
  /**
   * Whether tooltip is visible
   */
  visible: boolean;
  /**
   * Click callback
   */
  onClick: (value: number) => void;
  /**
   * Hover callback
   */
  onHover: (value: number) => void;
  /**
   * Custom class name
   */
  className?: string;
}
