import React, { useState } from 'react';
import { Button, Portal } from '@rainbow-oh/yee-c';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(!open)}>
        {open ? 'Close Portal' : 'Open Portal'}
      </Button>
      <Portal open={open}>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            padding: 24,
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
          }}
        >
          <p>This content is rendered via Portal.</p>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Portal>
    </>
  );
};
