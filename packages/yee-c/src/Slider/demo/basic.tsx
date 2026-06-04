import { Slider } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(30);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Basic Slider</h3>
      <Slider
        value={value}
        onChange={(val) => {
          console.log('Slider value changed:', val);
          setValue(val as number);
        }}
      />
      <p>Current value: {value}</p>
    </div>
  );
};