import RangePicker from '../RangePicker';
import InternalDatePicker from './date-picker';

export type { DatePickerProps } from './interface';

type DatePickerType = typeof InternalDatePicker & {
  RangePicker: typeof RangePicker;
};

const DatePicker = InternalDatePicker as DatePickerType;
DatePicker.RangePicker = RangePicker;

export default DatePicker;
