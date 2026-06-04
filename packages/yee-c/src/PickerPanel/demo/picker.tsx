import dayjs from 'dayjs';
import { PickerPanel, Space } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(dayjs());

  return (
    <Space direction="vertical">
      <h3>Date Picker</h3>
      <PickerPanel
        picker="date"
        value={value}
        onChange={(date) => setValue(date || dayjs())}
      />

      <h3>Month Picker</h3>
      <PickerPanel
        picker="month"
        value={value}
        onChange={(date) => setValue(date || dayjs())}
      />

      <h3>Year Picker</h3>
      <PickerPanel
        picker="year"
        value={value}
        onChange={(date) => setValue(date || dayjs())}
      />
    </Space>
  );
};
