import { Slider } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);

  return (
    <div style={{ padding: '20px' }}>
      <h3>范围选择滑动条</h3>
      <Slider
        range
        rangeValue={rangeValue}
        onChange={(val) => {
          console.log('Range slider value changed:', val);
          setRangeValue(val as [number, number]);
        }}
      />
      <p>范围值: [{rangeValue[0]}, {rangeValue[1]}]</p>
    </div>
  );
};