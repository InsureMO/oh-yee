import { Rate } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(2.5);

  return (
    <div>
      <Rate value={value} onChange={setValue} allowHalf />
      <span style={{ marginLeft: 8 }}>{value} stars</span>
    </div>
  );
};
