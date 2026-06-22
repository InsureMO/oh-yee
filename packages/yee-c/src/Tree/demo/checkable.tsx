import { Tree } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  const treeData = [
    {
      label: 'parent 1',
      key: 1,
      children: [
        {
          label: 'parent 1-0',
          key: 10,
          children: [
            {
              label: 'leaf',
              key: 100,
            },
            {
              label: 'leaf',
              key: 101,
            },
          ],
        },
        {
          label: 'parent 1-1',
          key: 20,
          children: [
            {
              label: 'leaf',
              key: 201,
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
