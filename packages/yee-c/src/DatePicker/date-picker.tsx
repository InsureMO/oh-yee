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
      saveFormat = 'YYYY-MM-DD',
      placement = 'bottomLeft',
      picker = 'date',
      allowClear,
      disabled,
      placeholder,
      responsive = true,
      onChange,
      ...rest
    } = props;

    // All hooks must be called before any conditional return
    const [open, setOpen] = useState(false);

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
          const d = pickerUtils.init(_date, saveFormat);
          if (pickerUtils.isValid(d)) {
            return _date;
          }
        }

        if (dayjs.isDayjs(_date)) {
          if (pickerUtils.isValid(_date)) {
            return pickerUtils.format(_date, saveFormat);
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

    const {
      onBlur: onInputBlur,
      onChange: onInputChange,
      onKeydown: onInputKeydown,
    } = useInput({
      setInputValue,
      setPickerValue,
      format,
      onEscape: () => setOpen(false),
    });

    const controlled = !!value;

    useEffect(() => {
      if (mergedValue) {
        const date = pickerUtils.init(mergedValue as string, saveFormat);
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
    }, [mergedValue, saveFormat, format, picker, controlled]);

    const handlePickerChange = (date: Dayjs | undefined, panel: PickerType) => {
      const saveValue = date?.format(saveFormat) || '';
      const showValue = date?.format(format) || '';

      setPickerValue(date);
      setMergedValue(date);
      setInputValue(showValue);
      onChange?.(saveValue, date);

      if (picker === panel) {
        setOpen(false);
      }
    };

    const handlePanelChange = () => {};

    const handleOpenChange = (open: boolean) => {
      if (disabled) {
        setOpen(false);
        return;
      }
      setOpen(open);
    };

    // Close panel when disabled
    useEffect(() => {
      if (disabled && open) {
        setOpen(false);
      }
    }, [disabled, open]);

    const handleCellMouse = (date: Dayjs) => {
      const showValue = date ? date.format(format) : '';
      setHoverValue(showValue);
    };

    // Route to mobile renderer for supported picker types
    if (responsive && mobile && !MOBILE_UNSUPPORTED_PICKERS.includes(picker)) {
      return <DatePickerMobile {...props} />;
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
            picker={picker}
            // format={format}
            value={pickerValue}
            prefixCls={prefixCls}
            onChange={handlePickerChange}
            onPanelChange={handlePanelChange}
            onCellMouse={handleCellMouse}
          />
        }
      >
        <div
          data-testid={rest['data-testid']}
          className={`${prefixCls}-trigger`}
          ref={ref}
        >
          <Input
            value={hoverValue || inputValue}
            onChange={onInputChange}
            onBlur={onInputBlur}
            onKeyDown={onInputKeydown}
            allowClear={allowClear}
            disabled={disabled}
            placeholder={placeholder}
            suffix={<Calendar size={14} strokeWidth={1.5} />}
          />
        </div>
      </Trigger>
    );
  },
);

export default DatePicker;
