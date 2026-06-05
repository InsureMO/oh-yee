import { PickerPanel } from '@rainbow-oh/yee-c';
import dayjs from 'dayjs';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(dayjs());
  const minDate = dayjs().subtract(7, 'day');
  const maxDate = dayjs().add(7, 'day');

  return (
    <PickerPanel
      value={value}
      minDate={minDate}
      maxDate={maxDate}
      onChange={(date) => setValue(date || dayjs())}
    />
  );
};
