import { Skeleton } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <Skeleton avatar title={false} paragraph={false} />

      <div style={{ marginTop: 16 }}>
        <Skeleton
          avatar={{ shape: 'square' }}
          title={false}
          paragraph={false}
        />
      </div>
    </div>
  );
};
