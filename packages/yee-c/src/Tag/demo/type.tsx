import { Space, Tag } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space>
      <Tag status="success">Success</Tag>
      <Tag status="error">Error</Tag>
      <Tag status="warning">Warning</Tag>
      <Tag status="info">Info</Tag>
      <Tag status="default">Default</Tag>
      <Tag status="disabled">Disabled</Tag>
    </Space>
  );
};
