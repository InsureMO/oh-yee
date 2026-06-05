/**
 * title: Basic Usage
 * description: The simplest usage.
 */
import { InputNumber } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <InputNumber
      defaultValue={0}
      placeholder="Enter a number"
      onChange={(value) => console.log('value:', value)}
    />
  );
};
