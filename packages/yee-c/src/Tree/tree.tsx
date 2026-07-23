import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import React, {
  ChangeEvent,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GlobalContext } from '../Config-Provider';
import useEvent from '../hooks/useEvent';
import useMergedState from '../hooks/useMergedState';
import useVirtualList from '../hooks/useVirtualList';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { DragPosition, TreeNode, TreeProps } from './interface';
import TreeNodeComp from './tree-node';
import { getCheckedKeys, tree2array } from './utils/tree-tools';

import './style/index.less';

const DEFAULTFIELDNAMES = {
  key: 'key' as const,
  label: 'label' as const,
  children: 'children' as const,
};

type DropState = { uid: string; position: DragPosition } | null;

export const TreeContext = createContext<{
  prefixCls?: string;
  checkable?: boolean;
  showIcon: boolean;
  icon?: React.ReactNode | ((props: any) => React.ReactNode);
  showLine?: boolean;
  switcherIcon?: [React.ReactNode, React.ReactNode];
  selectedUids: Set<string>;
  checkedUids: Set<string>;
  indeterminateUids: Set<string>;
  expandedUids: Set<string>;
  draggable?: boolean;
  draggingUid: string | null;
  dropState: DropState;
  onCheck: (event: ChangeEvent<HTMLInputElement>, uid: string) => void;
  onSelect: (uid: string) => void;
  onExpand: (uid: string) => void;
  onNodeDragStart: (uid: string, e: React.DragEvent) => void;
  onNodeDragOver: (uid: string, e: React.DragEvent) => void;
  onNodeDragLeave: (uid: string, e: React.DragEvent) => void;
  onNodeDrop: (uid: string, e: React.DragEvent) => void;
}>({
  showIcon: true,
  selectedUids: new Set(),
  checkedUids: new Set(),
  indeterminateUids: new Set(),
  expandedUids: new Set(),
  draggable: false,
  draggingUid: null,
  dropState: null,
  onCheck: () => {},
  onSelect: () => {},
  onExpand: () => {},
  onNodeDragStart: () => {},
  onNodeDragOver: () => {},
  onNodeDragLeave: () => {},
  onNodeDrop: () => {},
});

// ---------------------------------------------------------------------------
// Helpers: convert between external user keys and internal uids
// ---------------------------------------------------------------------------

const EMPTY_ARRAY: string[] = [];

/**
 * Given a list of user-provided keys, find matching uids.
 * A key may match multiple nodes (non-unique keys), so we return all matches.
 * Returns an array of uid strings (for use with useMergedState).
 */
function keysToUidArray(
  keys: Array<string | number> | undefined,
  flatItems: TreeNode<any>[],
): string[] | undefined {
  if (!keys) return undefined;
  if (keys.length === 0) return EMPTY_ARRAY;
  const keySet = new Set(keys.map(String));
  const uids: string[] = [];
  for (const item of flatItems) {
    if (keySet.has(String(item.key))) {
      uids.push(item.uid);
    }
  }
  return uids;
}

/**
 * Hook that memoizes a uid array derived from external keys.
 * Only returns a new reference when the actual uid content changes.
 * This prevents useMergedState from seeing a "new value" every render.
 */
function useStableUidArray(
  keys: Array<string | number> | undefined,
  flatItems: TreeNode<any>[],
): string[] | undefined {
  const ref = useRef<{
    keys: Array<string | number> | undefined;
    result: string[] | undefined;
  }>({
    keys: undefined,
    result: undefined,
  });

  // Only recompute if external keys reference or flatItems changed
  const computed = useMemo(
    () => keysToUidArray(keys, flatItems),
    [keys, flatItems],
  );

  // Stable reference: reuse previous if content is identical
  if (computed === undefined) {
    ref.current = { keys, result: undefined };
    return undefined;
  }

  const prev = ref.current.result;
  if (
    prev &&
    prev.length === computed.length &&
    prev.every((v, i) => v === computed[i])
  ) {
    return prev;
  }

  ref.current = { keys, result: computed };
  return computed;
}

/**
 * Convert an array of uids to user keys (for external callbacks).
 */
function uidsToKeys(
  uids: string[],
  map: Map<string, TreeNode<any>>,
): Array<string | number> {
  const keys: Array<string | number> = [];
  for (const uid of uids) {
    const node = map.get(uid);
    if (node) keys.push(node.key);
  }
  return keys;
}

/** Build a Set from an array (avoids downlevelIteration issues with Set constructor). */
function arrayToSet(arr: string[]): Set<string> {
  const s = new Set<string>();
  for (const item of arr) {
    s.add(item);
  }
  return s;
}

/** Convert a Set to an array (avoids spread/iteration issues). */
function setToArray(s: Set<string>): string[] {
  const arr: string[] = [];
  s.forEach((v) => arr.push(v));
  return arr;
}

// ---------------------------------------------------------------------------
// Tree Component
// ---------------------------------------------------------------------------

const Tree = <T extends Record<string, unknown> = any>(
  baseprops: TreeProps<T>,
) => {
  const { tree } = useContext(GlobalContext);
  // @ts-expect-error - tree context type may not match TreeProps<T> exactly
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
    virtual = false,
    height,
    itemHeight = 28,
  } = props;

  // ======================== Data ========================
  const [flatItems, itemMap] = useMemo(
    () => tree2array(dataSource ?? [], fieldNames),
    [dataSource, fieldNames],
  );

  // All parent uids (for defaultExpandAll)
  const allParentUidArray = useMemo(() => {
    const uids: string[] = [];
    for (const item of flatItems) {
      if (!item.isLeaf) uids.push(item.uid);
    }
    return uids;
  }, [flatItems]);

  // ==================== State (array-based for useMergedState compatibility) ====================
  // useMergedState works with arrays (serializable, isEqual-friendly).
  // We derive Sets via useMemo for O(1) lookups in render/handlers.
  // useStableUidArray ensures stable references to prevent infinite re-render loops.

  const stableExpandedValue = useStableUidArray(expandedKeys, flatItems);
  const stableExpandedDefault = useStableUidArray(
    defaultExpandedKeys,
    flatItems,
  );
  const stableSelectedValue = useStableUidArray(selectedKeys, flatItems);
  const stableSelectedDefault = useStableUidArray(
    defaultSelectedKeys,
    flatItems,
  );
  const stableCheckedValue = useStableUidArray(checkedKeys, flatItems);
  const stableCheckedDefault = useStableUidArray(defaultCheckedKeys, flatItems);

  // --- Expanded ---
  const [expandedUidArray, setExpandedUidArray] = useMergedState<string[]>(
    () => (defaultExpandAll ? allParentUidArray : []),
    {
      value: stableExpandedValue,
      defaultValue: stableExpandedDefault,
    },
  );
  const expandedUidSet = useMemo(
    () => arrayToSet(expandedUidArray),
    [expandedUidArray],
  );

  // --- Selected ---
  const [selectedUidArray, setSelectedUidArray] = useMergedState<string[]>([], {
    value: stableSelectedValue,
    defaultValue: stableSelectedDefault,
  });
  const selectedUidSet = useMemo(
    () => arrayToSet(selectedUidArray),
    [selectedUidArray],
  );

  // --- Checked ---
  const [checkedUidArray, setCheckedUidArray] = useMergedState<string[]>([], {
    value: stableCheckedValue,
    defaultValue: stableCheckedDefault,
  });
  const checkedUidSet = useMemo(
    () => arrayToSet(checkedUidArray),
    [checkedUidArray],
  );

  // --- Indeterminate (half-select) ---
  // A non-leaf node is indeterminate if:
  //   - It is NOT itself checked
  //   - At least one of its descendants IS checked
  const indeterminateUidSet = useMemo(() => {
    const result = new Set<string>();
    for (const item of flatItems) {
      if (
        !item.isLeaf &&
        !checkedUidSet.has(item.uid) &&
        item.childUids &&
        item.childUids.some((cuid) => checkedUidSet.has(cuid))
      ) {
        result.add(item.uid);
      }
    }
    return result;
  }, [flatItems, checkedUidSet]);

  // ==================== Visible Items ====================
  // A node is visible if it's a root OR its parent is both visible and expanded.
  // flatItems is in pre-order so we can compute in a single forward pass.
  const visibleItems = useMemo(() => {
    const visibleSet = new Set<string>();
    const result: TreeNode<T>[] = [];

    for (const item of flatItems) {
      if (item.depth === 0) {
        visibleSet.add(item.uid);
        result.push(item);
      } else if (
        item.pUid &&
        visibleSet.has(item.pUid) &&
        expandedUidSet.has(item.pUid)
      ) {
        visibleSet.add(item.uid);
        result.push(item);
      }
    }

    return result;
  }, [flatItems, expandedUidSet]);

  // ==================== Handlers ====================
  // All handlers use useEvent for stable references — they always read
  // the latest state via closure without being listed as deps.

  const handleCheck = useEvent(
    (event: ChangeEvent<HTMLInputElement>, uid: string) => {
      const checked = event.target.checked;
      const treeNode = itemMap.get(uid);

      const newUidSet = getCheckedKeys({
        checked,
        keys: checkedUidSet,
        uid,
        map: itemMap as Map<string, TreeNode<unknown>>,
      });

      const newUidArr = setToArray(newUidSet);
      setCheckedUidArray(newUidArr);

      if (treeNode && onCheck) {
        const externalKeys = uidsToKeys(newUidArr, itemMap);
        const nodes: T[] = [];
        newUidSet.forEach((u) => {
          const n = itemMap.get(u)?.original;
          if (n) nodes.push(n);
        });
        onCheck(externalKeys, {
          checked,
          checkedNodes: nodes,
          node: treeNode.original,
        });
      }
    },
  );

  const handleSelect = useEvent((uid: string) => {
    const selected = selectedUidSet.has(uid);
    let newUidArr: string[];

    if (multiple) {
      if (selected) {
        newUidArr = selectedUidArray.filter((u) => u !== uid);
      } else {
        newUidArr = [...selectedUidArray, uid];
      }
    } else {
      newUidArr = selected ? [] : [uid];
    }

    setSelectedUidArray(newUidArr);

    const treeNode = itemMap.get(uid);
    if (treeNode && onSelect) {
      const externalKeys = uidsToKeys(newUidArr, itemMap);
      const nodes: T[] = [];
      for (const u of newUidArr) {
        const n = itemMap.get(u)?.original;
        if (n) nodes.push(n);
      }
      onSelect(externalKeys, {
        selected: !selected,
        selectedNodes: nodes,
        node: treeNode.original,
      });
    }
  });

  const handleExpand = useEvent((uid: string) => {
    const expanded = expandedUidSet.has(uid);
    const newUidArr = expanded
      ? expandedUidArray.filter((u) => u !== uid)
      : [...expandedUidArray, uid];

    setExpandedUidArray(newUidArr);

    if (onExpand) {
      const externalKeys = uidsToKeys(newUidArr, itemMap);
      const treeNode = itemMap.get(uid);
      const nodes: T[] = [];
      for (const u of newUidArr) {
        const n = itemMap.get(u)?.original;
        if (n) nodes.push(n);
      }
      onExpand(externalKeys, {
        expanded: !expanded,
        expandedNodes: nodes,
        node: treeNode!.original,
      });
    }
  });

  // --- Drag & Drop ---
  const dragUidRef = useRef<string | null>(null);
  const [draggingUid, setDraggingUid] = useState<string | null>(null);
  const [dropState, setDropState] = useState<DropState>(null);

  const resolvePosition = (rect: DOMRect, clientY: number): DragPosition => {
    const offset = (clientY - rect.top) / rect.height;
    if (offset < 0.25) return 'before';
    if (offset > 0.75) return 'after';
    return 'inside';
  };

  const isIllegalMove = (dragUid: string, dropUid: string): boolean => {
    if (dragUid === dropUid) return true;
    const dropNode = itemMap.get(dropUid);
    if (!dropNode) return true;
    let current: TreeNode<T> | undefined = dropNode;
    while (current) {
      if (current.pUid === dragUid) return true;
      current = current.pUid ? itemMap.get(current.pUid) : undefined;
    }
    return false;
  };

  const handleDragStart = useEvent((uid: string, e: React.DragEvent) => {
    const node = itemMap.get(uid);
    if (node?.disabled) {
      e.preventDefault();
      return;
    }
    dragUidRef.current = uid;
    setDraggingUid(uid);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      try {
        e.dataTransfer.setData('text/plain', uid);
      } catch {
        /* some browsers throw */
      }
    }
  });

  const handleDragOver = useEvent((uid: string, e: React.DragEvent) => {
    const dragUid = dragUidRef.current;
    if (dragUid === null) return;
    if (isIllegalMove(dragUid, uid)) return;
    const dropNode = itemMap.get(uid);
    if (!dropNode || dropNode.disabled) return;

    const position = resolvePosition(
      (e.currentTarget as HTMLElement).getBoundingClientRect(),
      e.clientY,
    );

    const dragNode = itemMap.get(dragUid);
    if (
      allowDrop &&
      dragNode &&
      allowDrop({
        dragNode: dragNode.original,
        dropNode: dropNode.original,
        position,
      }) === false
    ) {
      return;
    }

    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    setDropState((prev) =>
      prev && prev.uid === uid && prev.position === position
        ? prev
        : { uid, position },
    );
  });

  const handleDragLeave = useEvent(() => {});

  const handleDrop = useEvent((uid: string, e: React.DragEvent) => {
    e.preventDefault();
    const dragUid = dragUidRef.current;
    if (dragUid === null) return;

    const position = resolvePosition(
      (e.currentTarget as HTMLElement).getBoundingClientRect(),
      e.clientY,
    );

    if (isIllegalMove(dragUid, uid)) return;
    const dragNode = itemMap.get(dragUid);
    const dropNode = itemMap.get(uid);
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
      dragKey: dragNode.key,
      dropKey: dropNode.key,
      dragPath: [...dragNode.path, dragNode.key],
      dropPath: [...dropNode.path, dropNode.key],
      position,
      dropToGap: position !== 'inside',
    });

    // Auto-expand the target after a drop-inside
    if (position === 'inside') {
      setExpandedUidArray((prev) => {
        if (prev.includes(uid)) return prev;
        return [...prev, uid];
      });
    }

    dragUidRef.current = null;
    setDraggingUid(null);
    setDropState(null);
  });

  const handleDragEnd = useEvent(() => {
    dragUidRef.current = null;
    setDraggingUid(null);
    setDropState(null);
  });

  // ==================== Context Value (memoized) ====================
  const contextValue = useMemo(
    () => ({
      prefixCls,
      checkable,
      showIcon,
      icon,
      showLine,
      switcherIcon,
      selectedUids: selectedUidSet,
      checkedUids: checkedUidSet,
      indeterminateUids: indeterminateUidSet,
      expandedUids: expandedUidSet,
      draggable,
      draggingUid,
      dropState,
      onCheck: handleCheck,
      onSelect: handleSelect,
      onExpand: handleExpand,
      onNodeDragStart: handleDragStart,
      onNodeDragOver: handleDragOver,
      onNodeDragLeave: handleDragLeave,
      onNodeDrop: handleDrop,
    }),
    [
      prefixCls,
      checkable,
      showIcon,
      icon,
      showLine,
      switcherIcon,
      selectedUidSet,
      checkedUidSet,
      indeterminateUidSet,
      expandedUidSet,
      draggable,
      draggingUid,
      dropState,
      // handlers are stable (useEvent), but listed for correctness
      handleCheck,
      handleSelect,
      handleExpand,
      handleDragStart,
      handleDragOver,
      handleDragLeave,
      handleDrop,
    ],
  );

  // ==================== Virtual Scroll ====================
  const useVirtual = virtual && height !== null && height !== undefined;

  const { start, end, offsetY, totalHeight, viewportRef, onScroll } =
    useVirtualList({
      itemCount: useVirtual ? visibleItems.length : 0,
      itemHeight,
      overscan: 4,
    });

  // ==================== Render ====================
  if (useVirtual) {
    const slicedItems = visibleItems.slice(start, end);
    return (
      <div
        className={clsx(prefixCls, className)}
        style={style}
        onDragEnd={handleDragEnd}
      >
        <TreeContext.Provider value={contextValue}>
          <div
            ref={viewportRef}
            onScroll={onScroll}
            style={{ height, overflowY: 'auto' }}
          >
            <div style={{ height: totalHeight, position: 'relative' }}>
              {slicedItems.map((node, i) => (
                <TreeNodeComp
                  node={node}
                  key={node.uid}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: itemHeight,
                    transform: `translateY(${offsetY + i * itemHeight}px)`,
                  }}
                />
              ))}
            </div>
          </div>
        </TreeContext.Provider>
      </div>
    );
  }

  // ==================== Render (non-virtual) ====================
  // Group consecutive children of the same parent into segments.
  // Each group animates as a single unit (one height measurement) rather than
  // each node individually, drastically reducing layout thrashing.
  type Segment =
    | { type: 'node'; node: TreeNode<T> }
    | { type: 'group'; pUid: string; nodes: TreeNode<T>[] };

  const segments: Segment[] = [];
  let currentGroup: { pUid: string; nodes: TreeNode<T>[] } | null = null;

  for (const node of visibleItems) {
    if (node.depth === 0) {
      // Root nodes are always visible, render directly without animation
      if (currentGroup) {
        segments.push({ type: 'group', ...currentGroup });
        currentGroup = null;
      }
      segments.push({ type: 'node', node });
    } else {
      // Non-root: group consecutive children under the same parent
      if (currentGroup && currentGroup.pUid === node.pUid) {
        currentGroup.nodes.push(node);
      } else {
        if (currentGroup) {
          segments.push({ type: 'group', ...currentGroup });
        }
        currentGroup = { pUid: node.pUid!, nodes: [node] };
      }
    }
  }
  if (currentGroup) {
    segments.push({ type: 'group', ...currentGroup });
  }

  return (
    <div
      className={clsx(prefixCls, className)}
      style={style}
      onDragEnd={handleDragEnd}
    >
      <TreeContext.Provider value={contextValue}>
        <AnimatePresence initial={false}>
          {segments.map((segment) => {
            if (segment.type === 'node') {
              return (
                <TreeNodeComp node={segment.node} key={segment.node.uid} />
              );
            }
            // Keep the wrapper mounted throughout native drag operations.
            // Replacing this tree after dragStart removes the browser's drag
            // source and cancels the drag before dragOver/drop can fire.
            return (
              <motion.div
                key={segment.pUid + '\x01children'}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ overflow: 'hidden' }}
              >
                {segment.nodes.map((node) => (
                  <TreeNodeComp node={node} key={node.uid} />
                ))}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </TreeContext.Provider>
    </div>
  );
};

export default Tree;
