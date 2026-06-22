import { Space, Switch } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Switch
        checkedChildren="ON"
        unCheckedChildren="OFF"
        style={{ width: 60 }}
      />
      <Switch
        checkedChildren="On"
        unCheckedChildren="OFF"
        style={{ width: 60 }}
      />
      <Switch
        checkedChildren="✅"
        unCheckedChildren="❌"
        style={{ width: 48 }}
      />
    </Space>
  );
};
