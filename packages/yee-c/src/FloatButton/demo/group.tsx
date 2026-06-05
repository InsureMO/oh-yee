import { FloatButton } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ transform: 'scale(1)', height: '50vh' }}>
      <FloatButton.Group
        icon={<span>+</span>}
        popupClassName="float-button-popup"
      >
        <FloatButton icon={<span>A</span>} />
        <FloatButton icon={<span>B</span>} />
        <FloatButton icon={<span>C</span>} />
      </FloatButton.Group>
    </div>
  );
};
