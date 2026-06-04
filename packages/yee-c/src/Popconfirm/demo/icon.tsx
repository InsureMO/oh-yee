import { Button, Popconfirm, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space>
      <Popconfirm
        title="With custom icon"
        icon={<span>❓</span>}
        onConfirm={() => console.log('Confirmed')}
      >
        <Button>Custom Icon</Button>
      </Popconfirm>

      <Popconfirm
        title="No icon"
        icon={null}
        onConfirm={() => console.log('Confirmed')}
      >
        <Button>No Icon</Button>
      </Popconfirm>
    </Space>
  );
};
