import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import * as React from 'react';
import PanelBody from '../PanelBody';

import useEvent from '../../../hooks/useEvent';
import type { PanelSharedProps } from '../../interface';
import pickerUtils from '../../utils/pickerUtils';

function YearBody(props: PanelSharedProps) {
  const {
    prefixCls,
    viewDate,
    selectedDate,
    maxDate,
    minDate,
    nowDate,
    offsetYear = 0,
    hoverRange = [],
    selectedRange = [],
  } = props;

  const [startHoverDate = null, endHoverDate = null] = hoverRange;
  const [startSelectedDate = null, endSelectedDate = null] = selectedRange;

  const baseDate = pickerUtils.getBaseDate('year', viewDate);

  const getCellDate = useEvent((baseDate: Dayjs, offset: number) => {
    return pickerUtils.addYear(baseDate, offset);
  });

  const getCellText = useEvent((currentDate: Dayjs) => {
    return pickerUtils.getYear(currentDate) + offsetYear;
  });

  const getCellTitle = useEvent((currentDate: Dayjs) => {
    const _year = pickerUtils.getYear(currentDate) + offsetYear;
    return _year < 1000 ? '0' + _year : String(_year);
  });

  const getCellClassName = useEvent((currentDate: Dayjs) => {
    const currentYear = pickerUtils.getYear(currentDate);
    const baseYear = pickerUtils.getYear(baseDate as Dayjs);
    const isLimitDisabled =
      pickerUtils.isAfter(currentDate, maxDate, 'year') ||
      pickerUtils.isBefore(currentDate, minDate, 'year');

    const cellClsName = pickerUtils.getCellClassName({
      date: currentDate,
      startHoverDate,
      endHoverDate,
      startSelectedDate,
      endSelectedDate,
      unit: 'year',
      prefixCls,
    });

    return clsx(
      {
        [`${prefixCls}-cell-current`]: pickerUtils.isSame(
          currentDate,
          nowDate,
          'year',
        ),
        [`${prefixCls}-cell-selected`]: pickerUtils.isSame(
          currentDate,
          selectedDate,
          'year',
        ),
        [`${prefixCls}-cell-not-in-view`]:
          currentYear === baseYear || baseYear + 11 === currentYear,
        [`${prefixCls}-cell-disabled`]: isLimitDisabled,
      },
      cellClsName,
    );
  });

  return (
    <PanelBody
      {...props}
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

export default YearBody;
