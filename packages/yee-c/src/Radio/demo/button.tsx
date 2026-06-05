import { Radio, Space } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value1, setValue1] = useState('a');
  const [value2, setValue2] = useState('a');
  const [value3, setValue3] = useState('a');

  return (
    <Space direction="vertical">
      <Radio.Group
        value={value1}
        onChange={(e) => {
          setValue1(e);
        }}
        buttonStyle="outline"
        toggleable
        options={[
          { value: -1, label: 'Hangzhou' },
          { value: -2, label: 'Shanghai' },
          { value: -3, label: 'Beijing' },
        ]}
      />

      <Radio.Group
        value={value2}
        onChange={(e) => setValue2(e)}
        buttonStyle="solid"
        options={[
          { value: 'a', label: 'Hangzhou' },
          { value: 'b', label: 'Shanghai' },
          { value: 'c', label: 'Beijing' },
        ]}
      />

      <Radio.Group
        value={value3}
        onChange={(e) => setValue3(e)}
        buttonStyle="cornermark"
        options={[
          { value: 'a', label: 'Hangzhou' },
          { value: 'b', label: 'Shanghai' },
          { value: 'c', label: 'Beijing' },
        ]}
      ></Radio.Group>
    </Space>
  );
};
