import React, { useState } from 'react';
import { WheelPicker } from '@oh/yee-c';
import type { WheelColumn } from '@oh/yee-c';

const currentYear = new Date().getFullYear();

const yearOptions = Array.from({ length: 10 }, (_, i) => {
  const year = currentYear - i;
  return { label: String(year), value: year };
});

const monthOptions = Array.from({ length: 12 }, (_, i) => {
  const month = i + 1;
  return { label: String(month).padStart(2, '0'), value: month };
});

const dayOptions = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  return { label: String(day).padStart(2, '0'), value: day };
});

const columns: WheelColumn[] = [
  { options: yearOptions },
  { options: monthOptions },
  { options: dayOptions },
];

export default () => {
  const [value, setValue] = useState<number[]>([0, 0, 0]);

  return (
    <WheelPicker
      columns={columns}
      value={value}
      onChange={setValue}
    />
  );
};
