import { Button, Dialog, Space, Divider } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  return (
    <Space direction="vertical" gap={20}>
      <div>
        <h4 style={{ marginBottom: 12 }}>Basic Dragging</h4>
        <Space>
          <Button onClick={() => setOpen1(true)}>Limit to Window</Button>
          <Dialog
            title="Drag Limited to Window"
            open={open1}
            draggable
            onCancel={() => setOpen1(false)}
            onConfirm={() => setOpen1(false)}
          >
            <p>Drag this dialog, it will be constrained within the window bounds.</p>
            <p>Default: dragLimitInWindow = true</p>
          </Dialog>

          <Button onClick={() => setOpen2(true)}>Unlimited Dragging</Button>
          <Dialog
            title="Unlimited Dragging"
            open={open2}
            draggable
            dragLimitInWindow={false}
            onCancel={() => setOpen2(false)}
            onConfirm={() => setOpen2(false)}
          >
            <p>This dialog can be dragged to any position outside the window.</p>
            <p>Setting: dragLimitInWindow = false</p>
          </Dialog>
        </Space>
      </div>

      <Divider />

      <div>
        <h4 style={{ marginBottom: 12 }}>Position Reset</h4>
        <Space>
          <Button onClick={() => setOpen3(true)}>Auto Reset Position</Button>
          <Dialog
            title="Auto Reset Position"
            open={open3}
            draggable
            openResetLocation
            onCancel={() => setOpen3(false)}
            onConfirm={() => setOpen3(false)}
          >
            <p>Drag this dialog to a new position, then close it.</p>
            <p>When reopened, it will reset to the center of the screen.</p>
            <p>Default: openResetLocation = true</p>
          </Dialog>

          <Button onClick={() => setOpen4(true)}>Remember Position</Button>
          <Dialog
            title="Remember Position"
            open={open4}
            draggable
            openResetLocation={false}
            onCancel={() => setOpen4(false)}
            onConfirm={() => setOpen4(false)}
          >
            <p>Drag this dialog to a new position, then close it.</p>
            <p>When reopened, it will stay at the previous position.</p>
            <p>Setting: openResetLocation = false</p>
          </Dialog>
        </Space>
      </div>
    </Space>
  );
};
