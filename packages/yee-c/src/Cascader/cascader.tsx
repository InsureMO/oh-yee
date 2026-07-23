import clsx from 'clsx';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GlobalContext } from '../Config-Provider';
import useDeepCompareMemo from '../hooks/useDeepCompareMemo';
import useMergedState from '../hooks/useMergedState';
import Selector from '../Selector';
import Trigger from '../Trigger';
import isEqual from '../utils/isEqual';
import mergeContextToProps from '../utils/mergeContextToProps';
import Column from './column';
import SearchList from './search-list';
import {
  changeToView,
  flattenOptions,
  getChildren,
  isSamePrefixPath,
  pathToUid,
} from './utils';

import type {
  CascaderContextValue,
  CascaderProps,
  FlattenOption,
  Option,
} from './interface';
import './style/index.less';

export const CascaderCtx = createContext<CascaderContextValue>(
  {} as CascaderContextValue,
);

const Cascader = (baseprops: CascaderProps) => {
  const { cascader } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, cascader);
  const {
    prefixCls = 'yee-cascader',
    value,
    defaultValue,
    options,
    placement = 'bottomLeft',
    popupClassName,
    searchable = true,
    fieldNames = {
      label: 'label',
      value: 'value',
      children: 'children',
    },
    optionLabelProp,
    expandTrigger = 'click',
    changeOnSelect = false,
    children,
    multiple,
    loadData,
    onChange,
    ...rest
  } = props;

  // Status variables for internal use
  const [columns, setColumns] = useState<Array<FlattenOption[]>>([]);
  const [expandedPath, setExpandedPath] = useState<
    Array<{ key: string; label: string }>
  >([]);
  const [searchValue, setSearchValue] = useState(''); // Input field input
  // NOTE: popupVisible uses ref instead of state to avoid triggering re-renders
  // This is intentional - it's only used for side effects tracking, not for rendering
  const popupVisible = useRef(false);

  const [mergedValue, setMergedValue] = useMergedState([], {
    value,
    defaultValue,
  });

  // flat tree to array
  const flatOptions = useDeepCompareMemo(() => {
    if (!options || options.length === 0) return [];
    return flattenOptions(options, fieldNames);
  }, [options, fieldNames]);

  // create nodeMap
  const nodeMap = useMemo(() => {
    const map = new Map<string, FlattenOption>();
    flatOptions.forEach((item: FlattenOption) => {
      map.set(item.uid, item);
    });
    return map;
  }, [flatOptions]);

  // Update View - expand to specified path
  const updateView = useCallback(
    (currentValue: Array<string | number>) => {
      if (flatOptions.length === 0) {
        setColumns([]);
        setExpandedPath([]);
        return;
      }
      const [newQueue, newPath] = changeToView(
        currentValue || [],
        flatOptions,
        {
          multiple,
        },
      );
      setColumns(newQueue);
      setExpandedPath(newPath);
    },
    [flatOptions, multiple],
  );

  useEffect(() => {
    if (popupVisible.current === false) {
      const rawVal = multiple
        ? (mergedValue?.[0] as unknown as Array<string | number>)
        : (mergedValue as Array<string | number>);
      updateView(rawVal);
    }
  }, [flatOptions, mergedValue, multiple, updateView]);

  const isFilter = !!(searchable && searchValue);

  //  --------------- events ---------------------
  // search input
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  // node mouse evt
  const onNodeMouseEnter = (item: FlattenOption, level: number) => {
    if (expandTrigger === 'hover' && !item.isLeaf) {
      const queue = columns.slice(0, level + 1);
      queue.push(getChildren(flatOptions, item.uid));
      setColumns(queue);
      // Also update expandedPath to maintain highlight state
      setExpandedPath((prev) => [
        ...prev.slice(0, level),
        { key: item.uid, label: item.label },
      ]);
    }
  };

  // Helper function to get all descendant paths of a node
  const getAllDescendantPaths = useCallback(
    (
      node: FlattenOption,
      maxDepth: number = 100,
    ): Array<Array<string | number>> => {
      const paths: Array<Array<string | number>> = [];
      const traverse = (currentNode: FlattenOption, depth: number) => {
        if (depth > maxDepth) return; // Prevent stack overflow
        if (currentNode.isLeaf) {
          paths.push(currentNode.path);
          return;
        }
        const children = getChildren(flatOptions, currentNode.uid);
        children.forEach((child) => traverse(child, depth + 1));
      };
      traverse(node, 0);
      return paths;
    },
    [flatOptions],
  );

  // cascader node click
  const onItemClick = useCallback(
    (item: FlattenOption, checkable: boolean = false) => {
      let newValue: unknown;
      let newOpts: unknown;
      let changed = false;
      const isLeaf = item.isLeaf;
      const shouldSelect = isLeaf || changeOnSelect;

      if (multiple && checkable) {
        // Multi-select mode with checkbox click
        const currentValue = mergedValue as Array<Array<string | number>>;

        // Check if current path is already selected
        const isSelected = currentValue.some((v) => isEqual(v, item.path));

        if (!item.isLeaf) {
          // Parent node: select/deselect all descendants
          const descendantPaths = getAllDescendantPaths(item, 50); // Limit to depth 50 to prevent performance issues

          // Filter out all descendant paths from current value
          let filteredValue = currentValue.filter(
            (v) =>
              !descendantPaths.some((descPath) =>
                isSamePrefixPath(descPath, v),
              ),
          );

          if (!isSelected) {
            // Add all descendant paths
            filteredValue = [...filteredValue, ...descendantPaths];
          }

          newValue = filteredValue;
          newOpts = filteredValue.map((path) =>
            path.map((_, i) => nodeMap.get(pathToUid(path.slice(0, i + 1)))),
          );
        } else {
          // Leaf node: toggle individual selection
          if (isSelected) {
            newValue = currentValue.filter((v) => !isEqual(v, item.path));
          } else {
            newValue = [...currentValue, item.path];
          }
          newOpts = (newValue as Array<Array<string | number>>).map((path) =>
            path.map((_, i) => nodeMap.get(pathToUid(path.slice(0, i + 1)))),
          );
        }
        changed = true;
      } else if (shouldSelect) {
        // Single select or non-checkable multi-select
        newValue = multiple ? [...mergedValue, item.path] : item.path;
        newOpts = multiple
          ? [
              ...(mergedValue as Array<Array<string | number>>).map((path) => {
                const vs = path as Array<string | number>;
                return vs.map((_, i) =>
                  nodeMap.get(pathToUid(vs.slice(0, i + 1))),
                );
              }),
              item.path.map((_, i) =>
                nodeMap.get(pathToUid(item.path.slice(0, i + 1))),
              ),
            ]
          : flatOptions.filter((opt: FlattenOption) => {
              const ancestors = item.path.map((_, i) =>
                pathToUid(item.path.slice(0, i + 1)),
              );
              return ancestors.includes(opt.uid);
            });
        changed = true;
      } else {
        // Expand to next level
        const level = item.level as number;
        const next = flatOptions.filter(
          (data: FlattenOption) =>
            data.level === level + 1 && data.pid === item.uid,
        );
        setColumns((state) => [...state.slice(0, level + 1), next]);
        setExpandedPath((state) => [
          ...state,
          { key: item.uid, label: item.label },
        ]);
      }

      if (changed) {
        setMergedValue(
          newValue as Array<Array<string | number>> | Array<string | number>,
        );
        onChange?.(
          newValue as Array<Array<string | number>> | Array<string | number>,
          newOpts as Array<Option>,
        );
      }
    },
    [
      multiple,
      mergedValue,
      changeOnSelect,
      nodeMap,
      flatOptions,
      getAllDescendantPaths,
      onChange,
    ],
  );

  // search list item click
  const onSearchItemClick = (item: FlattenOption) => {
    if (item.$source?.disabled) return;
    setSearchValue('');
    onItemClick(item);
  };

  // Selector options and selectedKeys
  const selectorData = useMemo(() => {
    if (!mergedValue || mergedValue.length === 0)
      return { options: [], selectedKeys: [] };

    const { fullNode = false, onlyParentNode = false } = props;
    const formatKey = (val: Array<string | number>) => pathToUid(val);

    let rawValues: (string | number)[][] = [];

    if (multiple) {
      rawValues = mergedValue as (string | number)[][];
    } else {
      rawValues = [mergedValue] as (string | number)[][];
    }

    const selectedKeys = multiple
      ? rawValues.map(formatKey)
      : rawValues[0]
        ? [formatKey(rawValues[0])]
        : [];

    // Filter values based on onlyParentNode option
    let displayValues = rawValues;
    if (multiple && onlyParentNode) {
      // Find parent nodes that have all (direct) children selected
      const selectedPathKeys = new Set(rawValues.map(pathToUid));
      const parentPaths: Array<Array<string | number>> = [];

      // Check each node to see if it's a fully selected parent
      nodeMap.forEach((node) => {
        if (!node.isLeaf) {
          const allChildrenSelected = getChildren(flatOptions, node.uid).every(
            (child) => selectedPathKeys.has(pathToUid(child.path)),
          );
          if (allChildrenSelected) {
            parentPaths.push(node.path);
          }
        }
      });

      // Filter out child nodes whose parent is fully selected
      displayValues = rawValues.filter(
        (path) =>
          !parentPaths.some((parentPath) => isSamePrefixPath(parentPath, path)),
      );
    }

    const displayOptions = displayValues.map((valPath) => {
      const opts = valPath.map((_, i: number) => {
        const uid = formatKey(valPath.slice(0, i + 1));
        return nodeMap.get(uid);
      });

      let label: React.ReactNode;
      if (optionLabelProp) {
        if (typeof optionLabelProp === 'function') {
          label = optionLabelProp({
            value: valPath,
            options: opts,
          });
        } else {
          const source = opts[opts.length - 1]?.$source;
          label = (source?.[optionLabelProp as string] ??
            '') as React.ReactNode;
        }
      } else if (fullNode) {
        label = opts.map((opt) => opt?.label || '').join('/');
      } else {
        label = opts[opts.length - 1]?.label ?? '';
      }

      return { value: formatKey(valPath), label };
    });

    return { options: displayOptions, selectedKeys };
  }, [
    multiple,
    mergedValue,
    nodeMap,
    flatOptions,
    optionLabelProp,
    props.fullNode,
    props.onlyParentNode,
  ]);

  // visible change
  const onVisibleChange = (newVisible: boolean) => {
    popupVisible.current = newVisible;
  };

  const handleClear = () => {
    setSearchValue('');
    setMergedValue([]);
    onChange?.([], []);
  };

  // Performance Note: For large datasets (1000+ options), consider:
  // 1. Adding debounce to the search input
  // 2. Implementing virtual scrolling for search results
  // 3. Limiting the number of displayed results
  const filteredList = useMemo(() => {
    if (!searchValue) return [];
    const lowStr = searchValue.toLowerCase();
    const result: Array<{
      matches: Array<{ text: string; highlight: boolean }>;
      data: FlattenOption;
    }> = [];

    for (const item of flatOptions) {
      // Match against the full breadcrumb (e.g. "A / B / C") so that:
      //  - searching a parent label surfaces its descendants,
      //  - the result row shows the full path to disambiguate duplicate leaf
      //    labels across different parents.
      const text = item.labelPath.join(' / ');
      const textLower = text.toLowerCase();
      if (textLower.includes(lowStr)) {
        const matches: Array<{ text: string; highlight: boolean }> = [];
        let lastIndex = 0;
        let index = textLower.indexOf(lowStr);

        while (index !== -1) {
          // Add non-matching part
          if (index > lastIndex) {
            matches.push({
              text: text.slice(lastIndex, index),
              highlight: false,
            });
          }
          // Add matching part
          matches.push({
            text: text.slice(index, index + lowStr.length),
            highlight: true,
          });
          lastIndex = index + lowStr.length;
          index = textLower.indexOf(lowStr, lastIndex);
        }
        // Add remaining non-matching part
        if (lastIndex < text.length) {
          matches.push({ text: text.slice(lastIndex), highlight: false });
        }

        result.push({ matches, data: item });
      }
    }
    return result;
  }, [searchValue, flatOptions]);

  const renderTrigger = () => {
    if (children) return children;

    return (
      <Selector
        {...rest}
        {...selectorData}
        searchable={searchable}
        mode={multiple ? 'multiple' : undefined}
        value={searchValue}
        onSearch={handleSearch}
        onClear={handleClear}
      />
    );
  };

  const renderPopup = () => {
    return (
      <div className={clsx(prefixCls)} role="group" aria-label="Cascader options">
        {isFilter ? (
          <SearchList
            prefixCls={prefixCls}
            items={filteredList}
            onClick={onSearchItemClick}
          />
        ) : (
          <CascaderCtx.Provider
            value={{
              prefixCls,
              multiple: !!multiple,
              expandTrigger: expandTrigger as 'click' | 'hover',
              mergedValue,
              nodeMap,
              flatOptions,
              expandedPath,
              loadData,
              onNodeMouseEnter,
              onItemClick,
            }}
          >
            {columns.map((data, index: number) => {
              return (
                <Column
                  prefixCls={prefixCls}
                  data={data}
                  index={index}
                  key={index}
                />
              );
            })}
          </CascaderCtx.Provider>
        )}
      </div>
    );
  };

  return (
    <Trigger
      trigger="click"
      placement={placement}
      stretch={isFilter ? 'width' : undefined}
      forceRender
      popupClassName={clsx(`${prefixCls}-popup`, popupClassName)}
      popup={renderPopup()}
      onOpenChange={onVisibleChange}
    >
      {renderTrigger()}
    </Trigger>
  );
};

Cascader.displayName = 'Cascader';

export default Cascader;
