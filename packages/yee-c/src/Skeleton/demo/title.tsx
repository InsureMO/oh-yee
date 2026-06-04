import { Skeleton } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <Skeleton title avatar={false} paragraph={false} />

      <div style={{ marginTop: 16 }}>
        <Skeleton title={{ width: '300px' }} avatar={false} paragraph={false} />
      </div>
    </div>
  );
};
