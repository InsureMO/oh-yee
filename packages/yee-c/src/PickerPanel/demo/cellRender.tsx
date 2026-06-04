import dayjs, { Dayjs } from 'dayjs';
import { PickerPanel } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(dayjs());

  const cellRender = (date: Dayjs) => {
    if (date.date() === 15) {
      return (
        <div style={{ textAlign: 'center' }}>
          <div>{date.date()}</div>
          <div style={{ fontSize: '12px', color: 'red' }}>Mid</div>
        </div>
      );
    }
    return date.date();
  };

  return (
    <PickerPanel
      value={value}
      cellRender={cellRender}
      onChange={(date) => setValue(date || dayjs())}
    />
  );
};
