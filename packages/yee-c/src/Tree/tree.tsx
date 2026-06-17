import clsx from 'clsx';
import React, {
  ChangeEvent,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { DragPosition, TreeProps } from './interface';
import TreeNode from './tree-node';
import { getCheckedKeys, tree2array } from './utils/tree-tools';

import './style/index.less';

const DEFAULTFIELDNAMES = {
  key: 'key' as const,
  label: 'label' as const,
  children: 'children' as const,
};

type DropState = { key: string | number; position: DragPosition } | null;

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
  draggable?: boolean;
  draggingKey: string | number | null;
  dropState: DropState;
  onCheck: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect: (key: string | number) => void;
  onExpand: (key: string | number) => void;
  onNodeDragStart: (key: string | number, e: React.DragEvent) => void;
  onNodeDragOver: (key: string | number, e: React.DragEvent) => void;
  onNodeDragLeave: (key: string | number, e: React.DragEvent) => void;
  onNodeDrop: (key: string | number, e: React.DragEvent) => void;
}>({
  showIcon: true,
  selectedKeys: [],
  checkedKeys: [],
  expandedKeys: [],
  draggable: false,
  draggingKey: null,
  dropState: null,
  onCheck: () => {},
  onSelect: () => {},
  onExpand: () => {},
  onNodeDragStart: () => {},
  onNodeDragOver: () => {},
  onNodeDragLeave: () => {},
  onNodeDrop: () => {},
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
    draggable,
    allowDrop,
    onDrop,
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

  // --- drag & drop (native HTML5) ---
  // dataTransfer is not reliably readable during dragover, so the drag key
  // lives in a ref as the source of truth; a state mirrors it for styling.
  const dragKeyRef = useRef<string | number | null>(null);
  const [draggingKey, setDraggingKey] = useState<string | number | null>(null);
  const [dropState, setDropState] = useState<DropState>(null);

  // A drop is a cycle/illegal if the target is the dragged node itself or one
  // of its descendants. Covers before/after/inside uniformly.
  const isIllegalMove = useCallback(
    (dragKey: string | number, dropKey: string | number) => {
      if (dragKey === dropKey) return true;
      const dropNode = itemMap.get(dropKey as string);
      return !!dropNode && dropNode.path.includes(dragKey as string);
    },
    [itemMap],
  );

  const resolvePosition = useCallback(
    (rect: DOMRect, clientY: number): DragPosition => {
      const offset = (clientY - rect.top) / rect.height;
      if (offset < 0.25) return 'before';
      if (offset > 0.75) return 'after';
      return 'inside';
    },
    [],
  );

  const handleDragStart = useCallback(
    (key: string | number, e: React.DragEvent) => {
      const node = itemMap.get(key as string);
      if (node?.disabled) {
        e.preventDefault();
        return;
      }
      dragKeyRef.current = key;
      setDraggingKey(key);
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        try {
          e.dataTransfer.setData('text/plain', String(key));
        } catch {
          /* some browsers throw on setData in certain modes */
        }
      }
    },
    [itemMap],
  );

  const handleDragOver = useCallback(
    (key: string | number, e: React.DragEvent) => {
      const dragKey = dragKeyRef.current;
      if (dragKey === null) return;
      if (isIllegalMove(dragKey, key)) return;
      const dropNode = itemMap.get(key as string);
      if (!dropNode || dropNode.disabled) return;

      const position = resolvePosition(
        (e.currentTarget as HTMLElement).getBoundingClientRect(),
        e.clientY,
      );

      const dragNode = itemMap.get(dragKey as string);
      if (
        allowDrop &&
        dragNode &&
        allowDrop({
          dragNode: dragNode.original,
          dropNode: dropNode.original,
          position,
        }) === false
      ) {
        return; // not calling preventDefault shows the "no-drop" cursor
      }

      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
      setDropState((prev) =>
        prev && prev.key === key && prev.position === position
          ? prev
          : { key, position },
      );
    },
    [itemMap, isIllegalMove, resolvePosition, allowDrop],
  );

  const handleDragLeave = useCallback(
    // Intentionally a no-op: dragleave fires spuriously when crossing child
    // elements. Drop state is cleared in handleDragEnd at the Tree root.
    () => {},
    [],
  );

  const handleDrop = useCallback(
    (key: string | number, e: React.DragEvent) => {
      e.preventDefault();
      const dragKey = dragKeyRef.current;
      if (dragKey === null) return;

      const position = resolvePosition(
        (e.currentTarget as HTMLElement).getBoundingClientRect(),
        e.clientY,
      );

      if (isIllegalMove(dragKey, key)) return;
      const dragNode = itemMap.get(dragKey as string);
      const dropNode = itemMap.get(key as string);
      if (!dragNode || !dropNode) return;
      if (
        allowDrop &&
        allowDrop({
          dragNode: dragNode.original,
          dropNode: dropNode.original,
          position,
        }) === false
      ) {
        return;
      }

      onDrop?.({
        dragNode: dragNode.original,
        dropNode: dropNode.original,
        dragKey,
        dropKey: key,
        position,
        dropToGap: position !== 'inside',
      });

      // Auto-expand the target after a drop-inside so the dragged node is
      // visible. Only effective in uncontrolled expandedKeys mode.
      if (position === 'inside') {
        setMergedExpandedKeys((prev) =>
          prev.includes(key) ? prev : [...prev, key],
        );
      }

      dragKeyRef.current = null;
      setDraggingKey(null);
      setDropState(null);
    },
    [itemMap, isIllegalMove, resolvePosition, allowDrop, onDrop],
  );

  const handleDragEnd = useCallback(() => {
    dragKeyRef.current = null;
    setDraggingKey(null);
    setDropState(null);
  }, []);

  return (
    <div
      className={clsx(prefixCls, className)}
      style={style}
      onDragEnd={handleDragEnd}
    >
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
          draggable,
          draggingKey,
          dropState,
          onCheck: handleCheck,
          onSelect: handleSelect,
          onExpand: handleExpand,
          onNodeDragStart: handleDragStart,
          onNodeDragOver: handleDragOver,
          onNodeDragLeave: handleDragLeave,
          onNodeDrop: handleDrop,
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
