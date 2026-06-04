import { Button, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space wrap gap={8} style={{ width: 300 }}>
      {Array.from({ length: 20 }, (_, i) => (
        <Button key={i}>Button {i + 1}</Button>
      ))}
    </Space>
  );
};
