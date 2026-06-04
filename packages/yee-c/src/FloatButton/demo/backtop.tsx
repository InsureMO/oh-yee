import React from 'react';
import { FloatButton } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <div style={{ height: '200vh', transform: 'scale(1)' }}>
      <div>Scroll down to see the back to top button</div>
      <FloatButton.BackTop scrollTop={100} icon={<span>↑</span>} />
    </div>
  );
};
