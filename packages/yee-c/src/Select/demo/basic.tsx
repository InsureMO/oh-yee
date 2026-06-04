import { Select } from '@oh/yee-c';
import React, { useState } from 'react';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Mango', value: 'mango' },
  { label: 'Peach', value: 'peach' },
];

export default () => {
  const [value, setValue] = useState('apple');

  return (
    <Select
      value={value}
      onChange={setValue as any}
      options={options}
      style={{ width: 200 }}
    />
  );
};
