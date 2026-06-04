import { Button, Space, Tooltip } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space>
      <Tooltip title="Hover me" trigger="hover">
        <Button>Hover</Button>
      </Tooltip>

      <Tooltip title="Click me" trigger="click">
        <Button>Click</Button>
      </Tooltip>

      <Tooltip title="Focus me" trigger="focus">
        <Button>Focus</Button>
      </Tooltip>
    </Space>
  );
};
