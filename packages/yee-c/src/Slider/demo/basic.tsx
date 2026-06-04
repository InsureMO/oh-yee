import { Slider } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(30);

  return (
    <div style={{ padding: '20px' }}>
      <h3>基础滑动条</h3>
      <Slider 
        value={value} 
        onChange={(val) => {
          console.log('Slider value changed:', val);
          setValue(val as number);
        }} 
      />
      <p>当前值: {value}</p>
    </div>
  );
};