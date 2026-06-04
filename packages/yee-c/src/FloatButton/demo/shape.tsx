import React from 'react';
import { FloatButton } from '@oh/yee-c';

export default () => {
  return (
    <div style={{ transform: 'scale(1)', height: '50vh' }}>
      <FloatButton.Group>
        <FloatButton shape="circle" icon={<span>+</span>} />
        <FloatButton shape="square" icon={<span>+</span>} />
      </FloatButton.Group>
    </div>
  );
};
