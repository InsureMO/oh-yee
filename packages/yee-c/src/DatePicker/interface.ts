import { Dayjs } from 'dayjs';
import { PickerPanelProps, PickerType } from '../PickerPanel';
import { TriggerProps } from '../Trigger';
import type { DataAttributeProps } from '../utils/types';

export type { PickerType };

export interface DatePickerProps
  extends
  DataAttributeProps,
  Omit<PickerPanelProps, 'value' | 'onChange' | 'cellRender'>,
  Omit<TriggerProps, 'popup' | 'children'> {
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
   * Whether to allow clearing
   */
  allowClear?: boolean;
  /**
   * Controlled value
   */
  value?: string | Dayjs;
  /**
   * Default value
   */
  defaultValue?: string | Dayjs;
  /**
   * Placeholder
   */
  placeholder?: string;
  /**
   * Custom date cell content
   */
  cellRender?: (date: Dayjs, panel: PickerType) => React.ReactNode;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Whether to auto-sort, effective for date ranges
   */
  order?: boolean;
  /**
   * Picker type
   * @default date
   */
  picker?: PickerType;
  /**
   * @description Date display format
   * @default YYYY-MM-DD
   */
  format?: string;
  /**
   * @description Saved date format
   * @default YYYY-MM-DD
   */
  saveFormat?: string;
  /**
   * @description Custom native attributes for date table cells
  */
  onCell?: (currentDate: Dayjs) => React.HTMLAttributes<HTMLTableCellElement>;
  /**
   * date change callback event
   */
  onChange?: (date: string, dateObj?: Dayjs) => void;
  /**
   * @description Whether to automatically switch between mobile/desktop rendering mode based on screen width
   * @default true
   */
  responsive?: boolean;
}
