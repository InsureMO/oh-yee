import React, { useState } from 'react';
import Selector from '../selector';
import type { TagType } from '../interface';

const options: TagType[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian' },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>(['apple']);

  return (
    <Selector
      style={{ width: 240 }}
      placeholder="Select a fruit"
      options={options}
      selectedKeys={selectedKeys}
      onRemove={(option) => {
        setSelectedKeys((prev) => prev.filter((k) => k !== option.value));
      }}
      onClear={() => setSelectedKeys([])}
    />
  );
};
