import type { WheelColumn } from '@rainbow-oh/yee-c';
import { WheelPicker } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

const columns: WheelColumn[] = [
  {
    options: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
      { label: 'Option C', value: 'c' },
      { label: 'Option D', value: 'd' },
      { label: 'Option E', value: 'e' },
    ],
  },
];

export default () => {
  const [value, setValue] = useState<number[]>([0]);

  return <WheelPicker columns={columns} value={value} onChange={setValue} />;
};
