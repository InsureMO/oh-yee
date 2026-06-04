import { Button, Popconfirm, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space>
      <Popconfirm
        title="确认删除吗？"
        description="删除后无法恢复，请确认"
        onConfirm={() => console.log('Confirmed')}
        onCancel={() => console.log('Canceled')}
      >
        <Button color="danger">删除</Button>
      </Popconfirm>

      <Popconfirm
        title="确认操作吗？"
        onConfirm={() => console.log('Confirmed')}
      >
        <Button>确认操作</Button>
      </Popconfirm>
    </Space>
  );
};
