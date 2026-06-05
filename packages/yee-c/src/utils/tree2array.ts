import React from 'react';

export type FlatItem = {
  key: string;
  label: React.ReactNode;
  level: number;
  children?: Array<FlatItem>;
  keyPath: Array<string>;
  isLeaf: boolean;
};

function hasChild(child: unknown) {
  return Array.isArray(child) && child.length > 0;
}

export default function tree2array({
  tree,
  keyPath = [],
  keyField = 'key',
  childrenField = 'children',
  level = 1,
}: {
  tree: Array<Record<string, any>> | Record<string, any>;
  keyPath?: Array<string>;
  keyField?: string;
  childrenField?: string;
  level?: number;
}) {
  let array = [] as Array<FlatItem>;
  if (Array.isArray(tree)) {
    tree.forEach((item) => {
      const newKeyPath = [...keyPath, item[keyField]];
      if (hasChild(item[childrenField])) {
        array.push({
          ...item,
          key: item[keyField],
          children: item[childrenField],
          keyPath: newKeyPath,
          level,
          isLeaf: false,
        });
        array = array.concat(
          tree2array({
            tree: item[childrenField],
            keyPath: newKeyPath,
            keyField,
            childrenField,
            level: level + 1,
          }),
        );
      } else {
        array.push({
          ...item,
          key: item[keyField],
          children: item[childrenField],
          keyPath: newKeyPath,
          level,
          isLeaf: true,
        });
      }
    });
  } else {
    array = array.concat(
      tree2array({
        tree: [tree],
        keyPath,
        keyField,
        childrenField,
        level: level + 1,
      }),
    );
  }
  return array;
}
