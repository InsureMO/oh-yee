import { Button, Input, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space.Compact>
      <Input placeholder="Enter name" />
      <Button type="primary">Submit</Button>
    </Space.Compact>
  );
};
