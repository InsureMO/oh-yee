import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import * as React from 'react';
import useEvent from '../../../hooks/useEvent';
import { useLocale } from '../../../locale';
import type { PanelSharedProps } from '../../interface';
import pickerUtils from '../../utils/pickerUtils';
import PanelBody from '../PanelBody';

function WeekBody(props: PanelSharedProps) {
  const { locale } = useLocale();
  const { weekpicker } = locale;

  const headerCells = weekpicker.weekHeader.map((week, index) => (
    <th key={index}>{week}</th>
  ));

  const { prefixCls, viewDate } = props;

  const baseDate = pickerUtils.getBaseDate('day', viewDate);

  const getCellDate = useEvent((baseDate: Dayjs, offset: number) => {
    if (offset % 8 === 0) {
      return pickerUtils.addDate(baseDate, 0);
    }
    return pickerUtils.addDate(baseDate, offset);
  });

  const getCellText = useEvent((currentDate: Dayjs) => {
    // if ()
    return pickerUtils.getDate(currentDate);
  });

  const getCellClassName = useEvent((currentDate: Dayjs) => {
    const currentMonth = pickerUtils.getMonth(currentDate);
    const viewMonth = pickerUtils.getMonth(viewDate);
    return clsx({
      [`${prefixCls}-cell-not-in-view`]: currentMonth !== viewMonth,
      [`${prefixCls}-cell-weekend`]: [0, 6].includes(currentDate.day()),
    });
  });

  return (
    <PanelBody
      {...props}
      rowCount={6}
      colCount={8}
      headerCells={headerCells}
      baseDate={baseDate}
      getCellDate={getCellDate}
      getCellText={getCellText}
      getCellClassName={getCellClassName}
    />
  );
}

export default WeekBody;
