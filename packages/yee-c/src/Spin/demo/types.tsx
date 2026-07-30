import { Space, Spin } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Space>
        <Spin variant="dot" color="error"/>
        <span>dot</span>
      </Space>

      <Space>
        <Spin variant="ring" color="error"/>
        <span>ring</span>
      </Space>

      <Space>
        <Spin variant="spokes" color="error"/>
        <span>spokes</span>
      </Space>
    </Space>
  );
};
