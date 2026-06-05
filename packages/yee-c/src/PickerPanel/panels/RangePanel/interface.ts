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
  value?: Array<Dayjs | string | undefined>;
  viewDate?: string;
  picker?: PickerType;
  mode?: PickerMode;
  format?: string;
  saveFormat?: string;
  onChange?: (date: Dayjs, panel: string) => void;
  onPanelChange?: (dates: Dayjs[]) => void;
  onCellMouse?: (date: Dayjs | string) => void;
  hoverRange?: Array<Dayjs | null>;
  selectedRange?: Array<Dayjs | null>;
  disabledDate?: (current: Dayjs, type: 'start' | 'end') => boolean;
  showNextIcon?: boolean;
  showSuperNextIcon?: boolean;
  showPrevIcon?: boolean;
  showSuperPrevIcon?: boolean;
  footer?: boolean | ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
