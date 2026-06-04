import { Select, Space } from '@oh/yee-c';
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
        disabled
        defaultValue="apple"
        options={options}
        style={{ width: 200 }}
        placeholder="Disabled Select"
      />

      <Select
        defaultValue="apple"
        options={options}
        style={{ width: 200 }}
        placeholder="Normal Select"
      />
    </Space>
  );
};
