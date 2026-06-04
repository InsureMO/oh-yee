import { TextArea } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState('');

  const handleChange = (val: string) => {
    setValue(val);
  };

  return (
    <TextArea
      value={value}
      onChange={handleChange}
      placeholder="Controlled TextArea"
      style={{ width: '100%' }}
    />
  );
};
