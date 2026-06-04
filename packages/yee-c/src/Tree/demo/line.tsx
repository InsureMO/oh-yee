import { Tree } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
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

  return <Tree showLine defaultExpandAll dataSource={treeData} />;
};
