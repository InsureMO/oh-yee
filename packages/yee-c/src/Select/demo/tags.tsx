import { Select } from '@oh/yee-c';
import React, { useState } from 'react';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
];

export default () => {
  const [value, setValue] = useState(['apple']);

  return (
    <Select
      mode="tags"
      value={value}
      onChange={setValue as any}
      options={options}
      style={{ width: 300 }}
      placeholder="Please select or type"
    />
  );
};
