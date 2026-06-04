import { Button, Drawer, Space } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<
    'top' | 'bottom' | 'left' | 'right'
  >('right');

  const showDrawer = (place: 'top' | 'bottom' | 'left' | 'right') => {
    setPlacement(place);
    setOpen(true);
  };

  return (
    <>
      <Space>
        <Button onClick={() => showDrawer('top')}>Top</Button>
        <Button onClick={() => showDrawer('bottom')}>Bottom</Button>
        <Button onClick={() => showDrawer('left')}>Left</Button>
        <Button onClick={() => showDrawer('right')}>Right</Button>
      </Space>
      <Drawer
        title={`${placement} Drawer`}
        placement={placement}
        open={open}
        onClose={() => setOpen(false)}
        width={placement === 'left' || placement === 'right' ? 300 : undefined}
        height={placement === 'top' || placement === 'bottom' ? 200 : undefined}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
