import { Card, Skeleton } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
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
    </div>
  );
};
