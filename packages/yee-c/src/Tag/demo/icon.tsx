import { Space, Tag } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space>
      <Tag icon="🔑">Key</Tag>
      <Tag icon="✅" status="success">
        Success
      </Tag>
      <Tag icon="⚠️" status="warning">
        Warning
      </Tag>
      <Tag icon="❌" status="error">
        Error
      </Tag>
    </Space>
  );
};
