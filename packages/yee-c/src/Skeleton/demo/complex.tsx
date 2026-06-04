import { Skeleton } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <Skeleton avatar title paragraph={{ rows: 4 }} />
    </div>
  );
};
