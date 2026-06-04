import { Select } from '@oh/yee-c';
import React, { useState } from 'react';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
];

export default () => {
  const [value, setValue] = useState('apple');

  return (
    <Select
      allowClear
      value={value}
      onChange={(val) => setValue(val as string)}
      options={options}
      style={{ width: 200 }}
      placeholder="Please select"
    />
  );
};
