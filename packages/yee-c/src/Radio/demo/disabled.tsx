import { Radio, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical">
      <Radio.Group defaultValue={1} options={[
        { value: 1, label: 'Option A' },
        { value: 2, label: 'Option B', disabled: true },
        { value: 3, label: 'Option C' },
      ]}>
      </Radio.Group>

      <Radio.Group defaultValue={2} disabled options={[
        { value: 1, label: 'Option A' },
        { value: 2, label: 'Option B', },
        { value: 3, label: 'Option C' },
      ]}>
      </Radio.Group>
    </Space>
  );
};
