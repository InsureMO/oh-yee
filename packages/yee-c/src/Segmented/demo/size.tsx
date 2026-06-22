import { Segmented, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => (
  <Space direction="vertical">
    <Segmented size="small" options={['Small', 'B', 'C']} />
    <Segmented options={['Default', 'B', 'C']} />
    <Segmented size="large" options={['Large', 'B', 'C']} />
  </Space>
);
