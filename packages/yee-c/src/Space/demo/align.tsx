import { Button, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Space align="start">
        <Button>Button 1</Button>
        <div
          style={{
            height: 60,
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
          }}
        >
          Tall container
        </div>
        <Button>Button 3</Button>
      </Space>

      <Space align="center">
        <Button>Button 1</Button>
        <div
          style={{
            height: 60,
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
          }}
        >
          Tall container
        </div>
        <Button>Button 3</Button>
      </Space>

      <Space align="end">
        <Button>Button 1</Button>
        <div
          style={{
            height: 60,
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
          }}
        >
          Tall container
        </div>
        <Button>Button 3</Button>
      </Space>
    </div>
  );
};
