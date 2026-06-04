import { Space, Spin } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Spin width={20} height={20} />
      <Spin width={40} height={40} />
      <Spin width={60} height="60px" />
    </Space>
  );
};
