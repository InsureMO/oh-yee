import dayjs, { Dayjs } from 'dayjs';
import { Calendar } from 'lucide-react';
import React, { FC, useCallback, useEffect, useState } from 'react';
import Button from '../Button';
import Drawer from '../Drawer';
import useEvent from '../hooks/useEvent';
import useMergedState from '../hooks/useMergedState';
import Input from '../Input';
import { useLocale } from '../locale';
import pickerUtils from '../PickerPanel/utils/pickerUtils';
import WheelPicker from '../WheelPicker';
import useWheelDateColumns from './hooks/use-wheel-columns';
import type { DatePickerProps } from './interface';

// import './style/mobile.less';

const DatePickerMobile: FC<DatePickerProps> = (props) => {
  const {
    prefixCls = 'yee-picker',
    value,
    defaultValue,
    format = 'YYYY-MM-DD',
    saveFormat = 'YYYY-MM-DD',
    picker = 'date',
    allowClear,
    disabled,
    placeholder,
    minDate,
    maxDate,
    onChange,
  } = props;

  const { locale } = useLocale();
  const { datepicker } = locale;

  const [open, setOpen] = useState(false);

  const handleState = useEvent(
    (date: string | number | Dayjs | undefined): string | undefined => {
      if (!date) return undefined;
      let _date = date;
      if (typeof _date === 'number') _date = String(_date);
      if (typeof _date === 'string') {
        const d = pickerUtils.init(_date, saveFormat);
        if (pickerUtils.isValid(d)) return _date;
      }
      if (dayjs.isDayjs(_date)) {
        if (pickerUtils.isValid(_date))
          return pickerUtils.format(_date, saveFormat);
      }
    },
  );

  const [mergedValue, setMergedValue] = useMergedState(undefined, {
    value,
    defaultValue,
    handleState,
    deepCompare: true,
  } as any);

  const [inputValue, setInputValue] = useState('');
  const [pickerValue, setPickerValue] = useState<Dayjs | undefined>();

  useEffect(() => {
    if (mergedValue) {
      const date = pickerUtils.init(mergedValue as string, saveFormat);
      setPickerValue(date);
      const show =
        picker === 'week'
          ? `${date.year()}-${date.week()}`
          : picker === 'quarter'
            ? `Q${date.quarter()}`
            : pickerUtils.format(date, format);
      setInputValue(show as string);
    } else {
      setPickerValue(undefined);
      setInputValue('');
    }
  }, [mergedValue, saveFormat, format, picker]);

  const {
    columns,
    wheelValue,
    handleWheelChange,
    getSelectedDate,
    hasColumns,
  } = useWheelDateColumns({
    picker,
    pickerValue,
    minDate,
    maxDate,
  });

  const handleConfirm = useCallback(() => {
    const date = getSelectedDate();
    const saveValue = date.format(saveFormat);
    const showValue = date.format(format);
    setPickerValue(date);
    setMergedValue(saveValue as any);
    setInputValue(showValue);
    onChange?.(saveValue, date);
    setOpen(false);
  }, [getSelectedDate, saveFormat, format, onChange, setMergedValue]);

  const handleOpen = useCallback(() => {
    if (disabled) return;
    setOpen(true);
  }, [disabled]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // If picker type doesn't support wheel columns (week, quarter, decade), fall back
  // to showing the calendar panel in a drawer — handled by the parent DatePicker
  // which won't route to this component for unsupported types.
  if (!hasColumns) {
    return null;
  }

  return (
    <>
      <div className={`${prefixCls}-trigger`} onClick={handleOpen}>
        <Input
          readOnly
          value={inputValue}
          allowClear={allowClear}
          disabled={disabled}
          placeholder={placeholder}
          suffix={<Calendar size={14} strokeWidth={1.5} />}
        />
      </div>
      <Drawer
        placement="bottom"
        open={open}
        onClose={handleClose}
        closable={false}
        title={null}
        height="auto"
        footer={
          <Button block type="primary" onClick={handleConfirm}>
            {datepicker.confirm}
          </Button>
        }
      >
        <WheelPicker
          columns={columns}
          value={wheelValue}
          onChange={handleWheelChange}
          className={`${prefixCls}-wheel`}
        />
      </Drawer>
    </>
  );
};

export default DatePickerMobile;
