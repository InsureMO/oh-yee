import { Slider } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(50);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Custom Range and Step</h3>
      <Slider
        min={0}
        max={1000}
        step={10}
        value={value}
        onChange={(val) => setValue(val as number)}
      />
      <p>Current value: {value}</p>
    </div>
  );
};