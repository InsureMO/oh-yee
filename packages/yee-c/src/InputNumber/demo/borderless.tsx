/**
 * title: Borderless
 * description: Remove the border via bordered={false}.
 */
import { InputNumber } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <InputNumber defaultValue={100} bordered={false} placeholder="Borderless" />
  );
};
