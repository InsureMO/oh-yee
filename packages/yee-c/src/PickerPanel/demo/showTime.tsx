import dayjs from 'dayjs';
import { PickerPanel } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(dayjs());

  return (
    <PickerPanel
      showTime
      value={value}
      onChange={(date) => {
        setValue(date || dayjs());
        console.log('Selected datetime:', date?.format('YYYY-MM-DD HH:mm:ss'));
      }}
    />
  );
};
