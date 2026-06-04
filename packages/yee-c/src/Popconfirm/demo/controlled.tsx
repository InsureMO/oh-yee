import { Button, Popconfirm, Space } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Space direction="vertical">
      <Space>
        <Button onClick={() => setOpen(true)}>Open Confirm</Button>
        <Button onClick={() => setOpen(false)}>Close Confirm</Button>
      </Space>

      <Popconfirm
        open={open}
        title="Controlled Popconfirm"
        description="This is a controlled popconfirm"
        onConfirm={() => {
          console.log('Confirmed');
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      >
        <Button>Controlled Confirm</Button>
      </Popconfirm>
    </Space>
  );
};
