import { Tree } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

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

  const onCheck = (keys: unknown) => {
    setCheckedKeys(keys as string[]);
  };

  return (
    <Tree
      checkable
      defaultExpandAll
      dataSource={treeData}
      checkedKeys={checkedKeys}
      onCheck={onCheck}
    />
  );
};
