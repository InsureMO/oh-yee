import { Button, Progress, Space } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [percent, setPercent] = useState(0);

  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 10;
      return newPercent > 100 ? 100 : newPercent;
    });
  };

  const decline = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent - 10;
      return newPercent < 0 ? 0 : newPercent;
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Progress percent={percent} />
      <Progress percent={percent} status="success" />
      <Progress percent={percent} status="error" />
      <Progress percent={percent} status="warning" />

      <Space>
        <Button onClick={decline}>-</Button>
        <Button onClick={increase}>+</Button>
      </Space>
    </Space>
  );
};
