import { Select, Space } from '@oh/yee-c';
import React, { useState } from 'react';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
];

export default () => {
  const [value, setValue] = useState('apple');

  return (
    <Space direction="vertical">
      <Select
        value={value}
        onChange={setValue as any}
        options={options}
        style={{ width: 200 }}
        placeholder="Small Size"
      />

      <Select
        value={value}
        onChange={setValue as any}
        options={options}
        style={{ width: 200 }}
        placeholder="Default Size"
      />

      <Select
        value={value}
        onChange={setValue as any}
        options={options}
        style={{ width: 200 }}
        placeholder="Large Size"
      />
    </Space>
  );
};
