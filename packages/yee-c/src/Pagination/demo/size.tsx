import { Pagination, Space } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [current, setCurrent] = useState(1);

  return (
    <Space direction="vertical">
      <Pagination
        size="small"
        current={current}
        total={50}
        onChange={({ current }) => setCurrent(current)}
      />
      <Pagination
        size="default"
        current={current}
        total={50}
        onChange={({ current }) => setCurrent(current)}
      />
    </Space>
  );
};
