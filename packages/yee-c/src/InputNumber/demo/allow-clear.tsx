/**
 * title: Allow Clear
 * description: Display a clear button via the allowClear property.
 */
import { InputNumber } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <InputNumber
      defaultValue={100}
      allowClear
      placeholder="Clearable"
      onChange={(value) => console.log('value:', value)}
    />
  );
};
