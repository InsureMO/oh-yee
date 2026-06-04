import { Rate } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(3);

  const tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  return (
    <div>
      <Rate value={value} onChange={setValue} />
      {value ? (
        <span style={{ marginLeft: 8 }}>{tooltips[value - 1]}</span>
      ) : (
        ''
      )}
    </div>
  );
};
