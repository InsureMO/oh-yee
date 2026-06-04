import { Slider } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3>禁用状态</h3>
      <Slider defaultValue={50} disabled />
    </div>
  );
};