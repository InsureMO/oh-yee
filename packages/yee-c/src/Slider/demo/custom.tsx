import { Slider } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(50);

  return (
    <div style={{ padding: '20px' }}>
      <h3>自定义范围和步长</h3>
      <Slider
        min={0}
        max={1000}
        step={10}
        value={value}
        onChange={(val) => setValue(val as number)}
      />
      <p>当前值: {value}</p>
    </div>
  );
};