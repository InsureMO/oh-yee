import { Dayjs } from 'dayjs';
import * as React from 'react';
import type { PanelSharedProps, PickerType } from '../../interface';
import DatePanel from '../DatePanel';
import TimePanel from '../TimePanel';

interface DateTimePanelProps extends Omit<PanelSharedProps, 'onSelect'> {
  onSelect?: (panel: PickerType, date: Dayjs) => void;
  showTime?: boolean;
  timeFormat?: string;
}

function DateTimePanel(props: DateTimePanelProps) {
  const { onSelect, showTime, timeFormat, ...rest } = props;
  const prefixCls = rest.prefixCls ?? 'yee-picker';

  const handleSelect = (type: string, date: Dayjs) => {
    onSelect?.(type as PickerType, date);
  };

  return (
    <div className={`${prefixCls}-datetime-panel`}>
      <DatePanel
        {...rest}
        onSelect={(date: Dayjs) => handleSelect('date', date)}
      />
      {showTime ? (
        <TimePanel
          {...rest}
          format={timeFormat}
          onSelect={(date: Dayjs) => handleSelect('datetimetime', date)}
          showHeader
        />
      ) : null}
    </div>
  );
}

export default DateTimePanel;
