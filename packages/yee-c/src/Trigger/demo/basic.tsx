import React, { useState } from 'react';
import { Button, Trigger } from '@rainbow-oh/yee-c';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Trigger
      trigger={['click']}
      placement="bottom"
      open={open}
      onOpenChange={setOpen}
      popup={
        <div
          style={{
            background: '#fff',
            padding: 12,
            borderRadius: 6,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          Click popup content
        </div>
      }
    >
      <Button type="primary">Click Me</Button>
    </Trigger>
  );
};
