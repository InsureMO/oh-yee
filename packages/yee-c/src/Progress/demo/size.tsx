import { Progress, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div>Small Size</div>
      <Progress percent={30} strokeWidth={6} />

      <div>Default Size</div>
      <Progress percent={50} strokeWidth={8} />

      <div>Large Size</div>
      <Progress percent={70} strokeWidth={12} />

      <Space>
        <Space direction="vertical">
          <div>Small Circle</div>
          <Progress type="circle" percent={30} width={80} strokeWidth={6} />
        </Space>

        <Space direction="vertical">
          <div>Default Circle</div>
          <Progress type="circle" percent={50} width={120} strokeWidth={8} />
        </Space>

        <Space direction="vertical">
          <div>Large Circle</div>
          <Progress type="circle" percent={70} width={160} strokeWidth={12} />
        </Space>
      </Space>
    </Space>
  );
};
