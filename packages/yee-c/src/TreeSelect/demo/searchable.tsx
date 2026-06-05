import React, { useState } from 'react';
import TreeSelect from '../tree-select';

const treeData = [
  {
    key: '0',
    label: 'Node 0',
    children: [
      {
        key: '0-0',
        label: 'Node 0-0',
        children: [
          { key: '0-0-0', label: 'Node 0-0-0' },
          { key: '0-0-1', label: 'Node 0-0-1' },
        ],
      },
      {
        key: '0-1',
        label: 'Node 0-1',
        children: [
          { key: '0-1-0', label: 'Node 0-1-0' },
          { key: '0-1-1', label: 'Node 0-1-1' },
        ],
      },
    ],
  },
  {
    key: '1',
    label: 'Node 1',
    children: [
      { key: '1-0', label: 'Node 1-0' },
      { key: '1-1', label: 'Node 1-1' },
    ],
  },
  {
    key: '2',
    label: 'Apple',
    children: [
      { key: '2-0', label: 'Red Apple' },
      { key: '2-1', label: 'Green Apple' },
    ],
  },
];

export default () => {
  const [value, setValue] = useState<string>('');

  const onChange = (newValue: string | number | Array<string | number>) => {
    console.log('onChange:', newValue);
    setValue(newValue as string);
  };

  return (
    <div style={{ width: 300 }}>
      <TreeSelect
        searchable
        placeholder="Search and select"
        dataSource={treeData}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
