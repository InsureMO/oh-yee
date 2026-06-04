import React from 'react';
import { Input, Space } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <Space direction="vertical">
      <Input size="small" placeholder="Small size" />
      <Input size="default" placeholder="Default size" />
      <Input size="large" placeholder="Large size" />
    </Space>
  );
};
