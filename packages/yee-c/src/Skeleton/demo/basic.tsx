import React from 'react';
import { Skeleton, Card, Space } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <Space direction="vertical" gap={16} style={{ width: '100%' }}>
      <Card title="Basic Placeholder">
        <Skeleton />
      </Card>

      <Card title="With Avatar">
        <Skeleton avatar title paragraph={{ rows: 2 }} />
      </Card>

      <Card title="Title and Paragraph">
        <Skeleton
          avatar={false}
          title={{ width: '50%' }}
          paragraph={{ rows: 3, width: ['100%', '80%', '60%'] }}
        />
      </Card>
    </Space>
  );
};
