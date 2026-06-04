import React from 'react';
import { Button, ConfigProvider, Space } from '@oh/yee-c';

export default () => {
  return (
    <ConfigProvider
      value={{
        button: {
          type: 'primary',
          size: 'large',
        },
      }}
    >
      <Space>
        <Button>Global Config Button</Button>
        <Button type="default">Override Type</Button>
      </Space>
    </ConfigProvider>
  );
};
