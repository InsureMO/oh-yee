import { Space, Spin } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space>
      <Spin size="small" />
      <Spin size="default" />
      <Spin size="large" />
    </Space>
  );
};
