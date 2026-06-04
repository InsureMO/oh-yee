import { Space, Spin } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Space>
        <Spin color="info" />
        <span>info</span>
      </Space>

      <Space>
        <Spin color="success" />
        <span>success</span>
      </Space>

      <Space>
        <Spin color="warning" />
        <span>warning</span>
      </Space>

      <Space>
        <Spin color="error" />
        <span>error</span>
      </Space>

      <Space>
        <Spin color="#722ed1" />
        <span>custom color</span>
      </Space>
    </Space>
  );
};
