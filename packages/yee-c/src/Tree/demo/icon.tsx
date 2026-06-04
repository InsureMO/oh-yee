import { Tree } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const treeData = [
    {
      label: 'parent 1',
      key: '0-0',
      children: [
        {
          label: 'leaf with icon',
          key: '0-0-0',
          icon: '🔑',
        },
        {
          label: 'leaf with icon',
          key: '0-0-1',
          icon: '✅',
        },
      ],
    },
  ];

  return <Tree showIcon defaultExpandAll dataSource={treeData} />;
};
