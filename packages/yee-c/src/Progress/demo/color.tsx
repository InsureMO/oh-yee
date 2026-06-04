import { Progress, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Progress percent={30} strokeColor="#ff4d4f" />
      <Progress percent={50} strokeColor="#fa8c16" />
      <Progress percent={70} strokeColor="#52c41a" />
      <Progress percent={100} strokeColor="#722ed1" />

      <div>Gradient Color</div>
      <Progress
        percent={70}
        // @ts-ignore
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
      />

      <Space>
        <Space direction="vertical">
          <div>Circle with Custom Color</div>
          <Progress type="circle" percent={75} strokeColor="#eb2f96" />
        </Space>

        <Space direction="vertical">
          <div>Dashboard with Custom Color</div>
          <Progress type="dashboard" percent={75} strokeColor="#13c2c2" />
        </Space>
      </Space>
    </Space>
  );
};
