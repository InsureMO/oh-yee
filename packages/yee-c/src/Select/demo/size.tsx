import { Select, Space } from '@rainbow-oh/yee-c';
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
        onChange={(val) => setValue(val as string)}
        options={options}
        size="small"
        style={{ width: 200 }}
        placeholder="Small Size"
      />

      <Select
        value={value}
        onChange={(val) => setValue(val as string)}
        options={options}
        style={{ width: 200 }}
        placeholder="Default Size"
      />

      <Select
        value={value}
        onChange={(val) => setValue(val as string)}
        options={options}
        size="large"
        style={{ width: 200 }}
        placeholder="Large Size"
      />
    </Space>
  );
};
