import { Button, Dialog, Space, Divider } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  return (
    <Space direction="vertical" gap={20}>
      <div>
        <h4 style={{ marginBottom: 12 }}>基础拖拽</h4>
        <Space>
          <Button onClick={() => setOpen1(true)}>限制在窗口内</Button>
          <Dialog
            title="限制在窗口内拖拽"
            open={open1}
            draggable
            onCancel={() => setOpen1(false)}
            onConfirm={() => setOpen1(false)}
          >
            <p>拖拽此对话框,它会被限制在窗口范围内。</p>
            <p>默认: dragLimitInWindow = true</p>
          </Dialog>

          <Button onClick={() => setOpen2(true)}>无限制拖拽</Button>
          <Dialog
            title="无限制拖拽"
            open={open2}
            draggable
            dragLimitInWindow={false}
            onCancel={() => setOpen2(false)}
            onConfirm={() => setOpen2(false)}
          >
            <p>此对话框可以被拖拽到窗口外的任意位置。</p>
            <p>设置: dragLimitInWindow = false</p>
          </Dialog>
        </Space>
      </div>

      <Divider />

      <div>
        <h4 style={{ marginBottom: 12 }}>位置重置</h4>
        <Space>
          <Button onClick={() => setOpen3(true)}>自动重置位置</Button>
          <Dialog
            title="自动重置位置"
            open={open3}
            draggable
            openResetLocation
            onCancel={() => setOpen3(false)}
            onConfirm={() => setOpen3(false)}
          >
            <p>拖拽此对话框到新位置,然后关闭。</p>
            <p>再次打开时,它会重置到屏幕中心。</p>
            <p>默认: openResetLocation = true</p>
          </Dialog>

          <Button onClick={() => setOpen4(true)}>记住位置</Button>
          <Dialog
            title="记住位置"
            open={open4}
            draggable
            openResetLocation={false}
            onCancel={() => setOpen4(false)}
            onConfirm={() => setOpen4(false)}
          >
            <p>拖拽此对话框到新位置,然后关闭。</p>
            <p>再次打开时,它会保持在之前的位置。</p>
            <p>设置: openResetLocation = false</p>
          </Dialog>
        </Space>
      </div>
    </Space>
  );
};
