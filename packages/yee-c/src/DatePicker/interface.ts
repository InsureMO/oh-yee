import { Dayjs } from 'dayjs';
import { PickerPanelProps, PickerType } from '../PickerPanel';
import { TriggerProps } from '../Trigger';
import type { DataAttributeProps } from '../utils/types';

export type { PickerType };

export interface ShowTimeConfig {
  /**
   * Time columns format, e.g. `HH:mm`, `HH:mm:ss`
   * Defaults to the time part of format
   */
  timeFormat?: string;
  /**
   * Interval between hour options
   * @default 1
   */
  hourStep?: number;
  /**
   * Interval between minute options
   * @default 1
   */
  minuteStep?: number;
  /**
   * Interval between second options
   * @default 1
   */
  secondStep?: number;
  /**
   * Time applied when a date is picked without adjusting the time columns
   */
  defaultValue?: string | Dayjs;
}

export interface DatePickerProps
  extends
    DataAttributeProps,
    Omit<PickerPanelProps, 'value' | 'onChange' | 'cellRender' | 'showTime'>,
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
   * Input size
   * @default middle
   */
  size?: 'small' | 'middle' | 'large';
  /**
   * Set validation status
   */
  status?: 'error' | 'warning';
  /**
   * Controlled open state of the panel
   */
  open?: boolean;
  /**
   * Open the panel by default (uncontrolled)
   */
  defaultOpen?: boolean;
  /**
   * Callback when the panel open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Picker type
   * @default date
   */
  picker?: PickerType;
  /**
   * Whether to show the time panel (date + time columns)
   * @default true when format contains an hour token (e.g. YYYY-MM-DD HH:mm:ss)
   */
  showTime?: boolean | ShowTimeConfig;
  /**
   * Whether the input is read-only (panel-only picking)
   * @default false
   */
  inputReadOnly?: boolean;
  /**
   * Callback when the panel view switches (e.g. date → month/year)
   */
  onPanelChange?: (date: Dayjs, panel?: PickerType) => void;
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
