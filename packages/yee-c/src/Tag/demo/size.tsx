import { Space, Tag } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Space>
        <Tag size="small">Small</Tag>
        <Tag size="default">Default</Tag>
        <Tag size="large">Large</Tag>
      </Space>

      <Space>
        <Tag size="small" status="success">
          Small Success
        </Tag>
        <Tag size="default" status="success">
          Default Success
        </Tag>
        <Tag size="large" status="success">
          Large Success
        </Tag>
      </Space>
    </Space>
  );
};
