import { FieldNames, FlattenOption, Option } from '../interface';

/**
 * Check if a data object has children
 * @param data - The data object to check
 * @param childrenField - The field name for children (default: 'children')
 * @returns true if the data has non-empty children array
 */
export function hasChild(
  data: Record<string, any>,
  childrenField = 'children',
) {
  return (
    data && Array.isArray(data[childrenField]) && data[childrenField].length
  );
}

/**
 * Separator used to build a node's `uid` from its value path. A control
 * character is used on purpose so it can never appear inside a user value —
 * this prevents collisions like value `"a-1"` vs path `["a", "1"]` that a plain
 * `'-'` separator would produce.
 */
export const UID_SEP = '';

/**
 * Build the canonical uid for a value path. Use this everywhere a path needs
 * to be turned into a key (nodeMap lookups, selected keys, comparisons) so the
 * format stays consistent with the `uid`/`pid` produced by `flattenOptions`.
 * @param path - The value path
 */
export const pathToUid = (path: Array<string | number>): string =>
  path.map(String).join(UID_SEP);

/**
 * Get the direct flattened children of the node identified by `uid`.
 *
 * Flattened nodes intentionally do not carry a `children` reference (it used to
 * point at the raw, un-flattened subtree and caused type lies). Derive children
 * from the flat list via `pid` instead — single source of truth.
 * @param data - The flattened options data
 * @param uid - The parent node's uid
 */
export const getChildren = (
  data: Array<FlattenOption>,
  uid: string,
): FlattenOption[] => data.filter((item) => item.pid === uid);

/**
 * Find the node in `data` whose parent is `pid` and whose value is `value`.
 * @internal
 */
const findInColumn = (
  data: Array<FlattenOption>,
  pid: string,
  value: string | number,
): FlattenOption | undefined =>
  data.find((item) => item.pid === pid && item.value === value);

/**
 * Reconstruct cascade columns and the highlight path from a value path.
 *
 * Walks the flattened options level by level, matching each value segment
 * against the correct parent column via `pid` + `value`. Returns:
 *  - `queue`: the columns to render (column 0 = root, then each matched
 *    node's children column).
 *  - `path`: the highlight breadcrumb shaped as `{ key: uid, label }`, so it
 *    aligns with `expandedPath[level].key === uid` in the node view.
 *
 * Stops safely at the last valid segment if the value path does not exist in
 * the data source.
 *
 * @param arr - The selected path. In `multiple` mode the value is an array of
 *   paths; the first path is used to drive which columns get expanded.
 * @param data - The flattened options data
 * @param options - Optional configuration
 * @returns A tuple of `[queue, path]`
 */
export const changeToView = (
  arr: Array<string | number> | Array<Array<string | number>>,
  data: Array<FlattenOption>,
  options?: {
    multiple?: boolean;
  },
): [FlattenOption[][], Array<{ key: string; label: string }>] => {
  const { multiple } = options || {};
  const queue: FlattenOption[][] = [];
  const path: Array<{ key: string; label: string }> = [];

  // Column 0 (root level) is always present so the popup can open even with
  // no selection.
  queue.push(data.filter((item) => item.level === 0));

  if (!Array.isArray(arr) || arr.length === 0) {
    return [queue, path];
  }

  // In multiple mode the value is an array of paths; use the first one to
  // drive column expansion.
  const segments: Array<string | number> =
    multiple && Array.isArray(arr[0])
      ? (arr[0] as Array<string | number>)
      : (arr as Array<string | number>);

  let currentPid = '';
  for (let i = 0; i < segments.length; i++) {
    const matched = findInColumn(data, currentPid, segments[i]);
    if (!matched) break; // value path doesn't exist in the data source
    path.push({ key: matched.uid, label: matched.label as string });
    if (!matched.isLeaf) {
      queue.push(getChildren(data, matched.uid));
    }
    currentPid = matched.uid;
  }

  return [queue, path];
};

// Assemble Tags Options
// export function assembleOptions(data, value, configs) {
//   if (!value || (Array.isArray(value) && value.length === 0)) return [];
//   const { fullNode, multi, optionLabelProp } = configs;
//   const nodeIds = Object.values(data).map((item: any) => item.id);
//   const notExit = (multi ? value.flat(Infinity) : value).some(
//     (id) => !nodeIds.includes(id),
//   );
//   if (notExit) return []; // The id value in `value` does not exist in the `data` data source.

//   if (multi) {
//     // Multi-select mode implementation
//   } else {
//     if (fullNode) {
//       return [
//         {
//           id: 0,
//           text: value
//             .map((_, index: number) => {
//               const node = data[value.slice(0, index + 1).join('-')];
//               return node ? node?.text : null;
//             })
//             .filter(Boolean)
//             .join('/'),
//         },
//       ];
//     }
//     const item = data[value.join('-')];
//     const source = item.source ?? item;
//     const _text = optionLabelProp
//       ? typeof optionLabelProp === 'string'
//         ? source[optionLabelProp]
//         : optionLabelProp(item)
//       : item.text;
//     return [{ id: 0, text: _text }];
//   }
// }

// export function getPathTitle(
//   data,
//   value,
//   fullNode,
//   onlyParentNode,
//   multi,
//   optionLabelProp,
// ) {
//   if (!value || value.length === 0 || !data || Object.keys(data).length === 0)
//     return [];
//   const nodeIds = Object.values(data).map((item: any) => item?.id);
//   const notExit = (multi ? value.flat(Infinity) : value).some(
//     (id) => !nodeIds.includes(id),
//   );
//   if (notExit) return [];

//   if (multi) {
//     let options: any = [];
//     let common = value;
//     if (onlyParentNode) {
//       const parentIds = value
//         .filter((group) => group.length > 1)
//         .map((group) => group.slice(0, -1).join('-'))
//         .flat();
//       // Retrieve the UID of all selected nodes
//       const _fullParentIds = Array.from(
//         new Set(parentIds.filter((uid) => data[uid].checkedAll)),
//       ) as Array<string>;
//       // Filter out child nodes where the uid is a child of another uid.
//       const fullParentIds = _fullParentIds.filter(
//         (id: string) =>
//           !_fullParentIds.some((pid: string) => pid == data[id].pid),
//       );
//       // const filterFullparentIds = fullParentIds.filter((id: string | number) => !fullParentIds.some(pid => pid == data[id].pid))
//       // Remove child nodes that are part of the full selection.
//       common = value.filter(
//         (group) =>
//           !fullParentIds.some((id) => group.join('-').startsWith(id + '')),
//       );

//       options = fullParentIds.map((id) => {
//         if (data[id].level === 1) {
//           return { id: [id], text: data[id].text, parentForChild: true };
//         } else {
//           const list = id.split('-'); // Issues arise when the id in the original data contains a '-'
//           // return {id: data[id].way, text: data[id].way.map(i => data[i].text).join('/'), parentForChild: true }
//           return {
//             id: data[id].way,
//             text: list
//               .map((item, index) => {
//                 const node = data[list.slice(0, index + 1).join('-')];
//                 return node ? node?.text : null;
//               })
//               .filter(Boolean)
//               .join('/'),
//             // text: list.map(
//             //     (item, index) => data[list.slice(0, index + 1).join('-')]?.text).join(' / '),
//             parentForChild: true,
//           };
//         }
//       });
//     }

//     if (fullNode) {
//       const c = common.map((group) => {
//         // return {id: group, text: group.map(item => data[item].text).join('/')}
//         const keys = group.map((_, index) =>
//           group.slice(0, index + 1).join('-'),
//         );
//         const targets = keys.map((key) => data[key]);
//         const renderOptionLabel =
//           typeof optionLabelProp === 'function'
//             ? optionLabelProp(targets, group)
//             : null;
//         return {
//           id: group,
//           text:
//             renderOptionLabel ??
//             group
//               .map((item, index) => {
//                 const node = data[group.slice(0, index + 1).join('-')];
//                 const text =
//                   typeof optionLabelProp === 'string' && node?.[optionLabelProp]
//                     ? node?.text
//                     : null;
//                 return text;
//               })
//               .filter(Boolean)
//               .join('/'),
//           // text: group.map((item, index) => data[group.slice(0, index + 1).join('-')]?.text).join(' / ')
//         };
//       });
//       options = options.concat(c);
//     } else {
//       const c = common.map((group) => {
//         return { id: group, text: data[group.join('-')]?.text };
//       });
//       options = options.concat(c);
//     }

//     return options;
//   } else {
//     if (fullNode) {
//       // return [{id: 0, text: value.map(item => data[item].text).join('/')}];
//       return [
//         {
//           id: 0,
//           text: value
//             .map((item, index) => {
//               const node = data[value.slice(0, index + 1).join('-')];
//               return node ? node?.text : null;
//             })
//             .filter(Boolean)
//             .join('/'),
//           // text: value.map((item, index) => data[value.slice(0, index + 1).join('-')]?.text).join(' / ')
//         },
//       ];
//     } else {
//       const item = data[value.join('-')];
//       const source = item?.source ?? item ?? {};
//       const _text =
//         typeof optionLabelProp === 'string'
//           ? source[optionLabelProp]
//           : optionLabelProp(source, item);
//       return [{ id: 0, text: _text }];
//     }
//   }
// }

// function getObjChilds(obj) {
//   const childs = obj.children;
//   let res = [];
//   childs.forEach((item) => {
//     res.push([...item.pids, item.id]);
//   });

//   return res;
// }

// data is mergedValue
// NOTE: This function is currently unused but kept for potential future use
// export function filterMultiChecked(data, obj, wrapperMapData) {
//   let _data = data;
//   const strData = _data.map((item) => item.join('-'));
//   let _target = obj.uid;

//   if (hasChild(obj)) {
//     if (strData.includes(_target)) {
//       _data = _data.filter((item, index) => {
//         const strValue = strData[index];
//         return !strValue.startsWith(_target);
//       });
//     } else {
//       const current = [...obj.pids, obj.id];
//       const childs = getObjChilds(obj);
//       _data = [..._data, current, ...childs];
//     }
//   } else {
//     if (_data.map((d) => d.join('-')).includes(_target)) {
//       _data = _data.filter((item) => item.join('-') != _target);
//     } else {
//       _data.push(_target.split('-'));
//     }
//   }
//   // Should the parent nodes be added when traversing through the pids of the clicked node?
//   if (obj.pids.length) {
//     const strPids = obj.pids.map((_, index) =>
//       obj.pids.slice(0, index + 1).join('-'),
//     );
//     strPids.forEach((strPid, index) => {
//       const childs = wrapperMapData[strPid].children;
//       const unCheckedAll = childs.find((child) => !strData.includes(child.uid));
//       // !unCheckedAll && _data.push(obj.pids[]);
//     });
//   }

//   // Remove duplicates
//   _data = Array.from(new Set(_data.map(JSON.stringify))).map(JSON.parse);
//   return [..._data];
// }

/**
 * Format a value path into a key string. Alias of `pathToUid` so all path→key
 * conversions share one collision-safe format.
 * @param val - The path array
 */
export const formatKey = (val: Array<string | number>): string => pathToUid(val);

/**
 * Check if a path has the same prefix as another path
 * @param prefix - The prefix path to check
 * @param target - The target path to check against
 * @returns true if the target path starts with the prefix path
 */
export const isSamePrefixPath = (
  prefix: Array<unknown>,
  target: Array<unknown>,
) => {
  if (prefix.length > target.length) return false;
  const len = prefix.length;
  for (let i = 0; i < len; i++) {
    if (prefix[i] !== target[i]) return false;
  }
  return true;
};

/**
 * Determine if a node is fully selected or half selected (indeterminate)
 * @param value - The selected value paths
 * @param item - The flatten option node to check
 * @param children - The node's direct flattened children (derive via `getChildren`)
 * @returns A tuple [checkedAll, indeterminate]
 */
export function isHalfChecked(
  value: Array<Array<string | number>>,
  item: FlattenOption,
  children: FlattenOption[],
) {
  if (!children.length) return [false, false];
  const total = children.length;
  const prefixPath = item.path;

  const filtered = value.filter((path) => isSamePrefixPath(prefixPath, path));
  const filteredLength = filtered.length;
  const checkedAll = filteredLength >= total;
  const indeterminate = filteredLength > 0 && !checkedAll;
  return [checkedAll, indeterminate];
}

/**
 * Default maximum tree depth accepted by `flattenOptions`. Guards against
 * stack overflow on pathological/deeply-nested input.
 */
const DEFAULT_MAX_DEPTH = 100;

/**
 * Flatten a tree structure into an array for easier searching and traversal.
 *
 * The flattened nodes intentionally do NOT carry a `children` field — use
 * `getChildren(data, uid)` to read a node's children. `uid`/`pid` are built
 * via `pathToUid` (collision-safe). Includes a depth cap and a cycle guard so
 * malformed input (very deep or self-referencing trees) cannot overflow the
 * stack.
 *
 * @param tree - The tree data to flatten
 * @param fieldNames - Custom field names for label, value, and children
 * @param maxDepth - Maximum nesting depth (default 100)
 * @returns An array of flattened options with additional metadata
 */
export const flattenOptions = (
  tree: Array<Record<string, unknown>>,
  fieldNames?: FieldNames,
  maxDepth: number = DEFAULT_MAX_DEPTH,
): FlattenOption[] => {
  const res: FlattenOption[] = [];
  const {
    label = 'label',
    value = 'value',
    children = 'children',
  } = fieldNames || {};
  // Object-identity set of nodes on the current DFS path, for cycle detection.
  const seen = new Set<Record<string, unknown>>();
  const dfs = (
    nodes: Array<Record<string, unknown>>,
    parents: Array<string | number> = [],
    labelParents: string[] = [],
  ) => {
    nodes.forEach((node: Record<string, unknown>) => {
      if (parents.length >= maxDepth) return; // depth guard
      if (seen.has(node)) return; // cycle guard (back-edge to an ancestor)
      const nodeLabel = node[label] as string;
      const path = [...parents, node[value]] as Array<string | number>;
      const labelPath = [...labelParents, nodeLabel];
      const uid = pathToUid(path);
      res.push({
        $source: node as Option,
        label: nodeLabel,
        value: node[value] as string | number,
        pid: pathToUid(parents),
        uid,
        path,
        labelPath,
        level: parents.length,
        isLeaf: !hasChild(node, children),
      });
      if (hasChild(node, children)) {
        seen.add(node);
        dfs(
          node[children] as Array<Record<string, unknown>>,
          path,
          labelPath,
        );
        seen.delete(node);
      }
    });
  };
  dfs(tree);
  return res;
};
