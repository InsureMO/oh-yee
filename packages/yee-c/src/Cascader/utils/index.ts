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
 * Get the next queue element for navigation
 * @internal
 */
const getNextQueueElement = (
  data: Array<FlattenOption>,
  value: string | number,
): [FlattenOption[], { id: string | number; text: string }] | [] => {
  if (!Array.isArray(data)) {
    return [];
  }

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.uid === value) {
      const nexts = hasChild(item)
        ? (item.children as Array<FlattenOption>).filter((c) => c.pid === value)
        : [];
      return [
        nexts,
        { id: item.value as string | number, text: item.label as string },
      ];
    }
  }
  return [];
};

/**
 * Populate data into input fields and dropdown lists from a value array
 * @param arr - The value array representing the selected path
 * @param data - The flattened options data
 * @param options - Optional configuration
 * @returns A tuple of [queue, path] where queue is the column data and path is the selected path info
 */
export const changeToView = (
  arr: Array<string | number>,
  data: Array<FlattenOption>,
  options?: {
    needNext?: boolean;
    multiple?: boolean;
  },
) => {
  const { needNext, multiple } = options || {};
  const _queue: FlattenOption[][] = [];
  const _path: Array<{ id: string | number; text: string }> = [];

  if (Array.isArray(arr)) {
    let i = 0;
    let _arr = arr;
    if (multiple) {
      _arr = Array.isArray(arr[0]) ? arr[0] : arr;
    }
    let _data = data.filter((item) => item.level === 0);
    do {
      _queue.push(_data);
      const result = getNextQueueElement(_data, _arr[i]);
      if (result.length) {
        const [_dataNext, _pathItem] = result;
        _data = _dataNext;
        _path.push(_pathItem);
      }
      i++;
    } while (needNext ? i <= _arr.length : i < _arr.length);
  }
  return [_queue, _path];
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
 * Format a path array into a key string
 * @param val - The path array
 * @returns A string key joined by '-'
 */
export const formatKey = (val: Array<string | number>) => val.join('-');

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
 * @returns A tuple [checkedAll, indeterminate]
 */
export function isHalfChecked(
  value: Array<Array<string | number>>,
  item: FlattenOption,
) {
  if (!hasChild(item)) return [false, false];
  const total = item.children!.length;
  const prefixPath = item.path;

  const filtered = value.filter((path) => isSamePrefixPath(prefixPath, path));
  const filteredLength = filtered.length;
  const checkedAll = filteredLength >= total;
  const indeterminate = filteredLength > 0 && !checkedAll;
  return [checkedAll, indeterminate];
}

/**
 * Flatten a tree structure into an array for easier searching and traversal
 * @param tree - The tree data to flatten
 * @param fieldNames - Custom field names for label, value, and children
 * @returns An array of flattened options with additional metadata
 */
export const flattenOptions = (
  tree: Array<Record<string, unknown>>,
  fieldNames: FieldNames,
): FlattenOption[] => {
  const res: FlattenOption[] = [];
  const {
    label = 'label',
    value = 'value',
    children = 'children',
  } = fieldNames || {};
  const dfs = (
    nodes: Array<Record<string, unknown>>,
    parents: Array<string | number> = [],
  ) => {
    nodes.forEach((node: Record<string, unknown>) => {
      const wrappered = {
        $source: node,
        label: node[label],
        value: node[value],
        children: node[children],
      } as Option;
      const path = [...parents, wrappered['value']] as Array<string | number>;
      const uid = path.join('-');
      const pid = parents.join('-');
      res.push({
        ...wrappered,
        pid,
        uid,
        path,
        level: parents.length,
        isLeaf: !hasChild(wrappered),
      } as FlattenOption);
      if (wrappered['children']) dfs(wrappered['children'] as Option[], path);
    });
  };
  dfs(tree);
  return res;
};
