import { Space, Tag } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Space block>
        <Tag variant="filled">Filled</Tag>
        <Tag variant="solid">Solid</Tag>
        <Tag variant="outlined">Outlined</Tag>
      </Space>
      <Space block>
        <Tag variant="filled" status="success">
          Success
        </Tag>
        <Tag variant="solid" status="success">
          Success
        </Tag>
        <Tag variant="outlined" status="success">
          Success
        </Tag>
      </Space>
      <Space block>
        <Tag variant="filled" status="warning">
          Warning
        </Tag>
        <Tag variant="solid" status="warning">
          Warning
        </Tag>
        <Tag variant="outlined" status="warning">
          Warning
        </Tag>
      </Space>
      <Space block>
        <Tag variant="filled" status="error">
          Error
        </Tag>
        <Tag variant="solid" status="error">
          Error
        </Tag>
        <Tag variant="outlined" status="error">
          Error
        </Tag>
      </Space>
    </Space>
  );
};
