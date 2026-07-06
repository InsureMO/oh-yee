import { Dayjs } from 'dayjs';
import { ReactNode } from 'react';

export type PickerMode =
  | 'date'
  | 'datetime'
  | 'month'
  | 'year'
  | 'decade'
  | 'quarter'
  | 'week';
export type PickerType =
  | 'date'
  | 'datetime'
  | 'month'
  | 'year'
  | 'decade'
  | 'quarter'
  | 'week'
  | 'time';

export interface RangePanelProps {
  prefixCls?: string;
  panel?: 'start' | 'end';
  value: Array<Dayjs | undefined>;
  pickerView: [Dayjs, Dayjs];
  picker?: PickerType;
  mode?: PickerMode;
  format?: string;
  saveFormat?: string;
  onChange?: (date: Dayjs, panel: string) => void;
  onPanelChange?: (date: Dayjs, type?: 'start' | 'end') => void;
  onCellMouse?: (date: Dayjs | string) => void;
  hoverRange?: Array<Dayjs | null | undefined>;
  selectedRange?: Array<Dayjs | null | undefined>;
  disabledDate?: (current: Dayjs, type: 'start' | 'end') => boolean;
  showNextIcon?: boolean;
  showSuperNextIcon?: boolean;
  showPrevIcon?: boolean;
  showSuperPrevIcon?: boolean;
  footer?: boolean | ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
