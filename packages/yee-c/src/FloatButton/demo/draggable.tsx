import React from 'react';
import { FloatButton } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <div style={{ transform: 'scale(1)', height: '100vh' }}>
      <FloatButton
        icon={<span>+</span>}
        draggable
        dragLimitInWindow
        onDragChange={(draging, ref) => {
          console.log('Drag status:', draging);
        }}
      />
    </div>
  );
};
