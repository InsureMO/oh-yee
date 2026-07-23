import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarDays, X } from 'lucide-react';
import React, { FC, useCallback, useMemo, useState } from 'react';
import Button from '../Button';
import useWheelDateColumns from '../DatePicker/hooks/use-wheel-columns';
import Drawer from '../Drawer';
import useDeepCompareEffect from '../hooks/useDeepCompareEffect';
import useEvent from '../hooks/useEvent';
import useMergedState from '../hooks/useMergedState';
import Input from '../Input';
import { useLocale } from '../locale';
import { inferPicker } from '../PickerPanel/utils/infer-picker';
import pickerUtils from '../PickerPanel/utils/pickerUtils';
import Space from '../Space';
import WheelPicker from '../WheelPicker';
import type { RangePickerProps } from './interface';

import './style/index.less';

const RangePickerMobile: FC<RangePickerProps> = (props) => {
  const { locale } = useLocale();
  const { rangepicker } = locale;

  const {
    prefixCls = 'yee-range-picker',
    className,
    style,
    separator,
    value,
    defaultValue,
    format = 'YYYY/MM/DD',
    saveFormat = 'YYYY/MM/DD',
    placeholder,
    disabled,
    allowClear = true,
    size = 'middle',
    status,
    ranges,
    onChange,
    onStartChange,
    onEndChange, // eslint-disable-line @typescript-eslint/no-unused-vars
    onOpenChange,
    onClear,
    endLimitStart = true,
    disabledDate, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = props;

  const picker = inferPicker(format);

  const handleState = useEvent(
    (date: Array<string | number | Dayjs | undefined>) => {
      if (!date || !Array.isArray(date) || date.length === 0) return undefined;
      const [start, end] = date;
      let _start: string | undefined;
      let _end: string | undefined;

      if (start !== null && start !== undefined) {
        if (typeof start === 'number') _start = String(start);
        else if (typeof start === 'string') {
          const d = pickerUtils.init(start, saveFormat);
          if (pickerUtils.isValid(d))
            _start = pickerUtils.format(d, saveFormat);
        } else if (dayjs.isDayjs(start)) {
          _start = pickerUtils.format(start, saveFormat);
        }
      }
      if (end !== null && end !== undefined) {
        if (typeof end === 'number') _end = String(end);
        else if (typeof end === 'string') {
          const d = pickerUtils.init(end, saveFormat);
          if (pickerUtils.isValid(d)) _end = pickerUtils.format(d, saveFormat);
        } else if (dayjs.isDayjs(end)) {
          _end = pickerUtils.format(end, saveFormat);
        }
      }
      return [_start, _end];
    },
  ) as any;

  const [mergedValue, setMergedValue] = useMergedState<
    Array<string | number | Dayjs | undefined>,
    Array<string | undefined> | undefined
  >([], {
    value,
    defaultValue,
    handleState,
    deepCompare: true,
  });

  const [startInputValue, setStartInputValue] = useState('');
  const [endInputValue, setEndInputValue] = useState('');
  const [pickerValue, setPickerValue] = useState<Array<Dayjs | undefined>>([]);

  useDeepCompareEffect(() => {
    const [start, end] = mergedValue || [];
    if (start) {
      const date = pickerUtils.init(start, saveFormat);
      setStartInputValue(pickerUtils.format(date, format));
      setPickerValue((prev) => [date, prev[1]]);
    } else {
      setStartInputValue('');
    }
    if (end) {
      const date = pickerUtils.init(end, saveFormat);
      setEndInputValue(pickerUtils.format(date, format));
      setPickerValue((prev) => [prev[0], date]);
    } else {
      setEndInputValue('');
    }
  }, [mergedValue]);

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'start' | 'end'>('start');

  // Wheel columns for start and end dates
  const startColumns = useWheelDateColumns({
    picker,
    pickerValue: pickerValue[0],
  });

  const endColumns = useWheelDateColumns({
    picker,
    pickerValue: pickerValue[1],
  });

  const currentColumns = activeTab === 'start' ? startColumns : endColumns;

  const handleConfirm = useCallback(() => {
    const startDate = startColumns.getSelectedDate();
    const endDate = endColumns.getSelectedDate();

    // Validate end >= start if endLimitStart
    if (endLimitStart && pickerUtils.isAfter(startDate, endDate, 'day')) {
      return;
    }

    const startFormatted = pickerUtils.format(startDate, saveFormat);
    const endFormatted = pickerUtils.format(endDate, saveFormat);

    setPickerValue([startDate, endDate]);
    setStartInputValue(pickerUtils.format(startDate, format));
    setEndInputValue(pickerUtils.format(endDate, format));
    setMergedValue([startFormatted, endFormatted]);

    onChange?.([startFormatted, endFormatted], [startDate, endDate]);
    setOpen(false);
  }, [
    startColumns,
    endColumns,
    endLimitStart,
    saveFormat,
    format,
    onChange,
    setMergedValue,
  ]);

  const handleRangeClick = useCallback(
    (rangeValue: [Dayjs, Dayjs] | (() => [Dayjs, Dayjs])) => {
      const dates =
        typeof rangeValue === 'function' ? rangeValue() : rangeValue;
      const [start, end] = dates;
      setPickerValue([start, end]);
      setStartInputValue(pickerUtils.format(start, format));
      setEndInputValue(pickerUtils.format(end, format));
      onChange?.(
        [
          pickerUtils.format(start, saveFormat),
          pickerUtils.format(end, saveFormat),
        ],
        [start, end],
      );
      setOpen(false);
    },
    [format, saveFormat, onChange],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setMergedValue([]);
      setStartInputValue('');
      setEndInputValue('');
      setPickerValue([]);
      onChange?.([], []);
      onClear?.();
    },
    [onChange, onClear, setMergedValue],
  );

  const handleOpen = useCallback(() => {
    if (disabled) return;
    setOpen(true);
    setActiveTab('start');
    onOpenChange?.(true);
  }, [disabled, onOpenChange]);

  const handleClose = useCallback(() => {
    setOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const [startDisabled, endDisabled] = Array.isArray(disabled)
    ? disabled
    : [disabled, disabled];
  const [startPlaceholder, endPlaceholder] = Array.isArray(placeholder)
    ? placeholder
    : [
        placeholder || rangepicker.startPlaceholder,
        placeholder || rangepicker.endPlaceholder,
      ];

  const hasValue = useMemo(
    () => !!startInputValue || !!endInputValue,
    [startInputValue, endInputValue],
  );

  const triggerClassName = useMemo(() => {
    const classes = [`${prefixCls}-trigger`, `${prefixCls}-trigger-${size}`];
    if (status) classes.push(`${prefixCls}-trigger-${status}`);
    if (disabled === true) classes.push(`${prefixCls}-trigger-disabled`);
    if (open) classes.push(`${prefixCls}-trigger-focused`);
    if (className) classes.push(className);
    return classes.join(' ');
  }, [prefixCls, size, status, disabled, open, className]);

  // Auto-switch tab after selecting start
  const handleWheelChangeAndAdvance = useCallback(
    (value: number[]) => {
      currentColumns.handleWheelChange(value);
    },
    [currentColumns],
  );

  const handleTabConfirm = useCallback(() => {
    if (activeTab === 'start') {
      const startDate = startColumns.getSelectedDate();
      setPickerValue((prev) => [startDate, prev[1]]);
      setStartInputValue(pickerUtils.format(startDate, format));
      onStartChange?.(pickerUtils.format(startDate, saveFormat), startDate);
      setActiveTab('end');
    } else {
      handleConfirm();
    }
  }, [
    activeTab,
    startColumns,
    format,
    saveFormat,
    onStartChange,
    handleConfirm,
  ]);

  return (
    <>
      <div className={triggerClassName} style={style} onClick={handleOpen}>
        <Input
          readOnly
          className={clsx(`${prefixCls}-start-input`)}
          value={startInputValue}
          placeholder={startPlaceholder}
          disabled={startDisabled}
          allowClear={false}
          suffix={null}
        />
        <span className={`${prefixCls}-separator`}>{separator || '~'}</span>
        <Input
          readOnly
          className={clsx(`${prefixCls}-end-input`)}
          value={endInputValue}
          placeholder={endPlaceholder}
          disabled={endDisabled}
          allowClear={false}
          suffix={null}
        />
        <span className={`${prefixCls}-suffix`}>
          {allowClear && hasValue && !disabled ? (
            <span className={clsx(`${prefixCls}-clear`)} onClick={handleClear}>
              <X size={12} strokeWidth={1} />
            </span>
          ) : null}
          <CalendarDays size={14} />
        </span>
      </div>

      <Drawer
        placement="bottom"
        open={open}
        onClose={handleClose}
        closable={false}
        title={null}
        height={360}
        footer={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ranges && (
              <Space>
                {Object.entries(ranges).map(([label, rangeValue]) => (
                  <Button
                    key={label}
                    size="small"
                    onClick={() => handleRangeClick(rangeValue)}
                  >
                    {label}
                  </Button>
                ))}
              </Space>
            )}
            <Button block type="primary" onClick={handleTabConfirm}>
              {activeTab === 'start' ? rangepicker.next : rangepicker.confirm}
            </Button>
          </div>
        }
      >
        {/* Tab switcher for start/end */}
        <div className={`${prefixCls}-mobile-tabs`}>
          <button
            className={clsx(
              `${prefixCls}-mobile-tab`,
              activeTab === 'start' && `${prefixCls}-mobile-tab-active`,
            )}
            onClick={() => setActiveTab('start')}
            type="button"
          >
            {rangepicker.startPlaceholder}
          </button>
          <button
            className={clsx(
              `${prefixCls}-mobile-tab`,
              activeTab === 'end' && `${prefixCls}-mobile-tab-active`,
            )}
            onClick={() => setActiveTab('end')}
            type="button"
          >
            {rangepicker.endPlaceholder}
          </button>
        </div>

        {currentColumns.hasColumns && (
          <WheelPicker
            columns={currentColumns.columns}
            value={currentColumns.wheelValue}
            onChange={handleWheelChangeAndAdvance}
            className={`${prefixCls}-wheel`}
          />
        )}
      </Drawer>
    </>
  );
};

export default RangePickerMobile;
