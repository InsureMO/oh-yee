import { Button, Popconfirm, Space } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Space direction="vertical">
      <Space>
        <Button onClick={() => setOpen(true)}>打开确认框</Button>
        <Button onClick={() => setOpen(false)}>关闭确认框</Button>
      </Space>

      <Popconfirm
        open={open}
        title="受控的确认框"
        description="这是一个受控的确认框"
        onConfirm={() => {
          console.log('Confirmed');
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      >
        <Button>受控确认框</Button>
      </Popconfirm>
    </Space>
  );
};
