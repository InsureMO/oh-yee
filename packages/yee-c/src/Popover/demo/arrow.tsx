import { Button, Popover } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Popover arrow={false} title="无箭头" content="这是一个没有箭头的Popover">
      <Button>No Arrow</Button>
    </Popover>
  );
};
