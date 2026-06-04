import { Space, Switch } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Switch checkedChildren="ON" unCheckedChildren="OFF" />

      <Switch checkedChildren="开" unCheckedChildren="关" />

      <Switch checkedChildren="✅" unCheckedChildren="❌" />
    </Space>
  );
};
