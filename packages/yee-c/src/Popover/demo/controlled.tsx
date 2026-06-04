import { Button, Popover, Space } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Space direction="vertical">
      <Space>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Space>

      <Popover
        open={open}
        onOpenChange={setOpen}
        title="Controlled Popover"
        content="This is a controlled popover"
      >
        <Button>Controlled</Button>
      </Popover>
    </Space>
  );
};
