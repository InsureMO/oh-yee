import { Input } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Input
      allowClear
      placeholder="Input with clear icon"
      onChange={(value) => console.log('Input value:', value)}
    />
  );
};
