import { Button, Drawer } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Drawer without close button
      </Button>
      <Drawer
        title="Drawer without close button"
        open={open}
        closable={false}
        onClose={() => setOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
