import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import React from 'react';
import useEvent from '../../../hooks/useEvent';
import panelConfig from '../../configs';
import pickerUtils from '../../utils/pickerUtils';
import PanelBody from '../PanelBody';

const DATEPANEL_WEEK_DAY_COUNT = 7;

const weekTitle = panelConfig.shortWeekList;

function DateBody(props: any) {
  const {
    prefixCls,
    viewDate,
    selectedDate,
    hoverRange = [],
    selectedRange = [],
    maxDate,
    minDate,
    picker = 'date',
    prefixColumn,
    nowDate,
    weekStart = 0,
  } = props;

  const [startHoverDate = null, endHoverDate = null] = hoverRange;
  const [startSelectedDate = null, endSelectedDate = null] = selectedRange;

  const baseDate = pickerUtils.getBaseDate('day', viewDate, weekStart);

  const headerCells: Array<React.ReactNode> = [];

  if (prefixColumn) {
    headerCells.push(<th key="empty"></th>);
  }

  for (let i = 0; i < DATEPANEL_WEEK_DAY_COUNT; i++) {
    headerCells.push(<th key={i}>{weekTitle[i + weekStart]}</th>);
  }

  const getCellDate = useEvent((baseDate: Dayjs, offset: number) => {
    return pickerUtils.addDate(baseDate, offset);
  });

  const getCellText = useEvent((currentDate: Dayjs) => {
    return pickerUtils.getDate(currentDate);
  });

  const getCellTitle = useEvent((currentDate: Dayjs) => {
    // const _currentDate = pickerUtils.getOffsetDate(currentDate, offset, 1);
    const _currentDate = currentDate;
    const _year = pickerUtils.getYear(_currentDate);
    const _month = pickerUtils.getMonth(_currentDate) + 1;
    const _day = pickerUtils.getDate(_currentDate);
    return `${_year < 1000 ? '0' + _year : _year}-${
      _month < 10 ? '0' + _month : _month
    }-${_day < 10 ? '0' + _day : _day}`;
  });

  const getCellClassName = useEvent((currentDate: Dayjs) => {
    const currentMonth = pickerUtils.getMonth(currentDate);
    const viewMonth = pickerUtils.getMonth(viewDate);

    const isLimitDisabled =
      pickerUtils.isAfter(currentDate, maxDate, 'day') ||
      pickerUtils.isBefore(currentDate, minDate, 'day');

    const cellClsName = pickerUtils.getCellClassName({
      date: currentDate,
      startHoverDate,
      endHoverDate,
      startSelectedDate,
      endSelectedDate,
      unit: 'day',
      prefixCls,
    });

    return clsx(
      {
        [`${prefixCls}-cell-current`]: pickerUtils.isSame(
          currentDate,
          nowDate,
          'day',
        ),
        [`${prefixCls}-cell-not-in-view`]: currentMonth !== viewMonth,
        [`${prefixCls}-cell-disabled`]: isLimitDisabled,
        [`${prefixCls}-cell-weekend`]: [0, 6].includes(currentDate.day()),
        [`${prefixCls}-cell-selected`]:
          pickerUtils.isSame(currentDate, selectedDate, 'day') &&
          picker !== 'week',
      },
      cellClsName,
    );
  });

  return (
    <PanelBody
      {...props}
      prefixColumn={prefixColumn}
      picker={picker}
      rowCount={6}
      colCount={DATEPANEL_WEEK_DAY_COUNT}
      headerCells={headerCells}
      baseDate={baseDate}
      getCellDate={getCellDate}
      getCellText={getCellText}
      getCellTitle={getCellTitle}
      getCellClassName={getCellClassName}
    />
  );
}

export default DateBody;
