import React, { useState } from 'react';
import { Button, Dialog, Space } from '@rainbow-oh/yee-c';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Custom Footer</Button>
      <Dialog
        title="Custom Footer"
        open={open}
        onCancel={() => setOpen(false)}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="primary" onClick={() => setOpen(false)}>
                Save
              </Button>
              <Button type="primary" color="danger" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </Space>
          </div>
        }
      >
        <p>This dialog has a custom footer.</p>
      </Dialog>
    </>
  );
};
