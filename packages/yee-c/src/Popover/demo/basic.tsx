import { Button, Popover } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Popover title="Title" content="This is some content, this is some content, this is some content">
      <Button>Hover me</Button>
    </Popover>
  );
};
