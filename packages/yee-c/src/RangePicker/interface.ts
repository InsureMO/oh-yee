import { Dayjs } from 'dayjs';
import type { DatePickerProps } from '../DatePicker';

type SemanticDOM = 'startinput' | 'endinput';

export interface RangePickerProps extends Omit<
  DatePickerProps,
  | 'placeholder'
  | 'onChange'
  | 'disabled'
  | 'value'
  | 'defaultValue'
  | 'classNames'
  | 'styles'
  | 'disabledDate'
> {
  /**
   * @description Controlled value
   */
  value?: string[] | number[] | Dayjs[];
  /**
   * @description Default value
   * */
  defaultValue?: string[] | number[] | Dayjs[];
  /**
   * @description Semantic class names
   */
  classNames?: Partial<Record<SemanticDOM, string>>;
  /**
   * @description Semantic styles
   */
  styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
  /**
   * @description Custom class name
   */
  className?: string;
  /**
   * @description Custom style
   */
  style?: React.CSSProperties;
  /**
   * @description Placeholder
   * */
  placeholder?: string | string[];
  /**
   * @description Whether the end date is limited by the start date
   */
  endLimitStart?: boolean;
  /**
   * @description Preset time range shortcuts
   */
  ranges?: Record<string, [Dayjs, Dayjs] | (() => [Dayjs, Dayjs])>;
  /**
   * @description Input separator
   */
  separator?: React.ReactNode;
  /**
   * @description Whether disabled
   * */
  disabled?: boolean | [boolean, boolean];
  /**
   * @description Whether to show clear button
   */
  allowClear?: boolean;
  /**
   * @description Input size
   */
  size?: 'small' | 'middle' | 'large';
  /**
   * @description Set validation status
   */
  status?: 'error' | 'warning';
  /**
   * @description Unselectable dates
   */
  disabledDate?: (current: Dayjs, type: 'start' | 'end') => boolean;
  /**
   * @description Value trigger callback
   * */
  onChange?: (value: string[], date: any[]) => void;
  /**
   * @description Callback when start date value changes
   * */
  onStartChange?: (value: string, date: Dayjs) => void;
  /**
   * @description Callback when end date changes
   */
  onEndChange?: (value: string, date: Dayjs) => void;
  /**
   * @description Callback when calendar popup opens or closes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * @description Callback on clear
   */
  onClear?: () => void;
}
