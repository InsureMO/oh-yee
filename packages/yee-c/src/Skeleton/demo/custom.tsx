import { Skeleton } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <Skeleton
        avatar={{ shape: 'square' }}
        title={{ width: '50%' }}
        paragraph={{
          rows: 3,
          width: ['80%', '60%', '40%'],
        }}
      />
    </div>
  );
};
