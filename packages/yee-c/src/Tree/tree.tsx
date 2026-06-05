import clsx from 'clsx';
import React, {
  ChangeEvent,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { TreeProps } from './interface';
import TreeNode from './tree-node';
import { getCheckedKeys, tree2array } from './utils/tree-tools';

import './style/index.less';

const DEFAULTFIELDNAMES = {
  key: 'key' as const,
  label: 'label' as const,
  children: 'children' as const,
};

export const TreeContext = createContext<{
  prefixCls?: string;
  checkable?: boolean;
  showIcon: boolean;
  icon?: React.ReactNode | ((props: any) => React.ReactNode);
  showLine?: boolean;
  switcherIcon?: [React.ReactNode, React.ReactNode];
  selectedKeys: Array<string | number>;
  checkedKeys: Array<string | number>;
  expandedKeys: Array<string | number>;
  onCheck: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect: (key: string | number) => void;
  onExpand: (key: string | number) => void;
}>({
  showIcon: true,
  selectedKeys: [],
  checkedKeys: [],
  expandedKeys: [],
  onCheck: () => {},
  onSelect: () => {},
  onExpand: () => {},
});

const Tree = <T extends Record<string, unknown> = any>(
  baseprops: TreeProps<T>,
) => {
  const { tree } = useContext(GlobalContext);
  // @ts-expect-error - tree context type may not match TreeProps<T> exactly, mergeContextToProps handles this
  const props = mergeContextToProps(baseprops, tree);

  const {
    prefixCls = 'yee-tree',
    className,
    style,
    dataSource,
    fieldNames = DEFAULTFIELDNAMES as any,
    defaultExpandAll = true,
    expandedKeys,
    defaultExpandedKeys,
    selectedKeys,
    defaultSelectedKeys,
    checkedKeys,
    defaultCheckedKeys,
    checkable,
    multiple = false,
    showIcon = true,
    icon,
    showLine,
    switcherIcon,
    onSelect,
    onCheck,
    onExpand,
  } = props;

  const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState<
    Array<string | number>
  >([], {
    value: selectedKeys,
    defaultValue: defaultSelectedKeys,
  });

  const [mergedCheckedKeys, setMergedCheckedKeys] = useMergedState<
    Array<string | number>
  >([], {
    value: checkedKeys,
    defaultValue: defaultCheckedKeys,
  });

  const [flatItems, itemMap] = useMemo(
    () => tree2array(dataSource ?? [], fieldNames),
    [dataSource, fieldNames],
  );
  const allParentKeys = useMemo(() => {
    const keys = [] as Array<string | number>;
    flatItems.forEach((item) => {
      if (!item.isLeaf) {
        keys.push(item.key);
      }
    });
    return keys;
  }, [flatItems]);

  const [mergedExpandedKeys, setMergedExpandedKeys] = useMergedState<
    Array<string | number>
  >(
    () => {
      return defaultExpandAll ? allParentKeys : [];
    },
    {
      value: expandedKeys,
      defaultValue: defaultExpandedKeys,
    },
  );

  const handleCheck = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const key = event.target.value;
      const checked = event.target.checked;
      const treeNode = itemMap.get(key);

      const newKeys = getCheckedKeys({
        checked,
        keys: mergedCheckedKeys,
        key: key,
        map: itemMap,
      });

      const nodes = newKeys
        .map((key) => itemMap.get(key as string)?.original)
        .filter((node): node is T => node !== undefined);

      setMergedCheckedKeys(newKeys);

      const originalNode = treeNode?.original;
      if (originalNode) {
        onCheck?.(newKeys, {
          checked,
          checkedNodes: nodes,
          node: originalNode,
        });
      }
    },
    [mergedCheckedKeys, itemMap, onCheck],
  );

  const handleSelect = useCallback(
    (key: string | number) => {
      const selected = mergedSelectedKeys.includes(key);
      const newKeys = multiple
        ? selected
          ? [...mergedSelectedKeys.filter((k) => k !== key)]
          : [...mergedSelectedKeys, key]
        : selected
          ? []
          : [key];

      setMergedSelectedKeys(newKeys);

      const nodes = newKeys
        .map((k) => itemMap.get(k as string)?.original)
        .filter((node): node is T => node !== undefined);
      const treeNode = itemMap.get(key as string);
      const originalNode = treeNode?.original;

      if (originalNode) {
        onSelect?.(newKeys, {
          selected: !selected,
          selectedNodes: nodes,
          node: originalNode,
        });
      }
    },
    [mergedSelectedKeys, itemMap, multiple, onSelect],
  );

  const handleExpand = useCallback(
    (key: string | number) => {
      const expanded = mergedExpandedKeys.includes(key);
      const newKeys = expanded
        ? [...mergedExpandedKeys.filter((k) => k !== key)]
        : [...mergedExpandedKeys, key];

      setMergedExpandedKeys(newKeys);

      const nodes = newKeys
        .map((k) => itemMap.get(k as string)?.original)
        .filter((node): node is T => node !== undefined);

      onExpand?.(newKeys, {
        expanded: !expanded,
        expandedNodes: nodes,
        node: nodes,
      });
    },
    [mergedExpandedKeys, itemMap, onExpand],
  );

  return (
    <div className={clsx(prefixCls, className)} style={style}>
      <TreeContext.Provider
        value={{
          prefixCls,
          checkable,
          showIcon,
          icon,
          showLine,
          switcherIcon,
          selectedKeys: mergedSelectedKeys,
          checkedKeys: mergedCheckedKeys,
          expandedKeys: mergedExpandedKeys,
          onCheck: handleCheck,
          onSelect: handleSelect,
          onExpand: handleExpand,
        }}
      >
        {flatItems.map((node, index) => (
          <TreeNode node={node} key={node.key || index} />
        ))}
      </TreeContext.Provider>
    </div>
  );
};

export default Tree;
