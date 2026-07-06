import { Dayjs } from 'dayjs';
import * as React from 'react';
import type { PickerType, PanelSharedProps } from '../../interface';
import DatePanel from '../DatePanel';
import TimePanel from '../TimePanel';

interface DateTimePanelProps extends Omit<PanelSharedProps, 'onSelect'> {
  onSelect?: (panel: PickerType, date: Dayjs) => void;
  showTime?: boolean;
}

function DateTimePanel(props: DateTimePanelProps) {
  const { onSelect, showTime, ...rest } = props;
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
          onSelect={(date: Dayjs) => handleSelect('datetimetime', date)}
          showHeader
        />
      ) : null}
    </div>
  );
}

export default DateTimePanel;
