import { Button, Popover, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space>
      <Popover trigger="hover" title="Hover Title" content="Hover content">
        <Button>Hover me</Button>
      </Popover>

      <Popover trigger="click" title="Click Title" content="Click content">
        <Button>Click me</Button>
      </Popover>

      <Popover trigger="focus" title="Focus Title" content="Focus content">
        <Button>Focus me</Button>
      </Popover>
    </Space>
  );
};
