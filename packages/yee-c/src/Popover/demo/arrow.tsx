import { Button, Popover } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Popover arrow={false} title="No Arrow" content="This is a Popover without an arrow">
      <Button>No Arrow</Button>
    </Popover>
  );
};
