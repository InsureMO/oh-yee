import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { Calendar } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Config-Provider';
import useBreakpoint from '../hooks/useBreakpoint';
import useEvent from '../hooks/useEvent';
import useMergedState from '../hooks/useMergedState';
import Input from '../Input';
import PickerPanel from '../PickerPanel';
import pickerUtils from '../PickerPanel/utils/pickerUtils';
import Trigger from '../Trigger';
import mergeContextToProps from '../utils/mergeContextToProps';
import DatePickerMobile from './date-picker-mobile';
import useInput from './hooks/use-input';
import type { DatePickerProps, PickerType } from './interface';

import './style/index.less';

const MOBILE_UNSUPPORTED_PICKERS: PickerType[] = ['week', 'quarter', 'decade'];

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (baseprops, ref) => {
    const { datepicker } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, datepicker);
    const mobile = useBreakpoint();
    const {
      prefixCls = 'yee-picker',
      value,
      defaultValue,
      format = 'YYYY-MM-DD',
      saveFormat,
      placement = 'bottomLeft',
      picker = 'date',
      showTime,
      timeFormat,
      allowClear,
      disabled,
      placeholder,
      responsive = true,
      size = 'middle',
      status,
      inputReadOnly,
      className,
      style,
      open: openProp,
      defaultOpen,
      onOpenChange,
      onPanelChange,
      onChange,
      ...rest
    } = props;

    // Same rule as RangePicker's inferPicker: an hour token in the format
    // means datetime picking
    const showTimeOption = typeof showTime === 'object' ? showTime : undefined;
    const isShowTime =
      showTime === undefined ? /[hH]/.test(format) : Boolean(showTime);
    const effectivePicker: PickerType =
      picker === 'date' && isShowTime ? 'datetime' : picker;
    const isDateTime = effectivePicker === 'datetime';
    const effectiveSaveFormat = saveFormat ?? (isShowTime ? format : 'YYYY-MM-DD');
    const effectiveTimeFormat =
      showTimeOption?.timeFormat ??
      timeFormat ??
      (/[hH]/.test(format) ? format.slice(format.search(/[hH]/)) : 'HH:mm:ss');

    // All hooks must be called before any conditional return
    const [open, setOpen] = useMergedState(false, {
      value: openProp,
      defaultValue: defaultOpen,
      onChange: (next: boolean) => onOpenChange?.(next),
    });

    const handleState = useEvent(
      (date: string | number | Dayjs | undefined): string | undefined => {
        if (!date) {
          return undefined;
        }

        let _date = date;

        if (typeof _date === 'number') {
          _date = String(_date);
        }

        if (typeof _date === 'string') {
          const d = pickerUtils.init(_date, effectiveSaveFormat);
          if (pickerUtils.isValid(d)) {
            return _date;
          }
        }

        if (dayjs.isDayjs(_date)) {
          if (pickerUtils.isValid(_date)) {
            return pickerUtils.format(_date, effectiveSaveFormat);
          }
        }
      },
    );

    const [mergedValue, setMergedValue] = useMergedState(undefined, {
      value,
      defaultValue,
      handleState,
      deepCompare: true,
    });

    const [inputValue, setInputValue] = useState('');
    const [hoverValue, setHoverValue] = useState('');
    const [pickerValue, setPickerValue] = useState<Dayjs | undefined>();

    const closePanel = useEvent(() => {
      setOpen(false);
      setHoverValue('');
    });

    // Commit typed input on blur/Enter: valid text becomes the value, empty
    // text clears it, unparseable text reverts to the committed value
    const handleInputSync = useEvent((date: Dayjs | undefined, raw: string) => {
      setHoverValue('');
      if (date) {
        setPickerValue(date);
        setMergedValue(date);
        setInputValue(pickerUtils.format(date, format));
        onChange?.(pickerUtils.format(date, effectiveSaveFormat), date);
        return;
      }
      if (raw === '') {
        if (mergedValue) {
          setMergedValue(undefined);
          setInputValue('');
          onChange?.('', undefined);
        }
        return;
      }
      setInputValue(
        mergedValue
          ? pickerUtils.format(
              pickerUtils.init(mergedValue, effectiveSaveFormat),
              format,
            )
          : '',
      );
    });

    const {
      onBlur: onInputBlur,
      onChange: onInputChange,
      onKeydown: onInputKeydown,
    } = useInput({
      setInputValue,
      setPickerValue,
      format,
      onEscape: closePanel,
      onSync: handleInputSync,
    });

    // Input clear (X) fires onChange('') without blurring; commit immediately
    const handleInputChange = useEvent((value: string) => {
      onInputChange(value);
      if (value === '') {
        handleInputSync(undefined, '');
      }
    });

    const controlled = !!value;

    useEffect(() => {
      if (mergedValue) {
        const date = pickerUtils.init(mergedValue as string, effectiveSaveFormat);
        setPickerValue(date);
        const inputValue =
          picker === 'week'
            ? `${date.year()}-${date.week()}`
            : picker === 'quarter'
              ? `Q${date.quarter()}`
              : pickerUtils.format(date, format);
        setInputValue(inputValue as string);
      } else {
        setPickerValue(undefined);
        setInputValue('');
      }
    }, [mergedValue, effectiveSaveFormat, format, picker, controlled]);

    // showTime.defaultValue applies when a date cell is picked without
    // adjusting the time columns
    const applyDefaultTime = (date: Dayjs): Dayjs => {
      const raw = showTimeOption?.defaultValue;
      if (!raw) {
        return date;
      }
      const time =
        typeof raw === 'string'
          ? pickerUtils.init(raw, effectiveTimeFormat)
          : raw;
      if (!pickerUtils.isValid(time)) {
        return date;
      }
      return pickerUtils.setSecond(
        pickerUtils.setMinute(
          pickerUtils.setHour(date, pickerUtils.getHour(time)),
          pickerUtils.getMinute(time),
        ),
        pickerUtils.getSecond(time),
      );
    };

    const handlePickerChange = (date: Dayjs | undefined, panel: PickerType) => {
      let picked = date;
      if (picked && isDateTime && panel === 'date') {
        picked = applyDefaultTime(picked);
      }
      const saveValue = picked?.format(effectiveSaveFormat) || '';
      const showValue = picked?.format(format) || '';

      setPickerValue(picked);
      setMergedValue(picked);
      setInputValue(showValue);
      onChange?.(saveValue, picked);

      // In datetime mode date/time cells only update the value; the footer
      // confirm (panel === PickerPanel's picker) closes it
      if (panel === 'datetime' || (picker === panel && !isDateTime)) {
        closePanel();
      }
    };

    const handleOpenChange = (next: boolean) => {
      if (disabled) {
        closePanel();
        return;
      }
      if (next) {
        setOpen(next);
      } else {
        closePanel();
      }
    };

    // Close panel when disabled
    useEffect(() => {
      if (disabled && open) {
        closePanel();
      }
    }, [disabled, open]);

    const handleCellMouse = (date: Dayjs) => {
      const showValue = date ? date.format(format) : '';
      setHoverValue(showValue);
    };

    // Route to mobile renderer for supported picker types
    if (responsive && mobile && !MOBILE_UNSUPPORTED_PICKERS.includes(picker)) {
      return (
        <DatePickerMobile
          {...props}
          picker={effectivePicker}
          saveFormat={effectiveSaveFormat}
        />
      );
    }

    return (
      <Trigger
        {...rest}
        placement={placement}
        hideOnClick={false}
        open={open}
        onOpenChange={handleOpenChange}
        popup={
          <PickerPanel
            {...rest}
            picker={effectivePicker}
            showTime={isShowTime}
            timeFormat={effectiveTimeFormat}
            hourStep={showTimeOption?.hourStep}
            minuteStep={showTimeOption?.minuteStep}
            secondStep={showTimeOption?.secondStep}
            value={pickerValue}
            prefixCls={prefixCls}
            onChange={handlePickerChange}
            onPanelChange={onPanelChange}
            onCellMouse={handleCellMouse}
          />
        }
      >
        <div
          data-testid={rest['data-testid']}
          className={clsx(
            `${prefixCls}-trigger`,
            size !== 'middle' && `${prefixCls}-trigger-${size}`,
            status && `${prefixCls}-trigger-${status}`,
            open && `${prefixCls}-trigger-focused`,
            className,
          )}
          style={style}
          ref={ref}
        >
          <Input
            value={hoverValue || inputValue}
            onChange={handleInputChange}
            onBlur={onInputBlur}
            onKeyDown={onInputKeydown}
            allowClear={allowClear}
            disabled={disabled}
            placeholder={placeholder}
            readOnly={inputReadOnly}
            size={size === 'middle' ? 'default' : size}
            suffix={<Calendar size={14} strokeWidth={1.5} />}
          />
        </div>
      </Trigger>
    );
  },
);

export default DatePicker;
