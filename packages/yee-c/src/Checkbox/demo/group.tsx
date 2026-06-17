import { Checkbox } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<Array<string | number>>(['Apple']);

  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
    { label: 'Banana', value: 'Banana', disabled: true },
  ];

  const onChange = (checkedValues: Array<string | number>) => {
    console.log('checked = ', checkedValues);
    setValue(checkedValues);
  };

  return (
    <div>
      <Checkbox.Group options={options} value={value} onChange={onChange} />
      <br />
      <br />
      <Checkbox.Group
        value={value}
        onChange={onChange}
        layout="vertical"
        options={[
          { value: 'A', label: 'Option A' },
          { value: 'B', label: 'Option B' },
          { value: 'C', label: 'Option C' },
          { value: 'D', label: 'Option D', disabled: true },
        ]}
      ></Checkbox.Group>
    </div>
  );
};
