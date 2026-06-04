import { TestTubeDiagonal } from 'lucide-react';
import { TreeNode } from '../interface';

export function getChildKeys<T extends Record<string, unknown>>(
  data: T,
  fieldNames: {
    key: keyof T;
    children: keyof T;
  },
): Array<string | number> {
  const { key, children } = fieldNames;
  const _children = data[children];
  const keys: Array<string | number> = [];
  if (Array.isArray(_children) && _children.length) {
    _children.forEach((node) => {
      keys.push(node[key] as string | number);

      if (Array.isArray(node[children])) {
        keys.push(...getChildKeys(node, fieldNames));
      }
    });
  }
  return keys;
}

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
  const map = new Map();

  const { key, label, children } = fieldNames;

  function walk({data, pKey, depth, path, isLast, lines}: {data: T, pKey: string | null, depth: number, path: string[], isLast: boolean, lines: number[]}) {
    const _key = data[key] as string;
    const _label = data[label];
    const _children = data[children] as T[] | undefined;
    const nextPath = [...path, _key];
    const uid = nextPath.join('_');

    const isParent = !!(
      Array.isArray(_children) &&
      (_children as Array<Record<string, unknown>>).length
    );

    const wrapperData = {
      uid,
      key: _key,
      label: _label,
      path,
      pKey,
      depth,
      isLeaf: !isParent,
      isLast: isLast,
      lines: lines,
      disabled: data.disabled,
      icon: data.icon,
      childKeys: getChildKeys<T>(data, fieldNames),
      original: data,
    } as TreeNode<T>;

    res.push(wrapperData);
    map.set(_key, wrapperData);
    const total = Array.isArray(_children) ? _children.length : 0;
    _children?.forEach((node, index) => walk({ 
      data: node, 
      pKey: _key, 
      depth: depth + 1, 
      path: nextPath, 
      isLast: index + 1 === total, 
      lines: isLast ? lines : [...lines, depth]
    }));
  }

  const total = Array.isArray(data) ? data.length : 0;
  data.forEach((node, index) => walk({
    data: node, 
    pKey: null, 
    depth: 0, 
    path: [], 
    isLast: index + 1 === total,
    lines: index + 1 === total ? [] : [0]
  }));
  return [res, map];
}

export function containsAll<T>(a: Array<T>, b: Array<T>) {
  if (b.length > a.length) {
    return false;
  }
  return b.every((i) => a.includes(i));
}

export function removeContainsAll<T>(a: Array<T>, b: Array<T>) {
  if (!b || b.length === 0) return a;
  const toRemove = new Set(b);
  return a.filter((i) => !toRemove.has(i));
}

export function getCheckedKeys({
  checked,
  keys,
  key,
  map,
}: {
  checked: boolean;
  keys: Array<string | number>;
  key: string | number;
  map: Map<string, TreeNode<unknown>>;
}) {
  let newKeys = [...keys];
  const item = map.get(key as string);
  const childKeys = item?.childKeys || [];
  let pKey = item?.pKey;

  if (checked) {
    newKeys = [...newKeys, ...childKeys, key];

    while (pKey) {
      const parent = map.get(pKey);
      if (parent) {
        if (
          !newKeys.includes(parent.key) &&
          containsAll(newKeys, parent.childKeys as Array<unknown>)
        ) {
          newKeys.push(parent.key);
        }
        pKey = parent.pKey;
      } else {
        pKey = null;
      }
    }
  } else {
    newKeys = newKeys.filter((k) => k !== key);
    newKeys = removeContainsAll(newKeys, childKeys);

    while (pKey) {
      const parent = map.get(pKey);
      if (parent) {
        if (newKeys.includes(parent.key)) {
          newKeys = newKeys.filter((k) => k !== parent.key);
        }
        pKey = parent.pKey;
      } else {
        pKey = null;
      }
    }
  }

  return newKeys;
}
