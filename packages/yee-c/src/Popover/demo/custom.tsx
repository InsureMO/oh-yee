import { Button, Popover } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const content = (
    <div>
      <p>This is custom content</p>
      <div>
        <Button size="small" style={{ marginRight: 8 }}>
          OK
        </Button>
        <Button size="small" type="primary">
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <Popover title="Custom Content" content={content}>
      <Button>Custom Content</Button>
    </Popover>
  );
};
