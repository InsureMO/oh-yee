import { Progress, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Progress percent={50} format={(percent) => `${percent}/100`} />

      <Progress
        type="circle"
        percent={75}
        format={(percent) => `${percent} Days`}
      />

      <Progress type="dashboard" percent={100} format={() => 'Done'} />

      <Progress percent={60} format={(percent) => `${percent}%`} />

      <Space>
        <Progress type="circle" percent={30} width={80} format={() => '30'} />

        <Progress type="circle" percent={100} width={80} format={() => '💯'} />
      </Space>
    </Space>
  );
};
