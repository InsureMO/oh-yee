import { Radio, Space } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState('a');

  return (
    <Space direction="vertical">
      <Radio.Group
        value={value}
        onChange={(e) => setValue(e)}
        size="large"
        buttonStyle="outline"
        options={[
          { value: 'a', label: 'Hangzhou' },
          { value: 'b', label: 'Shanghai' },
          { value: 'c', label: 'Beijing' },
        ]}
      >
      </Radio.Group>

      <Radio.Group
        value={value}
        onChange={(e) => setValue(e)}
        size="default"
        buttonStyle="outline"
        options={[
          { value: 'a', label: 'Hangzhou' },
          { value: 'b', label: 'Shanghai' },
          { value: 'c', label: 'Beijing' },
        ]}
      >
      </Radio.Group>

      <Radio.Group
        value={value}
        onChange={(e) => setValue(e)}
        size="small"
        buttonStyle="outline"
        options={[
          { value: 'a', label: 'Hangzhou' },
          { value: 'b', label: 'Shanghai' },
          { value: 'c', label: 'Beijing' },
        ]}
      >
      </Radio.Group>
    </Space>
  );
};
