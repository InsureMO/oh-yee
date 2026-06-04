import { Skeleton } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <Skeleton paragraph={{ rows: 2 }} avatar={false} title={false} />

      <div style={{ marginTop: 16 }}>
        <Skeleton
          paragraph={{
            rows: 4,
            width: ['100%', '80%', '60%', '40%'],
          }}
          avatar={false}
          title={false}
        />
      </div>
    </div>
  );
};
