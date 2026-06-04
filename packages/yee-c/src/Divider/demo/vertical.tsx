import { Divider, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space>
      <span>Item 1</span>
      <Divider type="vertical" />
      <span>Item 2</span>
      <Divider type="vertical" />
      <span>Item 3</span>
    </Space>
  );
};
