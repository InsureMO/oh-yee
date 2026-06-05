import { Button, ConfigProvider, Space } from '@rainbow-oh/yee-c';
import React from 'react';

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
