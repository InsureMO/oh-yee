import { Select, Space } from '@rainbow-oh/yee-c';
import React from 'react';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
];

export default () => {
  return (
    <Space direction="vertical">
      <Select
        loading
        options={options}
        style={{ width: 200 }}
        placeholder="Loading"
      />
      <Select
        loading
        disabled
        defaultValue="apple"
        options={options}
        style={{ width: 200 }}
      />
    </Space>
  );
};
