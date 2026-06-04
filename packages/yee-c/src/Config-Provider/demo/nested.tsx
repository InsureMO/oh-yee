import React from 'react';
import { Button, ConfigProvider, Space } from '@oh/yee-c';

export default () => {
  return (
    <ConfigProvider
      value={{
        button: {
          type: 'primary',
        },
      }}
    >
      <Space>
        <Button>Outer Config</Button>

        <ConfigProvider
          value={{
            button: {
              type: 'dashed',
              size: 'large',
            },
          }}
        >
          <Button>Inner Config</Button>
        </ConfigProvider>

        <Button type="default">Outer Config Again</Button>
      </Space>
    </ConfigProvider>
  );
};
