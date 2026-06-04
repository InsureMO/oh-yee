import { Select } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Grape', value: 'grape' },
];

export default () => {
  const [value, setValue] = useState(['apple', 'banana']);

  return (
    <Select
      mode="multiple"
      value={value}
      onChange={(val) => setValue(val as string[])}
      options={options}
      style={{ width: 300 }}
      placeholder="Please select"
    />
  );
};
