import { Button, Popconfirm, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space>
      <Popconfirm
        title="Are you sure to delete?"
        description="This action cannot be undone"
        onConfirm={() => console.log('Confirmed')}
        onCancel={() => console.log('Canceled')}
      >
        <Button color="danger">Delete</Button>
      </Popconfirm>

      <Popconfirm
        title="Are you sure?"
        onConfirm={() => console.log('Confirmed')}
      >
        <Button>Confirm</Button>
      </Popconfirm>
    </Space>
  );
};
