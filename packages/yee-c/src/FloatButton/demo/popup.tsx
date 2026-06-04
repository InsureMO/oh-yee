import { Menu } from 'lucide-react';
import React from 'react';
import { FloatButton } from '@oh/yee-c';

export default () => {
  return (
    <div style={{ transform: 'scale(1)', height: '50vh' }}>
      <FloatButton.Group trigger="click" icon={<Menu size={18} />}>
        <FloatButton icon={<span>A</span>} />
        <FloatButton icon={<span>B</span>} />
      </FloatButton.Group>
    </div>
  );
};
