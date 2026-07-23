import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import React, { memo, useContext, useMemo, useState } from 'react';
import Checkbox from '../Checkbox';
import Spin from '../Spin';
import isEqual from '../utils/isEqual';
import { CascaderCtx } from './cascader';
import { getChildren, isHalfChecked } from './utils';

import type { NodeProps } from './interface';

const Node = (props: NodeProps) => {
  const { uid, value, disabled, label, $source, isLeaf, path, level } = props;

  const {
    prefixCls,
    expandedPath,
    multiple,
    mergedValue,
    loadData,
    nodeMap,
    flatOptions,
    onNodeMouseEnter,
    onItemClick,
  } = useContext(CascaderCtx);

  const isParent = !isLeaf;

  /**
   * 0: not load
   * 1: loading
   * 2: loaded
   * */
  const [load, setLoad] = useState<0 | 1 | 2>(0);

  const checked = useMemo(() => {
    return mergedValue
      ? multiple
        ? (mergedValue as Array<Array<string | number>>).some((item) =>
            isEqual(item, path),
          )
        : // eslint-disable-next-line eqeqeq
          (mergedValue as Array<string | number>)[level] == value &&
          isEqual(
            (mergedValue as Array<string | number>).slice(0, level + 1),
            path,
          )
      : false;
  }, [mergedValue, multiple, level, value, path]);

  const handleLoadData = () => {
    if (loadData && isLeaf === false) {
      setLoad(1);
      loadData($source)
        ?.then(() => {
          setLoad(2);
        })
        .catch(() => {
          setLoad(0);
        });
    }
  };

  const handleClick = (
    isCheckClick: boolean,
    e?: React.MouseEvent<HTMLElement>,
  ) => {
    if (disabled) return;
    if (!isLeaf && e) {
      e.stopPropagation();
    }
    if (isCheckClick) {
      onItemClick(props, true);
    } else {
      onItemClick(props, multiple && isParent ? false : true);
    }
    handleLoadData();
  };

  const [checkedAll, indeterminate] = useMemo(() => {
    const currentNode = nodeMap.get(uid);
    if (!multiple || !currentNode || !isParent) return [false, false];
    return isHalfChecked(
      mergedValue as (string | number)[][],
      currentNode,
      getChildren(flatOptions, uid),
    );
  }, [nodeMap, uid, mergedValue, flatOptions, isParent, multiple]);

  const clsName = clsx(
    `${prefixCls}-menu-item`,
    {
      [`${prefixCls}-menu-item-expand`]: !isLeaf,
      [`${prefixCls}-menu-item-disabled`]: disabled,
      active: expandedPath[level]?.key === uid,
    },
    `${prefixCls}-menu-item-${level}`,
  );

  const handleMouseEnter = () => {
    if (disabled) return;
    onNodeMouseEnter(props, level);
  };

  return (
    <li
      className={clsName}
      onMouseEnter={handleMouseEnter}
      onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(false, e)}
      role="option"
      aria-disabled={disabled || undefined}
      aria-selected={checked || expandedPath[level]?.key === uid}
      aria-expanded={isParent ? expandedPath[level]?.key === uid : undefined}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(false, e as unknown as React.MouseEvent<HTMLElement>);
        }
      }}
    >
      {multiple && (
        <Checkbox
          checked={isParent ? checkedAll : checked}
          onChange={isParent ? () => handleClick(true) : undefined}
          indeterminate={indeterminate}
          aria-label={`Select ${typeof label === 'string' ? label : String(label)}`}
        />
      )}
      <span
        className={clsx(`${prefixCls}-menu-item-label`, {
          loaded: load === 2,
        })}
        title={typeof label === 'string' ? label : String(label)}
      >
        {label}
      </span>

      {load === 1 ? (
        <Spin size="small" aria-label="Loading" />
      ) : isLeaf === false ? (
        <ChevronRight size={20} aria-hidden="true" />
      ) : null}
    </li>
  );
};

export default memo(Node);
