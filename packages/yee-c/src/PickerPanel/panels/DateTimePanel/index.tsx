import { Dayjs } from 'dayjs';
import * as React from 'react';
import DatePanel from '../DatePanel';
import TimePanel from '../TimePanel';

function DateTimePanel(props: any) {
  const { prefixCls = 'yee-picker', onSelect, showTime } = props;

  const handleSelect = (type: string, date: Dayjs) => {
    onSelect(type, date);
  };

  return (
    <div className={`${prefixCls}-datetime-panel`}>
      <DatePanel
        {...props}
        onSelect={(date: Dayjs) => handleSelect('date', date)}
      />
      {showTime ? (
        <TimePanel
          {...props}
          onSelect={(date: Dayjs) => handleSelect('datetimetime', date)}
          showHeader
        />
      ) : null}
    </div>
  );
}

export default DateTimePanel;
