import { Button, Card, ConfigProvider, Input, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <ConfigProvider
      value={{
        button: {
          type: 'primary',
        },
        input: {
          placeholder: 'Global placeholder',
        },
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="Buttons">
          <Space>
            <Button>Primary Button</Button>
            <Button type="default">Default Button</Button>
          </Space>
        </Card>

        <Card title="Inputs">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input />
            <Input placeholder="Local placeholder override" />
          </Space>
        </Card>
      </Space>
    </ConfigProvider>
  );
};
