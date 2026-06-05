import { Slider } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Disabled</h3>
      <Slider defaultValue={50} disabled />
    </div>
  );
};
