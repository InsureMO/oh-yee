import { Checkbox } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value1, setValue1] = useState(['Apple']);
  const [value2, setValue2] = useState(['Apple']);

  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];

  return (
    <div>
      <Checkbox.Group
        options={options}
        value={value1}
        onChange={(val) => setValue1(val as string[])}
        buttonStyle="outline"
      />
      <br />
      <br />
      <Checkbox.Group
        options={options}
        value={value2}
        onChange={(val) => setValue2(val as string[])}
        buttonStyle="solid"
      />
    </div>
  );
};
