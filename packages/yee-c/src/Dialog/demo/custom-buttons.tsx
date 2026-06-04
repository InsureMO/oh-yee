import { Button, Dialog } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Custom Buttons</Button>
      <Dialog
        title="Custom Buttons"
        open={open}
        onCancel={() => setOpen(false)}
        cancelText="No"
        confirmText="Yes"
        cancelType="default"
        confirmType="primary"
      >
        <p>Are you sure you want to proceed?</p>
      </Dialog>
    </>
  );
};
