import { Select } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Grape', value: 'grape' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Watermelon', value: 'watermelon' },
];

export default () => {
  const [value, setValue] = useState('apple');

  return (
    <Select
      searchable
      value={value}
      onChange={(val) => setValue(val as string)}
      options={options}
      style={{ width: 200 }}
      placeholder="Please search"
    />
  );
};
