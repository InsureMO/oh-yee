import { Button, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space wrap>
      <Button type="primary">Primary Button</Button>
      <Button>Children Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button variant="filled" type="text">
        Text Button
      </Button>
      <Button type="link">Link Button</Button>
    </Space>
  );
};
