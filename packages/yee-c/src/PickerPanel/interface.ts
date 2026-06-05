import { Dayjs } from 'dayjs';
export type PickerType =
  | 'date'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
  | 'decade'
  | 'datetime'
  | 'time';

export type SemanticType =
  | 'prevIcon'
  | 'nextIcon'
  | 'superPrevIcon'
  | 'superNextIcon'
  | 'footer';

export type UnitType = 'day' | 'hour' | 'minute' | 'second';

interface HeaderProps {
  showPrevIcon?: boolean;
  showNextIcon?: boolean;
  showSuperPrevIcon?: boolean;
  showSuperNextIcon?: boolean;
}

export interface PickerPanelProps extends HeaderProps {
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
   * Semantic class names
   */
  classNames?: Partial<Record<SemanticType, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<SemanticType, React.CSSProperties>>;
  /**
   * Custom semantic structure
   */
  components?: Partial<Record<SemanticType, React.ReactNode>>;
  /**
   * Whether to show the current time button
   * @default true
   */
  showNow?: boolean;
  /**
   * Specify the date panel
   */
  picker?: PickerType;
  /**
   * Set panel footer
   * @default true
   */
  footer?: boolean | React.ReactNode;
  /**
   * Custom cell date content
   */
  cellRender?: (date: Dayjs, panel: PickerType) => React.ReactNode;
  /**
   * Minimum value
   */
  minDate?: Dayjs;
  /**
   * Maximum value
   */
  maxDate?: Dayjs;
  /**
   * Granularity for date comparison, effective when minDate or maxDate exists
   */
  unit?: UnitType;
  /**
   * Default panel value, resets to this date each time the panel is opened
   */
  defaultPickerView?: Dayjs;
  /**
   * Controlled panel value
   */
  pickerView?: Dayjs;
  /**
   * Selected value in the date panel
   */
  value?: Dayjs;
  /**
   * Whether to show time
   */
  showTime?: boolean;
  /**
   * Date offset relative to a given date
   */
  offset?: { year?: number; month?: number; day?: number };
  /**
   * Callback when panel switches
   */
  onPanelChange?: (date: Dayjs) => void;
  /**
   * Callback when date changes
   */
  onChange?: (date: Dayjs | undefined, panel: PickerType) => void;
  /**
   * Callback when mouse enters a date cell
   */
  onCellMouse?: (date: Dayjs) => void;
  /**
   * Hover range dates [start date, end date]
   */
  hoverRange?: Array<Dayjs | null>;
  /**
   * Selected range dates [start date, end date]
   */
  selectedRange?: Array<Dayjs | null>;
  /**
   * Disabled date function
   */
  disabledDate?: (current: Dayjs) => boolean;
}
