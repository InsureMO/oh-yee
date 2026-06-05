import type { DataAttributeProps } from '../utils/types';

export interface SliderProps extends DataAttributeProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Whether disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Current value
   */
  value?: number;
  /**
   * Default value
   */
  defaultValue?: number;
  /**
   * Minimum value
   * @default 0
   */
  min?: number;
  /**
   * Maximum value
   * @default 100
   */
  max?: number;
  /**
   * Step size
   * @default 1
   */
  step?: number;
  /**
   * Whether to show tooltip
   * @default true
   */
  tooltipVisible?: boolean;
  /**
   * Whether it is a range slider
   * @default false
   */
  range?: boolean;
  /**
   * Value when in range mode
   */
  rangeValue?: [number, number];
  /**
   * Default value when in range mode
   */
  defaultRangeValue?: [number, number];
  /**
   * Callback when value changes
   */
  onChange?: (value: number | [number, number]) => void;
  /**
   * Callback when mouse is released
   */
  onAfterChange?: (value: number | [number, number]) => void;
}
