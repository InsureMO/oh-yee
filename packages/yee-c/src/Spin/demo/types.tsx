import { Space, Spin } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Space>
        <Spin type="blank" />
        <span>blank</span>
      </Space>

      <Space>
        <Spin type="balls" />
        <span>balls</span>
      </Space>

      <Space>
        <Spin type="bars" />
        <span>bars</span>
      </Space>

      <Space>
        <Spin type="bubbles" />
        <span>bubbles</span>
      </Space>

      <Space>
        <Spin type="cubes" />
        <span>cubes</span>
      </Space>

      <Space>
        <Spin type="cylon" />
        <span>cylon</span>
      </Space>

      <Space>
        <Spin type="spin" />
        <span>spin</span>
      </Space>

      <Space>
        <Spin type="spinningBubbles" />
        <span>spinningBubbles</span>
      </Space>

      <Space>
        <Spin type="spokes" />
        <span>spokes</span>
      </Space>
    </Space>
  );
};
