import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarDays, X } from 'lucide-react';
import React, { FC, useMemo, useRef, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import RangePanel from '../PickerPanel/panels/RangePanel';
import { inferPicker } from '../PickerPanel/utils/infer-picker';
import pickerUtils from '../PickerPanel/utils/pickerUtils';
import Space from '../Space';
import Trigger from '../Trigger';
import useBreakpoint from '../hooks/useBreakpoint';
import useDeepCompareEffect from '../hooks/useDeepCompareEffect';
import useEvent from '../hooks/useEvent';
import useMergedState from '../hooks/useMergedState';
import { useLocale } from '../locale';
import RangePickerMobile from './range-picker-mobile';

import type { RangePickerProps } from './interface';

import './style/index.less';

const RangePicker: FC<RangePickerProps> = (props) => {
  const mobile = useBreakpoint();
  const { locale } = useLocale();
  const { rangepicker } = locale;

  const {
    prefixCls = 'yee-range-picker',
    className,
    style,
    classNames,
    styles,
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
    placement = 'bottomLeft',
    onChange,
    onStartChange,
    onEndChange,
    onOpenChange,
    onClear,
    endLimitStart = true,
    disabledDate,
    responsive = true,
    ...rest
  } = props;

  // All hooks must be called before any conditional return
  const handleState = useEvent(
    (date: Array<string | number | Dayjs | undefined>) => {
      if (!date || !Array.isArray(date) || date.length === 0) {
        return undefined;
      }

      const [start, end] = date;

      let _start: string | undefined = undefined;
      let _end: string | undefined = undefined;

      if (start !== null && start !== undefined) {
        if (typeof start === 'number') {
          _start = String(start);
        } else if (typeof start === 'string') {
          const d = pickerUtils.init(start, saveFormat);
          if (pickerUtils.isValid(d)) {
            _start = pickerUtils.format(d, saveFormat);
          }
        } else if (dayjs.isDayjs(start)) {
          _start = pickerUtils.format(start, saveFormat);
        }
      }

      if (end !== null && end !== undefined) {
        if (typeof end === 'number') {
          _end = String(end);
        } else if (typeof end === 'string') {
          const d = pickerUtils.init(end, saveFormat);
          if (pickerUtils.isValid(d)) {
            _end = pickerUtils.format(d, saveFormat);
          }
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

  const [pickerValue, setPickerValue] = useState<Array<Dayjs | undefined>>([]);
  const [pickerView, setPickerView] = useState<[Dayjs, Dayjs]>([
    pickerUtils.getNow(),
    pickerUtils.getNow().add(1, 'month'),
  ]);
  const [hoverDate, setHoverDate] = useState<Dayjs | null>(null);

  // Local state for input values
  const [startInputValue, setStartInputValue] = useState('');
  const [endInputValue, setEndInputValue] = useState('');

  const [open, setOpen] = useState(false);
  const [picking, setPicking] = useState<'start' | 'end'>();

  const picker = inferPicker(format);

  // input ref
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  useDeepCompareEffect(() => {
    const [start, end] = mergedValue || [];
    let pickerStart;
    let pickerEnd;
    if (start) {
      const date = pickerUtils.init(start, saveFormat);
      pickerStart = date;
      setStartInputValue(pickerUtils.format(date, format));
    } else {
      setStartInputValue('');
    }

    if (end) {
      const date = pickerUtils.init(end, saveFormat);
      pickerEnd = date;
      setEndInputValue(pickerUtils.format(date, format));
    } else {
      setEndInputValue('');
    }

    setPickerValue([pickerStart, pickerEnd]);
    const startView = pickerUtils.getNow();
    const endView = pickerUtils.getNow().add(1, 'month');

    setPickerView([pickerStart || startView, pickerEnd || endView]);
  }, [mergedValue]);

  // Calculate hover range and selected range for styling
  const rangeRanges = useMemo(() => {
    const [start, end] = pickerValue;
    let hoverRange: Array<Dayjs | null | undefined> = [];
    let selectedRange: Array<Dayjs | null | undefined> = [
      start ?? null,
      end ?? null,
    ];

    // Hover range: show dashed border preview when we have at least one selected date
    if (hoverDate) {
      if (start && !end) {
        // Only start is selected: show range from start to hovered date
        hoverRange = [start, hoverDate];
      } else if (!start && end) {
        // Only end is selected: show range from hovered date to end
        hoverRange = [hoverDate, end];
      } else if (start && end) {
        // Both are selected: show range based on which input is being modified
        if (picking === 'start') {
          // Modifying start: show range from hovered date to end
          hoverRange = [hoverDate, end];
        } else {
          // Modifying end: show range from start to hovered date
          hoverRange = [start, hoverDate];
        }
      }
    }

    // Sort hover range to ensure start <= end
    if (
      hoverRange[0] &&
      hoverRange[1] &&
      hoverRange[0].isAfter(hoverRange[1])
    ) {
      hoverRange = [hoverRange[1], hoverRange[0]];
    }

    return { hoverRange, selectedRange };
  }, [pickerValue, hoverDate, picking]);

  const handleCellMouse = (date: Dayjs | string) => {
    if (!date) {
      setHoverDate(null);
      return;
    }
    const parsedDate = typeof date === 'string' ? pickerUtils.init(date) : date;
    if (pickerUtils.isValid(parsedDate)) {
      setHoverDate(parsedDate);
    }
  };

  const handleChange = (date: Dayjs, panel: string) => {
    const [start, end] = pickerValue;
    let newValue: Array<Dayjs | undefined>;

    if (picking === 'start') {
      // Selecting start date: if it's after end, clear end to keep start <= end
      if (end && pickerUtils.isAfter(date, end)) {
        newValue = [date, undefined];
      } else {
        newValue = [date, end];
      }
    } else {
      // Selecting end date
      newValue = [start, date];
    }

    setPickerValue(newValue as Dayjs[]);

    // Update pickerView when user selects a date
    setPickerView((state) =>
      picking === 'start' ? [date, state[1]] : [state[0], date],
    );

    if (picking === 'start') {
      onStartChange?.(pickerUtils.format(date, saveFormat), date);
      if (panel === picker) {
        setPicking('end');
        endInputRef.current?.focus();
      }
      setStartInputValue(pickerUtils.format(date, format));
    } else {
      onEndChange?.(pickerUtils.format(date, saveFormat), date);
      if (!start) {
        setPicking('start');
        startInputRef.current?.focus();
      }
      setEndInputValue(pickerUtils.format(date, format));
    }
  };

  const handlePanelChange = (date: Dayjs, type?: 'start' | 'end') => {
    if (type === 'start') {
      const end = pickerUtils.addMonth(date, 1);
      setPickerView([date, end]);
    } else if (type === 'end') {
      const start = pickerUtils.addMonth(date, -1);
      setPickerView([start, date]);
    } else {
      setPickerView([date, date]);
    }
  };

  const onConfirm = () => {
    setOpen(false);

    const [start, end] = pickerValue;
    onChange?.(
      [
        start ? pickerUtils.format(start, saveFormat) : '',
        end ? pickerUtils.format(end, saveFormat) : '',
      ],
      [start, end],
    );
  };

  // Handle range shortcuts
  const handleRangeClick = (
    rangeValue: [Dayjs, Dayjs] | (() => [Dayjs, Dayjs]),
  ) => {
    const dates = typeof rangeValue === 'function' ? rangeValue() : rangeValue;
    const [start, end] = dates;

    // Update picker value
    setPickerValue([start, end]);

    // Update input values
    setStartInputValue(pickerUtils.format(start, format));
    setEndInputValue(pickerUtils.format(end, format));

    // Trigger onChange
    onChange?.(
      [
        pickerUtils.format(start, saveFormat),
        pickerUtils.format(end, saveFormat),
      ],
      [start, end],
    );

    setOpen(false);
  };

  const renderPopupWithRanges = () => {
    if (!ranges) {
      return null;
    }
    return (
      <>
        <Space className={`${prefixCls}-panel-ranges`}>
          {Object.entries(ranges).map(([label, rangeValue]) => (
            <Button
              key={label}
              size="small"
              className={`${prefixCls}-range-item`}
              onClick={() => handleRangeClick(rangeValue)}
            >
              {label}
            </Button>
          ))}
        </Space>
        <Button
          type="primary"
          className={`${prefixCls}-panel-now-btn`}
          size="small"
          onClick={onConfirm}
        >
          {rangepicker.confirm}
        </Button>
      </>
    );
  };

  const renderPopup = () => {
    const mode = format.includes('hh') ? 'datetime' : 'date';

    return (
      <div className={`${prefixCls}-panel`}>
        <RangePanel
          prefixCls="yee-picker"
          value={pickerValue}
          pickerView={pickerView}
          panel={picking}
          format={format}
          mode={mode}
          saveFormat={saveFormat}
          onChange={handleChange}
          onPanelChange={handlePanelChange}
          onCellMouse={handleCellMouse}
          hoverRange={rangeRanges.hoverRange}
          selectedRange={rangeRanges.selectedRange}
          disabledDate={disabledDate}
        />
        <div className={`${prefixCls}-panel-footer`}>
          {renderPopupWithRanges()}
          <Button
            type="primary"
            className={`${prefixCls}-panel-now-btn`}
            size="small"
            onClick={onConfirm}
          >
            confirm
          </Button>
        </div>
      </div>
    );
  };

  const handleStartChange = (v: string) => {
    setStartInputValue(v);

    // Try to parse the input value
    const parsedDate = pickerUtils.init(v, format);
    if (pickerUtils.isValid(parsedDate)) {
      const currentEnd = pickerValue[1];

      // Validate: start should not be after end
      if (
        endLimitStart &&
        currentEnd &&
        pickerUtils.isAfter(parsedDate, currentEnd)
      ) {
        setStartInputValue('');
        return;
      }

      handleChange(parsedDate, 'change');
    }
  };

  const handleEndChange = (v: string) => {
    setEndInputValue(v);

    // Try to parse the input value
    const parsedDate = pickerUtils.init(v, format);
    if (pickerUtils.isValid(parsedDate)) {
      const currentStart = pickerValue[0];

      // Validate: end should not be before start
      if (
        endLimitStart &&
        currentStart &&
        pickerUtils.isAfter(currentStart, parsedDate)
      ) {
        return;
      }

      handleChange(parsedDate, 'change');
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setHoverDate(null);
    }
    onOpenChange?.(isOpen);
  };

  // Handle clear
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMergedValue([]);
    setStartInputValue('');
    setEndInputValue('');
    onChange?.([], []);
    onClear?.();
  };

  // Handle disabled state
  const [startDisabled, endDisabled] = Array.isArray(disabled)
    ? disabled
    : [disabled, disabled];

  // Handle placeholder
  const [startPlaceholder, endPlaceholder] = Array.isArray(placeholder)
    ? placeholder
    : [
        placeholder || rangepicker.startPlaceholder,
        placeholder || rangepicker.endPlaceholder,
      ];

  // Check if has value
  const hasValue = useMemo(() => {
    return startInputValue || endInputValue;
  }, [startInputValue, endInputValue]);

  // Build class names
  const triggerClassName = useMemo(() => {
    const classes = [`${prefixCls}-trigger`, `${prefixCls}-trigger-${size}`];
    if (status) {
      classes.push(`${prefixCls}-trigger-${status}`);
    }
    if (disabled === true) {
      classes.push(`${prefixCls}-trigger-disabled`);
    }
    if (open) {
      classes.push(`${prefixCls}-trigger-focused`);
    }
    if (className) {
      classes.push(className);
    }
    return classes.join(' ');
  }, [prefixCls, size, status, disabled, open, className]);

  // Route to mobile renderer — after all hooks
  if (responsive && mobile) {
    return <RangePickerMobile {...props} />;
  }

  return (
    <Trigger
      {...rest}
      popup={renderPopup()}
      placement={placement}
      hideOnClick={false}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div className={triggerClassName} style={style}>
        <Input
          className={clsx(`${prefixCls}-start-input`, classNames?.startinput)}
          style={styles?.startinput}
          value={startInputValue}
          placeholder={startPlaceholder}
          disabled={startDisabled}
          allowClear={false}
          onFocus={() => setPicking('start')}
          onChange={handleStartChange}
          ref={startInputRef}
        />
        <span className={`${prefixCls}-separator`}>{separator || '~'}</span>
        <Input
          className={clsx(`${prefixCls}-end-input`, classNames?.endinput)}
          style={styles?.endinput}
          value={endInputValue}
          placeholder={endPlaceholder}
          disabled={endDisabled}
          allowClear={false}
          onFocus={() => setPicking('end')}
          onChange={handleEndChange}
          ref={endInputRef}
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
    </Trigger>
  );
};

export default RangePicker;
