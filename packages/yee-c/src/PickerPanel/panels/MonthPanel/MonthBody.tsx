import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import * as React from 'react';
import useEvent from '../../../hooks/useEvent';
import type { PanelSharedProps } from '../../interface';
import pickerUtils from '../../utils/pickerUtils';
import PanelBody from '../PanelBody';

function MonthBody(props: PanelSharedProps) {
  const {
    prefixCls,
    viewDate,
    selectedDate,
    minDate,
    maxDate,
    hoverRange,
    selectedRange,
    nowDate,
    offset,
  } = props;

  const { year = 0, month = 0 } = offset || {};

  const [startHoverDate = null, endHoverDate = null] = hoverRange || [];
  const [startSelectedDate = null, endSelectedDate = null] =
    selectedRange || [];

  const baseDate = pickerUtils.getBaseDate('month', viewDate);

  const getCellDate = useEvent((baseDate: Dayjs, offset: number) => {
    return pickerUtils.addMonth(baseDate, offset);
  });

  const getCellText = useEvent((currentDate: Dayjs) => {
    return pickerUtils.getMonth(currentDate) + 1;
  });

  const getCellTitle = useEvent((currentDate: Dayjs) => {
    let _currentDate = pickerUtils.addYear(currentDate, year);
    _currentDate = pickerUtils.addMonth(_currentDate, month);

    const _year = pickerUtils.getYear(_currentDate);
    const _month = pickerUtils.getMonth(_currentDate) + 1;

    return (
      (_year < 1000 ? '0' + _year : _year) +
      '-' +
      (_month < 10 ? '0' + _month : _month)
    );
  });

  const getCellClassName = useEvent((currentDate: Dayjs) => {
    const isLimitDisabled =
      pickerUtils.isAfter(currentDate, maxDate, 'month') ||
      pickerUtils.isBefore(currentDate, minDate, 'month');

    const cellClsName = pickerUtils.getCellClassName({
      date: currentDate,
      startHoverDate,
      endHoverDate,
      startSelectedDate,
      endSelectedDate,
      unit: 'month',
      prefixCls,
    });

    return clsx(
      {
        [`${prefixCls}-cell-current`]: pickerUtils.isSame(
          currentDate,
          nowDate,
          'month',
        ),
        [`${prefixCls}-cell-selected`]: pickerUtils.isSame(
          currentDate,
          selectedDate,
          'month',
        ),
        [`${prefixCls}-cell-disabled`]: isLimitDisabled,
      },
      cellClsName,
    );
  });

  return (
    <PanelBody
      {...props}
      picker="month"
      rowCount={4}
      colCount={3}
      baseDate={baseDate}
      getCellDate={getCellDate}
      getCellText={getCellText}
      getCellTitle={getCellTitle}
      getCellClassName={getCellClassName}
    />
  );
}

export default MonthBody;
