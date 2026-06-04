import { Rate } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <Rate defaultValue={3.5} disabled allowHalf />
      <span style={{ marginLeft: 8 }}>3.5 stars</span>
    </div>
  );
};
