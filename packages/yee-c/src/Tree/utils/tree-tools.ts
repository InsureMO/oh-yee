import { TreeNode } from '../interface';

export type DragPosition = 'before' | 'after' | 'inside';

export interface MoveInfo {
  dragKey: string | number;
  dropKey: string | number;
  position: DragPosition;
  /**
   * Full key path from root to the dragged node (inclusive).
   * When provided, enables precise matching even with non-unique keys.
   * Example: ['root', 'parent', 'child']
   */
  dragPath?: Array<string | number>;
  /**
   * Full key path from root to the drop target node (inclusive).
   * When provided, enables precise matching even with non-unique keys.
   */
  dropPath?: Array<string | number>;
}

/**
 * Reorder the nested dataSource immutably after a drag.
 *
 * Two phases: detach the dragged subtree, then insert it at the drop target.
 * Only the modified path gets new arrays + shallow-cloned wrappers; untouched
 * nodes are reused by reference (data may carry non-cloneable values like
 * React elements / functions in `icon`).
 *
 * When `dragPath` / `dropPath` are provided in `info`, matching is done by
 * walking the exact path (supports non-unique keys). Otherwise falls back to
 * first-match by key (backward compatible).
 *
 * Returns a brand-new root array; returns the input unchanged if dragKey is
 * not found or drag and drop resolve to the same location.
 */
export function moveTreeNode<T extends Record<string, unknown>>(
  tree: T | T[],
  info: MoveInfo,
  fieldNames: { key: keyof T; children: keyof T },
): T[] {
  if (!tree || (Array.isArray(tree) && tree.length === 0)) return [];

  const { key: K, children: C } = fieldNames;
  const { dragKey, dropKey, position, dragPath, dropPath } = info;
  const root = Array.isArray(tree) ? tree : [tree];

  /**
   * Match a node: when a path is provided, match by comparing node key against
   * the expected key at the current depth; otherwise match by key equality.
   */
  const matchNode = (
    node: T,
    targetKey: string | number,
    path: Array<string | number> | undefined,
    depth: number,
  ): boolean => {
    if (path) {
      return String(node[K]) === String(path[depth]);
    }
    return node[K] === targetKey;
  };

  const isTargetDepth = (
    path: Array<string | number> | undefined,
    depth: number,
  ): boolean => {
    if (!path) return true; // no path constraint, match at any depth
    return depth === path.length - 1;
  };

  // Phase 1: detach the drag node subtree (immutably).
  const detach = (
    nodes: T[],
    depth: number,
  ): { found: T | null; nodes: T[] } => {
    let found: T | null = null;
    const next: T[] = [];
    for (const n of nodes) {
      if (
        !found &&
        matchNode(n, dragKey, dragPath, depth) &&
        isTargetDepth(dragPath, depth)
      ) {
        found = n;
        continue;
      }
      const kids = n[C] as T[] | undefined;
      if (
        !found &&
        dragPath &&
        Array.isArray(kids) &&
        !matchNode(n, dragKey, dragPath, depth)
      ) {
        // A path lets us skip branches that cannot contain the drag node.
        next.push(n);
      } else if (!found && Array.isArray(kids)) {
        // On the drag path (or no path constraint), recurse
        const r = detach(kids, depth + 1);
        if (r.found) {
          found = r.found;
          next.push({ ...n, [C]: r.nodes });
        } else {
          next.push(n);
        }
      } else {
        next.push(n);
      }
    }
    return { found, nodes: next };
  };

  const { found: dragNode, nodes: withoutDrag } = detach(root, 0);
  if (!dragNode) return root;

  // Phase 2: insert per position.
  const insert = (
    nodes: T[],
    depth: number,
  ): { inserted: boolean; nodes: T[] } => {
    const next: T[] = [];
    let inserted = false;
    for (const n of nodes) {
      const isTarget =
        !inserted &&
        matchNode(n, dropKey, dropPath, depth) &&
        isTargetDepth(dropPath, depth);

      if (isTarget && position === 'inside') {
        const oldKids = (Array.isArray(n[C]) ? n[C] : []) as T[];
        next.push({ ...n, [C]: [...oldKids, dragNode] });
        inserted = true;
        continue;
      }
      if (isTarget && position === 'before') {
        next.push(dragNode, n);
        inserted = true;
        continue;
      }
      if (isTarget && position === 'after') {
        next.push(n, dragNode);
        inserted = true;
        continue;
      }
      const kids = n[C] as T[] | undefined;
      if (inserted || !Array.isArray(kids)) {
        next.push(n);
      } else if (dropPath && !matchNode(n, dropKey, dropPath, depth)) {
        // Not on the drop path at this level, skip recursion
        next.push(n);
      } else {
        const r = insert(kids, depth + 1);
        if (r.inserted) {
          next.push({ ...n, [C]: r.nodes });
          inserted = true;
        } else {
          next.push(n);
        }
      }
    }
    return { inserted, nodes: next };
  };

  const { inserted, nodes: result } = insert(withoutDrag, 0);
  return inserted ? result : root;
}

/**
 * Flatten tree into a flat array with rich metadata.
 *
 * Key design decisions:
 * - Uses `uid` (built from the key path) as the internal identifier, because
 *   user-provided `key` values may NOT be globally unique across the tree.
 * - The returned Map is keyed by `uid` for O(1) lookups.
 * - `childUids` is collected bottom-up in a single pass (O(n) total) instead
 *   of per-node recursive enumeration (which was O(n²)).
 */
export function tree2array<T extends Record<string, unknown>>(
  tree: T | T[],
  fieldNames: {
    key: keyof T;
    label: keyof T;
    children: keyof T;
  },
): [TreeNode<T>[], Map<string, TreeNode<T>>] {
  if (!tree || (Array.isArray(tree) && tree.length === 0))
    return [[], new Map()];

  const data = Array.isArray(tree) ? tree : [tree];
  const res: TreeNode<T>[] = [];
  const map = new Map<string, TreeNode<T>>();

  const { key, label, children } = fieldNames;

  /**
   * Walk returns the list of descendant uids so the parent can collect them
   * without a second traversal.
   * Pushes nodes in PRE-ORDER (parent before children) so that visibleItems
   * filtering can work in a single forward pass.
   */
  function walk({
    data: node,
    pUid,
    depth,
    path,
    isLast,
    lines,
  }: {
    data: T;
    pUid: string | null;
    depth: number;
    path: Array<string | number>;
    isLast: boolean;
    lines: number[];
  }): string[] {
    const rawKey = node[key] as string | number;
    const _label = node[label];
    const _children = node[children] as T[] | undefined;
    const nextPath = [...path, rawKey];
    const uid = pUid ? `${pUid}\x00${String(rawKey)}` : String(rawKey);

    const isParent = Array.isArray(_children) && _children.length > 0;

    // Push parent FIRST (pre-order) so visibleItems can rely on forward scan
    const wrapperData: TreeNode<T> = {
      uid,
      key: rawKey,
      label: _label as string,
      title: node.title as string | undefined,
      path,
      pUid,
      depth,
      isLeaf: !isParent,
      isLast,
      lines,
      disabled: node.disabled as boolean | undefined,
      icon: node.icon as React.ReactNode | (() => React.ReactNode) | undefined,
      childUids: undefined, // will be filled after recursion
      original: node,
    };

    res.push(wrapperData);
    map.set(uid, wrapperData);

    // Recurse children to collect their uids bottom-up
    const childTotal = isParent ? _children!.length : 0;
    const allDescendantUids: string[] = [];

    if (isParent) {
      _children!.forEach((child, index) => {
        const childIsLast = index + 1 === childTotal;
        const descendantUids = walk({
          data: child,
          pUid: uid,
          depth: depth + 1,
          path: nextPath,
          isLast: childIsLast,
          lines: isLast ? lines : [...lines, depth],
        });
        allDescendantUids.push(...descendantUids);
      });
    }

    // Now fill in childUids
    if (allDescendantUids.length > 0) {
      wrapperData.childUids = allDescendantUids;
    }

    // Return this uid + all descendant uids to the caller
    return [uid, ...allDescendantUids];
  }

  const rootTotal = data.length;
  data.forEach((node, index) => {
    walk({
      data: node,
      pUid: null,
      depth: 0,
      path: [],
      isLast: index + 1 === rootTotal,
      lines: index + 1 === rootTotal ? [] : [0],
    });
  });

  return [res, map];
}

/**
 * Check whether array `a` contains every element in `b`.
 */
export function containsAll<T>(a: Set<T>, b: Array<T>): boolean {
  if (!b || b.length === 0) return true;
  return b.every((i) => a.has(i));
}

/**
 * Remove all elements in `b` from `a`.
 */
export function removeAll<T>(a: Set<T>, b: Array<T>): Set<T> {
  const result = new Set<T>();
  a.forEach((item) => result.add(item));
  for (const item of b) {
    result.delete(item);
  }
  return result;
}

/**
 * Compute new checked uids when a node is toggled.
 * Uses Set-based operations for O(1) membership checks.
 * Disabled nodes are NOT affected by parent/child propagation — their checked
 * state remains unchanged unless they are the directly toggled node.
 */
export function getCheckedKeys({
  checked,
  keys,
  uid,
  map,
}: {
  checked: boolean;
  keys: Set<string>;
  uid: string;
  map: Map<string, TreeNode<unknown>>;
}): Set<string> {
  const item = map.get(uid);
  if (!item) return keys;

  const childUids = item.childUids || [];
  const newKeys = new Set<string>();
  keys.forEach((k) => newKeys.add(k));

  if (checked) {
    // Add this node + non-disabled descendants
    newKeys.add(uid);
    for (const cuid of childUids) {
      const child = map.get(cuid);
      if (child && !child.disabled) {
        newKeys.add(cuid);
      }
    }

    // Walk up: if all non-disabled children of an ancestor are checked, check the ancestor
    let pUid = item.pUid;
    while (pUid) {
      const parent = map.get(pUid);
      if (parent) {
        if (parent.disabled) {
          // Stop propagation at disabled ancestors
          break;
        }
        if (!newKeys.has(parent.uid) && parent.childUids) {
          // Check if all non-disabled children are checked
          const allNonDisabledChecked = parent.childUids.every((cuid) => {
            const child = map.get(cuid);
            return (child && child.disabled) || newKeys.has(cuid);
          });
          if (allNonDisabledChecked) {
            newKeys.add(parent.uid);
          }
        }
        pUid = parent.pUid;
      } else {
        pUid = null;
      }
    }
  } else {
    // Remove this node + non-disabled descendants
    newKeys.delete(uid);
    for (const cuid of childUids) {
      const child = map.get(cuid);
      if (child && !child.disabled) {
        newKeys.delete(cuid);
      }
    }

    // Walk up: uncheck non-disabled ancestors
    let pUid = item.pUid;
    while (pUid) {
      const parent = map.get(pUid);
      if (parent) {
        if (parent.disabled) {
          break;
        }
        newKeys.delete(parent.uid);
        pUid = parent.pUid;
      } else {
        pUid = null;
      }
    }
  }

  return newKeys;
}
