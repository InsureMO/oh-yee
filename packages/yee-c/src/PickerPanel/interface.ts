import { Dayjs } from 'dayjs';
import type { usePanelConfigs } from './configs/locale-adapter';
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

/**
 * Antd-compatible config returned by `disabledTime`
 */
export interface DisabledTimeConfig {
  /**
   * Disabled hour values
   */
  disabledHours?: () => number[];
  /**
   * Disabled minute values for the given selected hour
   */
  disabledMinutes?: (hour: number) => number[];
  /**
   * Disabled second values for the given selected hour and minute
   */
  disabledSeconds?: (hour: number, minute: number) => number[];
}

/** Hour/minute/second granularity used by the time sub-panels. */
export type TimeUnit = 'hour' | 'minute' | 'second';

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
   * Time columns format, e.g. `HH:mm`, `HH:mm:ss`
   * @default HH:mm:ss
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
   * Date offset relative to a given date
   */
  offset?: { year?: number; month?: number; day?: number };
  /**
   * Callback when the panel view switches or the view date changes;
   * `panel` is the new view type (undefined for pure view-date navigation)
   */
  onPanelChange?: (date: Dayjs, panel?: PickerType) => void;
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
  hoverRange?: Array<Dayjs | null | undefined>;
  /**
   * Selected range dates [start date, end date]
   */
  selectedRange?: Array<Dayjs | null | undefined>;
  /**
   * Disabled date function
   */
  disabledDate?: (current: Dayjs) => boolean;
  /**
   * Disabled time values for the current panel date
   */
  disabledTime?: (current: Dayjs) => DisabledTimeConfig;
}

/**
 * Locale/config bag produced by `usePanelConfigs`, shared by every panel.
 */
export type PanelConfigs = ReturnType<typeof usePanelConfigs>;

/**
 * The `panelProps` bag shared by all date-picking panels, headers and bodies.
 *
 * Standalone (does not extend `PickerPanelProps`) so each panel only declares
 * the fields it actually reads while still receiving the full bag via
 * `{...props}` spreads (JSX spreads do not trigger excess-property checks).
 */
export interface PanelSharedProps {
  prefixCls?: string;
  picker?: PickerType;
  offset?: { year?: number; month?: number; day?: number };
  viewDate: Dayjs;
  selectedDate?: Dayjs;
  panelConfigs: PanelConfigs;
  handleMouseChange?: (date: Dayjs | '') => void;
  onViewDateChange: (date: Dayjs) => void;
  onPanelChange: (view: PickerType) => void;
  onSelect?: (date: Dayjs) => void;
  offsetYear?: number;
  /** Never set in `panelProps`, so always `undefined` at runtime. */
  nowDate?: Dayjs;
  weekStart?: number;
  showHeader?: boolean;
  cellRender?: (date: Dayjs, panel: PickerType) => React.ReactNode;
  prefixColumn?: (currentDate: Dayjs) => React.ReactNode;
  getRowClassName?: (currentDate: Dayjs) => string;
  hoverRange?: Array<Dayjs | null | undefined>;
  selectedRange?: Array<Dayjs | null | undefined>;
  maxDate?: Dayjs;
  minDate?: Dayjs;
}
