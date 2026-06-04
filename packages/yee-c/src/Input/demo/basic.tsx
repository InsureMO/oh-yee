import React from 'react';
import { Input } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <Input
      placeholder="Basic usage"
      onChange={(value) => console.log('Input value:', value)}
    />
  );
};
