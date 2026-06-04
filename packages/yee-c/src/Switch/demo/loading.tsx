import { Space, Switch } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space>
      <Switch loading />
      <Switch loading checked />
    </Space>
  );
};
