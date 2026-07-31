import { Space, Spin } from '@rainbow-oh/yee-c';
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

      <Space>
        <Spin variant="bounce" />
        <span>bounce</span>
      </Space>

      <Space>
        <Spin variant="pulse" />
        <span>pulse</span>
      </Space>

      <Space>
        <Spin variant="wheel" />
        <span>wheel</span>
      </Space>
    </Space>
  );
};
