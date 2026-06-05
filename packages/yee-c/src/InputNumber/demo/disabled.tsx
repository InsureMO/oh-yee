/**
 * title: Disabled State
 * description: Disable the input via the disabled property.
 */
import { InputNumber, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <InputNumber defaultValue={100} disabled placeholder="Disabled" />
      <InputNumber defaultValue={100} readOnly placeholder="Read only" />
    </Space>
  );
};
