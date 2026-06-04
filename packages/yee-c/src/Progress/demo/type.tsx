import { Progress, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>Line Progress</div>
        <Progress percent={30} />
        <Progress percent={50} status="success" />
        <Progress percent={70} status="error" />
        <Progress percent={100} status="success" />
        <Progress percent={50} showInfo={false} />
      </Space>

      <Space>
        <Space direction="vertical">
          <div>Circle Progress</div>
          <Progress type="circle" percent={75} />
        </Space>

        <Space direction="vertical">
          <div>Dashboard Progress</div>
          <Progress type="dashboard" percent={75} />
        </Space>
      </Space>
    </Space>
  );
};
