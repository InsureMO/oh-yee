import { Button, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Space gap={8}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Space>

      <Space gap={16}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Space>

      <Space gap={24}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Space>
    </div>
  );
};
