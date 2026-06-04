import { Progress, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div>Default Steps</div>
      <Progress percent={50} />

      <div>Custom Steps</div>
      <Progress percent={60} />

      <div>Steps with Custom Colors</div>
      <Progress
        percent={80}
      />

      <div>Small Steps</div>
      <Progress percent={66} strokeWidth={10} />
    </Space>
  );
};
