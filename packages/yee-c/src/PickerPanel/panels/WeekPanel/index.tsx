import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import React from 'react';
import pickerUtils from '../../utils/pickerUtils';
import DateBody from '../DatePanel/DateBody';
import DateHeader from '../DatePanel/DateHeader';

export default function WeekPanel(props: any) {
  const { prefixCls, selectedDate } = props;

  const prefixColumn = (currentDate: Dayjs) => {
    const className = clsx([`${prefixCls}-cell ${prefixCls}-week-count`], {});

    return (
      <td key="week" className={className}>
        {pickerUtils.getWeek(currentDate)}
      </td>
    );
  };

  const getRowClassName = (currentDate: Dayjs) => {
    return clsx([`${prefixCls}-week-panel-row`], {
      [`${prefixCls}-week-panel-row-selected`]: pickerUtils.isSame(
        currentDate,
        selectedDate,
        'week',
      ),
    });
  };

  return (
    <div className={`${prefixCls}-week-panel`}>
      <DateHeader {...props} />
      <DateBody
        {...props}
        picker="week"
        prefixColumn={prefixColumn}
        getRowClassName={getRowClassName}
      />
    </div>
  );
}
