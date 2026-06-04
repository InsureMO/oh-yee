import { Button, Tooltip } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Tooltip
      title={
        <div>
          <div>This is a custom tooltip</div>
          <div style={{ color: 'red' }}>With custom style</div>
        </div>
      }
    >
      <Button>Hover for custom tooltip</Button>
    </Tooltip>
  );
};
