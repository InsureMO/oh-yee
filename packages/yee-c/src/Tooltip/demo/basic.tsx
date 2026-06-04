import { Button, Tooltip } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Tooltip title="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  );
};
