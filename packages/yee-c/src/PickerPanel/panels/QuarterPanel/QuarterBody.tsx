import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import React from 'react';
import PanelBody from '../PanelBody';

import useEvent from '../../../hooks/useEvent';
import type { PanelSharedProps } from '../../interface';
import pickerUtils from '../../utils/pickerUtils';

const quarter = ['Q1', 'Q2', 'Q3', 'Q4'];

function QuarterBody(props: PanelSharedProps) {
  const { prefixCls, viewDate, nowDate } = props;

  const baseDate = pickerUtils.setMonth(viewDate, 0);

  const getQuarter = (currentDate: Dayjs) => {
    const index = pickerUtils.getQuarter(currentDate);
    return quarter[index - 1];
  };

  const getCellDate = useEvent((baseDate: Dayjs, offset: number) => {
    return pickerUtils.addMonth(baseDate, offset * 3);
  });

  const getCellText = useEvent((currentDate: Dayjs) => {
    return getQuarter(currentDate);
  });

  const getCellTitle = useEvent((currentDate: Dayjs) => {
    const year = pickerUtils.getYear(currentDate);
    const q = getQuarter(currentDate);
    return `${year}-${q}`;
  });

  const getCellClassName = useEvent((currentDate: Dayjs) => {
    return clsx({
      [`${prefixCls}-cell-current`]: pickerUtils.isSame(
        currentDate,
        nowDate,
        'quarter',
      ),
      [`${prefixCls}-cell-selected`]: pickerUtils.isSame(
        currentDate,
        viewDate,
        'quarter',
      ),
    });
  });

  return (
    <PanelBody
      {...props}
      rowCount={1}
      colCount={4}
      baseDate={baseDate}
      getCellDate={getCellDate}
      getCellText={getCellText}
      getCellTitle={getCellTitle}
      getCellClassName={getCellClassName}
    />
  );
}

export default QuarterBody;
