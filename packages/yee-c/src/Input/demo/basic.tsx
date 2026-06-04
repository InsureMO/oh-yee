import { Input } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Input
      placeholder="Basic usage"
      onChange={(value) => console.log('Input value:', value)}
    />
  );
};
