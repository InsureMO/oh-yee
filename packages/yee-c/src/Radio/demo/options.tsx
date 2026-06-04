import { Radio, Space } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value1, setValue1] = useState('Apple');
  const [value2, setValue2] = useState('Apple');

  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];

  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: true },
  ];

  return (
    <Space direction="vertical">
      <Radio.Group
        options={options}
        onChange={(e) => setValue1(e)}
        value={value1}
      />

      <Radio.Group
        options={optionsWithDisabled}
        onChange={(e) => setValue2(e)}
        value={value2}
      />
    </Space>
  );
};
