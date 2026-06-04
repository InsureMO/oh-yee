import React from 'react';
import { Spin, Space, Card } from '@oh/yee-c';

export default () => {
  return (
    <Space direction="vertical" gap={16} style={{ width: '100%' }}>
      <Card title="Default Spinner">
        <Spin />
      </Card>

      <Card title="Sizes">
        <Space>
          <Spin size="small" />
          <Spin size="default" />
          <Spin size="large" />
        </Space>
      </Card>

      <Card title="With Tip Text">
        <Spin tip="Loading..." />
      </Card>

      <Card title="Wrapping Content">
        <div
          style={{
            border: '1px solid #d9d9d9',
            padding: 24,
            borderRadius: 4,
            position: 'relative',
          }}
        >
          <Spin spinning>
            <p>Content is loading and cannot be interacted with.</p>
            <p>The overlay prevents user actions while data is being fetched.</p>
          </Spin>
        </div>
      </Card>
    </Space>
  );
};
