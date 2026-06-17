import { Tree, moveTreeNode } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

const FIELD_NAMES = {
  key: 'key',
  label: 'label',
  children: 'children',
} as const;

export default () => {
  const [data, setData] = useState([
    {
      label: 'parent 1',
      key: '0-0',
      children: [
        {
          label: 'parent 1-0',
          key: '0-0-0',
          children: [
            { label: 'leaf-1', key: '0-0-0-0' },
            { label: 'leaf-2', key: '0-0-0-1' },
          ],
        },
        {
          label: 'parent 1-1',
          key: '0-0-1',
          children: [{ label: 'leaf-3', key: '0-0-1-0' }],
        },
      ],
    },
    {
      label: 'parent 2',
      key: '0-1',
      children: [{ label: 'leaf-4', key: '0-1-0' }],
    },
  ]);

  return (
    <Tree
      draggable
      defaultExpandAll
      dataSource={data}
      onDrop={(info) =>
        setData((prev) =>
          moveTreeNode(
            prev,
            {
              dragKey: info.dragKey,
              dropKey: info.dropKey,
              position: info.position,
            },
            FIELD_NAMES,
          ),
        )
      }
    />
  );
};
