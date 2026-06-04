import { Input, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Input
        prefix="￥"
        suffix="RMB"
        placeholder="Input with prefix and suffix"
      />
      <Input
        prefix={<span>http://</span>}
        suffix={<span>.com</span>}
        placeholder="Input with node prefix and suffix"
      />
    </Space>
  );
};
