import { Skeleton } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <Skeleton avatar title paragraph={{ rows: 4 }} active />
    </div>
  );
};
