import { Button, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space wrap>
      <Button type="primary">Primary Button</Button>
      <Button children="Children Button"/>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </Space>
  );
};
