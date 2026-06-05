import { FloatButton } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ transform: 'scale(1)', height: '100vh' }}>
      <FloatButton
        icon={<span>+</span>}
        draggable
        dragLimitInWindow
        onDragChange={(draging) => {
          console.log('Drag status:', draging);
        }}
      />
    </div>
  );
};
