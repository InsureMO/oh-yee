import { Radio, Space } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<string>();

  return (
    <Space direction="vertical">
      <Radio.Group
        options={[
          { value: '1', label: 'Option A' },
          { value: '2', label: 'Option B' },
          { value: '3', label: 'Option C' },
        ]}
        value={value}
        onChange={(value: string) => {
          console.log(value);
          setValue(value);
        }}
      />

      <div>Selected value: {value}</div>
    </Space>
  );
};
