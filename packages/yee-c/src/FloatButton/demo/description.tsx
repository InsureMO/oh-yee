import React from 'react';
import { FloatButton } from '@oh/yee-c';

export default () => {
  return (
    <div style={{ transform: 'scale(1)', height: '30vh' }}>
      <FloatButton
        shape="square"
        description="Description"
        icon={<span>+</span>}
      />
    </div>
  );
};
