import { Radio } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(1);

  return (
    <Radio.Group
      value={value}
      onChange={(e) => setValue(e as unknown as number)}
      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      options={[
        { value: 1, label: 'Option A' },
        { value: 2, label: 'Option B' },
        { value: 3, label: 'Option C' },
        { value: 4, label: 'Option D' },
      ]}
    ></Radio.Group>
  );
};
