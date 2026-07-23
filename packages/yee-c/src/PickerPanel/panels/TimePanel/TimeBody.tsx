import { Dayjs } from 'dayjs';
import * as React from 'react';
import panelConfig from '../../configs';
import type { PanelSharedProps, TimeUnit } from '../../interface';
import pickerUtils from '../../utils/pickerUtils';
import TimeColumn from './TimeColumn';

const timeList = panelConfig.timeList;

function getTimeArray(
  length: number,
  step: number,
  viewDate: Dayjs,
  type: TimeUnit,
): Array<Dayjs> {
  const arr = new Array(length)
    .fill(0)
    .map((i, index) => index)
    .filter((i) => i % step === 0);
  if (type === 'hour') {
    return arr.map((i) => pickerUtils.setHour(viewDate, i));
  } else if (type === 'minute') {
    return arr.map((i) => pickerUtils.setMinute(viewDate, i));
  } else {
    return arr.map((i) => pickerUtils.setSecond(viewDate, i));
  }
}

interface TimeBodyProps extends PanelSharedProps {
  value?: Dayjs;
  showTitle?: boolean;
  showHour?: boolean;
  showMinute?: boolean;
  showSecond?: boolean;
  disabledHours?: boolean;
  disabledMinutes?: boolean;
  disabledSeconds?: boolean;
  is12hour?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
}

function TimeBody(props: TimeBodyProps) {
  const {
    value,
    prefixCls,
    showTitle,
    showHour,
    showMinute,
    showSecond,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    is12hour,
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    onSelect,
    viewDate,
    ...reset
  } = props;

  const columns: React.ReactNode[] = [];

  function addColumnNode(
    type: TimeUnit,
    selectedValue: Dayjs | undefined,
    cells: Array<Dayjs>,
    disabled?: boolean,
  ): React.ReactNode {
    return (
      <TimeColumn
        {...reset}
        key={type}
        type={type}
        value={selectedValue}
        cells={cells}
        disabled={disabled}
        viewDate={viewDate}
        onSelect={onSelect}
      />
    );
  }

  if (showHour) {
    const hours = getTimeArray(is12hour ? 12 : 24, hourStep, viewDate, 'hour');

    columns.push(addColumnNode('hour', value, hours, disabledHours));
  }

  if (showMinute) {
    const minutes = getTimeArray(60, minuteStep, viewDate, 'minute');

    columns.push(addColumnNode('minute', value, minutes, disabledMinutes));
  }
  if (showSecond) {
    const seconds = getTimeArray(60, secondStep, viewDate, 'second');
    columns.push(addColumnNode('second', value, seconds, disabledSeconds));
  }

  return (
    <div className={`${prefixCls}-body`}>
      {showTitle && (
        <ul className={`${prefixCls}-header-title`}>
          {showHour && (
            <li className={`${prefixCls}-header-title-cell`}>{timeList[0]}</li>
          )}
          {showMinute && (
            <li className={`${prefixCls}-header-title-cell`}>{timeList[1]}</li>
          )}
          {showSecond && (
            <li className={`${prefixCls}-header-title-cell`}>{timeList[2]}</li>
          )}
        </ul>
      )}
      <div className={`${prefixCls}-content`}>{columns}</div>
    </div>
  );
}

export default TimeBody;
