import { Button, Space, Tree } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['0-0', '0-0-0']);

  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              title: 'leaf',
              key: '0-0-1-0',
            },
          ],
        },
      ],
    },
  ];

  const handleExpandAll = () => {
    type TreeNodeData = {
      title: string;
      key: string;
      children?: TreeNodeData[];
    };
    const getAllKeys = (data: TreeNodeData[]): string[] => {
      let keys: string[] = [];
      data.forEach((item) => {
        keys.push(item.key);
        if (item.children) {
          keys = keys.concat(getAllKeys(item.children));
        }
      });
      return keys;
    };
    setExpandedKeys(getAllKeys(treeData));
  };

  const handleCollapseAll = () => {
    setExpandedKeys([]);
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={handleExpandAll}>Expand All</Button>
        <Button onClick={handleCollapseAll}>Collapse All</Button>
      </Space>

      <Tree
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys as string[])}
        dataSource={treeData}
      />
    </>
  );
};
