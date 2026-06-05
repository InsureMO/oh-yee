import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import Space from '../Space';
import useEvent from '../hooks/useEvent';
import useMergedState from '../hooks/useMergedState';
import { usePanelConfigs } from './configs/locale-adapter';
import DatePanel from './panels/DatePanel';
import DateTimePanel from './panels/DateTimePanel';
import DecadePanel from './panels/DecadePanel';
import MonthPanel from './panels/MonthPanel';
import QuarterPanel from './panels/QuarterPanel';
import TimePanel from './panels/TimePanel';
import WeekPanel from './panels/WeekPanel';
import YearPanel from './panels/YearPanel';
import d from './utils/pickerUtils';

import { PickerPanelProps, PickerType } from './interface';

import './style/index.less';

const PickerPanel = React.forwardRef<HTMLDivElement, PickerPanelProps>(
  (props, ref) => {
    const panelConfigs = usePanelConfigs();

    const {
      value,
      pickerView,
      defaultPickerView,
      prefixCls = 'yee-date',
      unit,
      picker = 'date', // Fixed value
      offset,
      footer = true,
      showNow = true,
      maxDate,
      minDate,
      className,
      style,
      classNames,
      styles,
      onChange,
      onCellMouse,
      onPanelChange,
      // showTime,
    } = props;

    const [mergedPickerView, setMergedPickerView] = useMergedState(d.init(), {
      value: pickerView,
      defaultValue: defaultPickerView,
    });

    useEffect(() => {
      if (value && !pickerView) {
        setMergedPickerView(value);
      }
    }, [value, pickerView]);

    const [panelView, setPanelView] = useState(picker);
    const prevPanelView = useRef('');

    const handleSelect = useEvent((panel: PickerType, date: Dayjs) => {
      switch (panel) {
        case 'decade':
          setPanelView('year');
          break;
        case 'year':
          setPanelView(prevPanelView.current === 'date' ? 'date' : 'month');
          break;
        case 'month':
          setPanelView(picker ?? 'date');
          break;
      }
      onChange?.(date, panel);
    });

    // Panel view switch
    const handlePanelChange = (newView: 'year' | 'month' | 'date') => {
      prevPanelView.current = panelView;
      setPanelView(newView);
    };

    // Handle view date change
    const handleViewDateChange = (newViewDate: Dayjs) => {
      setMergedPickerView(newViewDate);
      onPanelChange?.(newViewDate);
    };

    const handleMouseChange = (date: Dayjs) => {
      onCellMouse?.(date);
    };

    const handleNowClick = () => {
      const now = d.getNow();
      if (
        (maxDate && d.isAfter(now, maxDate, unit)) ||
        (minDate && d.isBefore(now, minDate, unit))
      )
        return;
      onChange?.(now, picker);
    };

    const handleConfirmClick = () => {
      onChange?.(undefined, picker);
    };

    const renderPanel = () => {
      let panelNode: React.ReactNode;
      const panelProps = {
        ...props,
        selectedDate: value,
        prefixCls,
        offset,
        panelConfigs,
        viewDate: mergedPickerView,
        handleMouseChange,
        onViewDateChange: handleViewDateChange,
        onPanelChange: handlePanelChange,
      };

      switch (panelView) {
        case 'decade':
          panelNode = (
            <DecadePanel
              {...panelProps}
              onSelect={(date: Dayjs) => handleSelect('decade', date)}
            />
          );
          break;
        case 'year':
          panelNode = (
            <YearPanel
              {...panelProps}
              onSelect={(date: Dayjs) => handleSelect('year', date)}
            />
          );
          break;
        case 'quarter':
          panelNode = (
            <QuarterPanel
              {...panelProps}
              onSelect={(date: Dayjs) => handleSelect('quarter', date)}
            />
          );
          break;
        case 'month':
          panelNode = (
            <MonthPanel
              {...panelProps}
              onSelect={(date: Dayjs) => handleSelect('month', date)}
            />
          );
          break;
        case 'week':
          panelNode = (
            <WeekPanel
              {...panelProps}
              onSelect={(date: Dayjs) => handleSelect('week', date)}
            />
          );
          break;
        case 'date':
          panelNode = (
            <DatePanel
              {...panelProps}
              onSelect={(date: Dayjs) => handleSelect('date', date)}
            />
          );
          break;
        case 'datetime':
          panelNode = <DateTimePanel {...panelProps} onSelect={handleSelect} />;
          break;
        case 'time':
          panelNode = (
            <TimePanel
              {...panelProps}
              onSelect={(date: Dayjs) => handleSelect('time', date)}
            />
          );
          break;
        default:
          panelNode = (
            <DatePanel
              {...panelProps}
              onSelect={(date: Dayjs) => handleSelect('date', date)}
            />
          );
      }

      return panelNode;
    };

    const renderFooter = () => {
      if (footer === false) {
        return null;
      }

      return (
        <div
          className={clsx(`${prefixCls}-footer`, classNames?.footer)}
          style={styles?.footer}
        >
          {typeof footer === 'boolean' ? (
            <Space block className={`${prefixCls}-footer-btns`}>
              {showNow ? (
                <Button size="small" onClick={handleNowClick}>
                  {panelConfigs.now}
                </Button>
              ) : (
                <></>
              )}
              <Button size="small" type="primary" onClick={handleConfirmClick}>
                {panelConfigs.confirm}
              </Button>
            </Space>
          ) : (
            footer
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={clsx(`${prefixCls}-panel`, className)}
        style={style}
      >
        {renderPanel()}
        {renderFooter()}
      </div>
    );
  },
);

PickerPanel.displayName = 'PickerPanel';

export default PickerPanel;
