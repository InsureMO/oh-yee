import { Tree } from '@oh/yee-c';
import type { TreeProps } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const treeData = [
    {
      label: 'parent 1',
      key: '0-0',
      children: [
        {
          label: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              label: 'leaf',
              key: '0-0-0-0',
            },
            {
              label: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          label: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              label: 'leaf',
              key: '0-0-1-0',
            },
          ],
        },
      ],
    },
  ];

  const onSelect: TreeProps<Record<string, unknown>>['onSelect'] = (keys) => {
    setSelectedKeys(keys as string[]);
  };

  return (
    <Tree
      defaultExpandAll
      dataSource={treeData}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
      multiple
    />
  );
};
