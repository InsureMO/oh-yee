import { Button, Popconfirm, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space>
      <Popconfirm
        title="带自定义图标"
        icon={<span>❓</span>}
        onConfirm={() => console.log('Confirmed')}
      >
        <Button>自定义图标</Button>
      </Popconfirm>

      <Popconfirm
        title="无图标"
        icon={null}
        onConfirm={() => console.log('Confirmed')}
      >
        <Button>无图标</Button>
      </Popconfirm>
    </Space>
  );
};
