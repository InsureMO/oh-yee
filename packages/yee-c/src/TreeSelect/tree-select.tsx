import React, { useContext, useMemo, useState } from 'react';
import { GlobalContext } from '../Config-Provider';
import Selector from '../Selector';
import Tree from '../Tree';
import { tree2array } from '../Tree/utils/tree-tools';
import Trigger from '../Trigger';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import omit from '../utils/omit';
import type { TreeSelectProps } from './interface';

import './style/index.less';

const DEFAULTFIELDNAMES = {
  key: 'key' as const,
  label: 'label' as const,
  children: 'children' as const,
};

const TreeSelect = <T extends Record<string, unknown> = any>(
  baseprops: TreeSelectProps<T>,
) => {
  const { treeselect } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, treeselect);
  const {
    prefixCls = 'yee-tree-select',
    dataSource = [],
    fieldNames = DEFAULTFIELDNAMES,
    placement = 'bottomLeft',
    mode,
    value,
    defaultValue,
    checkable = false,
    multiple = false, // eslint-disable-line @typescript-eslint/no-unused-vars
    optionLabelProp = 'label',
    onChange,
    onFilter,
    ...rest
  } = props;

  const single = mode !== 'multiple';

  const handleState = (
    value: string | number | Array<string | number>,
  ): Array<string | number> => {
    if (Array.isArray(value)) {
      return value;
    }
    if (value !== undefined && value !== null) {
      return [value];
    }
    return [];
  };

  const [mergedValue, setMergedValue] = useMergedState<any>([], {
    value,
    defaultValue,
    handleState,
  });

  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const mergedFieldNames = {
    key: fieldNames?.key || DEFAULTFIELDNAMES.key,
    label: fieldNames?.label || DEFAULTFIELDNAMES.label,
    children: fieldNames?.children || DEFAULTFIELDNAMES.children,
  };

  // Convert tree data to flat array for search and option processing
  const [, itemMap] = useMemo(
    () =>
      tree2array(
        Array.isArray(dataSource) ? dataSource : [dataSource],
        mergedFieldNames,
      ),
    [dataSource, mergedFieldNames],
  );

  // Filter data source for searching
  const filteredDataSource = useMemo(() => {
    const sourceArray = Array.isArray(dataSource) ? dataSource : [dataSource];

    if (!searchValue) {
      return sourceArray;
    }
    if (onFilter) {
      return onFilter(searchValue, sourceArray);
    }

    // Default search logic: search by label field
    const low = String(searchValue).toLowerCase();
    const filterTree = (nodes: T[]): T[] => {
      return nodes.reduce((acc: T[], node) => {
        const label = String(
          node[mergedFieldNames.label as keyof T] || '',
        ).toLowerCase();
        const children = node[mergedFieldNames.children as keyof T] as
          | T[]
          | undefined;

        if (label.includes(low)) {
          // If current node matches, include the entire subtree
          acc.push(node);
        } else if (children && children.length > 0) {
          // If current node doesn't match, but children might
          const filteredChildren = filterTree(children);
          if (filteredChildren.length > 0) {
            acc.push({
              ...node,
              [mergedFieldNames.children as keyof T]:
                filteredChildren as T[keyof T],
            });
          }
        }
        return acc;
      }, []);
    };

    return filterTree(sourceArray);
  }, [searchValue, dataSource, mergedFieldNames, onFilter]);

  // Convert selected keys to options format for Selector display
  const selectedOptions = useMemo(() => {
    return mergedValue
      .map((key: string | number) => {
        const item = itemMap.get(key as string);
        if (!item) return null;

        const label =
          typeof optionLabelProp === 'function'
            ? optionLabelProp(item.original)
            : String(item[optionLabelProp as keyof typeof item] || item.label);

        return {
          value: key,
          label,
          ...item.original,
        };
      })
      .filter(Boolean);
  }, [mergedValue, itemMap, optionLabelProp]);

  const getNodes = (keys: string | number | Array<string | number>) => {
    if (keys === '' || keys === null) {
      return undefined;
    }
    if (Array.isArray(keys)) {
      if (keys.length === 0) {
        return [];
      }
      return keys
        .map((key) => itemMap.get(key as string)?.original)
        .filter((node): node is T => node !== undefined);
    }
    return itemMap.get(keys as string)?.original;
  };

  const handleSelect = (selectedKeys: Array<string | number>) => {
    let keys;
    if (single) {
      keys = selectedKeys.length > 0 ? selectedKeys[0] : '';
      setMergedValue(selectedKeys);
      setSearchValue('');
      setOpen(false);
    } else {
      keys = selectedKeys;
      setMergedValue(selectedKeys);
    }

    const nodes = getNodes(keys);
    onChange?.(keys, nodes);
  };

  const handleCheck = (checkedKeys: Array<string | number>) => {
    const keys = single
      ? checkedKeys.length > 0
        ? checkedKeys[0]
        : ''
      : checkedKeys;
    setMergedValue(checkedKeys);

    if (single) {
      setSearchValue('');
      setOpen(false);
    }

    const nodes = getNodes(keys);
    onChange?.(keys, nodes);
  };

  const handleClear = () => {
    setMergedValue([]);
    onChange?.(single ? '' : [], single ? undefined : []);
  };

  const handleRemove = (option: any) => {
    const keys = mergedValue.filter((k: string | number) => k !== option.value);
    const nodes = getNodes(keys);
    setMergedValue(keys);
    const key = single ? (keys.length > 0 ? keys[0] : '') : keys;
    onChange?.(key, nodes);
  };

  const handleSearch = (v: string) => {
    setSearchValue(v);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const popup = (
    <Tree
      {...rest}
      className={`${prefixCls}-tree`}
      dataSource={filteredDataSource}
      fieldNames={mergedFieldNames}
      checkable={checkable}
      multiple={!single}
      selectedKeys={mergedValue}
      checkedKeys={checkable ? mergedValue : []}
      onSelect={handleSelect}
      onCheck={checkable ? handleCheck : undefined}
    />
  );

  return (
    <Trigger
      {...rest}
      placement={placement}
      popup={popup}
      stretch="width"
      open={open}
      popupClassName={`${prefixCls}-popup`}
      hideOnClick={false}
      onOpenChange={handleOpenChange}
    >
      <Selector
        {...omit(rest, ['showLine'])}
        className={`${prefixCls}-selector`}
        mode={mode}
        value={searchValue}
        options={selectedOptions}
        selectedKeys={mergedValue}
        onOpenChange={handleOpenChange}
        onClear={handleClear}
        onRemove={handleRemove}
        onSearch={handleSearch}
      />
    </Trigger>
  );
};

export default TreeSelect;
