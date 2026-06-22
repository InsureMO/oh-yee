import { Segmented, Space } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<string | number>('daily');

  return (
    <Space direction="vertical">
      <Segmented
        options={[
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
        ]}
        value={value}
        onChange={setValue}
      />

      <Segmented options={['List', 'Table', 'Chart']} defaultValue="List" />

      <div>Selected: {value}</div>
    </Space>
  );
};
