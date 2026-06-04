import { Space, Spin } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Space>
        <Spin variant="dot" />
        <span>dot</span>
      </Space>

      <Space>
        <Spin variant="ring" />
        <span>ring</span>
      </Space>

      <Space>
        <Spin variant="spokes" />
        <span>spokes</span>
      </Space>
    </Space>
  );
};
