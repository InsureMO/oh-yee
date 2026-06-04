import { Button, Dialog } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Without Mask</Button>
      <Dialog
        title="Without Mask"
        open={open}
        showMask={false}
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      >
        <p>This dialog has no mask.</p>
      </Dialog>
    </>
  );
};
