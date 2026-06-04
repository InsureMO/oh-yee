import { Slider } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(70);

  return (
    <div style={{ padding: '20px' }}>
      <h3>隐藏Tooltip</h3>
      <Slider
        value={value}
        tooltipVisible={false}
        onChange={(val) => setValue(val as number)}
      />
      <p>当前值: {value}</p>
    </div>
  );
};