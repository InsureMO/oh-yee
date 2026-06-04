import { Button, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Space direction="horizontal">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Space>

      <Space direction="vertical">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Space>
    </div>
  );
};
