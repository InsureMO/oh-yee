import { Dayjs } from 'dayjs';
import * as React from 'react';
import panelConfig from '../../configs';
import type { DisabledTimeConfig, PanelSharedProps, TimeUnit } from '../../interface';
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
  is12hour?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  disabledTime?: (current: Dayjs) => DisabledTimeConfig;
}

function TimeBody(props: TimeBodyProps) {
  const {
    value,
    prefixCls,
    showTitle,
    showHour,
    showMinute,
    showSecond,
    is12hour,
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    disabledTime,
    onSelect,
    viewDate,
    ...reset
  } = props;

  const columns: React.ReactNode[] = [];

  // Cascading context: minute disabling sees the selected hour, second
  // disabling sees the selected hour and minute (viewDate when nothing
  // is selected yet)
  const disabledConfig = disabledTime?.(value ?? viewDate);
  const selectedHour = pickerUtils.getHour(value ?? viewDate);
  const selectedMinute = pickerUtils.getMinute(value ?? viewDate);
  const disabledHourValues = disabledConfig?.disabledHours?.() ?? [];
  const disabledMinuteValues =
    disabledConfig?.disabledMinutes?.(selectedHour) ?? [];
  const disabledSecondValues =
    disabledConfig?.disabledSeconds?.(selectedHour, selectedMinute) ?? [];

  function addColumnNode(
    type: TimeUnit,
    selectedValue: Dayjs | undefined,
    cells: Array<Dayjs>,
    disabledValues?: number[],
  ): React.ReactNode {
    return (
      <TimeColumn
        {...reset}
        prefixCls={prefixCls}
        key={type}
        type={type}
        value={selectedValue}
        cells={cells}
        disabledValues={disabledValues}
        viewDate={viewDate}
        onSelect={onSelect}
      />
    );
  }

  if (showHour) {
    const hours = getTimeArray(is12hour ? 12 : 24, hourStep, viewDate, 'hour');

    columns.push(addColumnNode('hour', value, hours, disabledHourValues));
  }

  if (showMinute) {
    const minutes = getTimeArray(60, minuteStep, viewDate, 'minute');

    columns.push(addColumnNode('minute', value, minutes, disabledMinuteValues));
  }
  if (showSecond) {
    const seconds = getTimeArray(60, secondStep, viewDate, 'second');
    columns.push(addColumnNode('second', value, seconds, disabledSecondValues));
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
