import { Space, Tag } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space>
      <Tag dashed>Default Dashed</Tag>
      <Tag dashed status="success">
        Success Dashed
      </Tag>
      <Tag dashed status="error">
        Error Dashed
      </Tag>
      <Tag dashed status="warning">
        Warning Dashed
      </Tag>
    </Space>
  );
};
