import dayjs from 'dayjs';
import { PickerPanel } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(dayjs());

  return (
    <PickerPanel
      value={value}
      onChange={(date) => {
        setValue(date || dayjs());
        console.log('Selected date:', date?.format('YYYY-MM-DD'));
      }}
    />
  );
};
