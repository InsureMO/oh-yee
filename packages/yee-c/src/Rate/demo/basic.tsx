import { Rate } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(3);

  return (
    <div>
      <Rate value={value} onChange={setValue} />
      <span style={{ marginLeft: 8 }}>{value} stars</span>
    </div>
  );
};
