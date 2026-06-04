import React, { useState } from 'react';
import { Button, Input, Space } from '@oh/yee-c';

export default () => {
  const [value, setValue] = useState('Controlled value');

  return (
    <Space direction="vertical">
      <Input
        value={value}
        onChange={(val) => setValue(val)}
        placeholder="Controlled input"
      />
      <Space>
        <Button onClick={() => setValue('New value')}>Set Value</Button>
        <Button onClick={() => setValue('')}>Clear</Button>
      </Space>
    </Space>
  );
};
