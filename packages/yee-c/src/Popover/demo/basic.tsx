import { Button, Popover } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Popover title="标题" content="这是一段内容,这是一段内容,这是一段内容">
      <Button>Hover me</Button>
    </Popover>
  );
};
