import React from 'react';
import { Input } from '@oh/yee-c';

export default () => {
  return (
    <Input
      allowClear
      placeholder="Input with clear icon"
      onChange={(value) => console.log('Input value:', value)}
    />
  );
};
