import React, { useState } from 'react';
import Selector from '../selector';
import type { TagType } from '../interface';

const options: TagType[] = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
  { label: 'Yellow', value: 'yellow' },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>(['red', 'blue']);

  return (
    <Selector
      style={{ width: 300 }}
      mode="multiple"
      placeholder="Select colors"
      options={options}
      selectedKeys={selectedKeys}
      onRemove={(option) => {
        setSelectedKeys((prev) => prev.filter((k) => k !== option.value));
      }}
      onClear={() => setSelectedKeys([])}
    />
  );
};
