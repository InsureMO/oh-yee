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
];

export default () => {
  const [value, setValue] = useState<Array<string | number>>([]);

  const onChange = (newValue: string | number | Array<string | number>) => {
    console.log('onChange:', newValue);
    setValue(newValue as Array<string | number>);
  };

  return (
    <div style={{ width: 300 }}>
      <TreeSelect
        checkable
        mode="multiple"
        placeholder="Please select"
        dataSource={treeData}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
