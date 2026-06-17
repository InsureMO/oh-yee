import clsx from 'clsx';
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useContext } from 'react';
import Button from '../Button';
import Checkbox from '../Checkbox';
import type { TreeNodeProps } from './interface';
import { TreeContext } from './tree';

import './style/index.less';

const Node = <T extends Record<string, unknown> = any>(
  props: TreeNodeProps<T>,
) => {
  const { node } = props;
  const {
    key,
    isLeaf,
    isLast,
    path,
    label,
    title,
    disabled,
    depth,
    icon,
    original,
    lines,
  } = node;
  const {
    prefixCls,
    checkable,
    showIcon,
    icon: contextIcon,
    showLine,
    selectedKeys,
    checkedKeys,
    expandedKeys,
    switcherIcon,
    draggable,
    draggingKey,
    dropState,
    onCheck,
    onSelect,
    onExpand,
    onNodeDragStart,
    onNodeDragOver,
    onNodeDragLeave,
    onNodeDrop,
  } = useContext(TreeContext);

  const expanded = expandedKeys.includes(key);
  const checked = checkedKeys.includes(key);
  const selected = selectedKeys.includes(key);

  // All nodes on the path must be visible for this node to display
  const visible = path.every((p) => expandedKeys.includes(p));

  if (!visible) return null;

  const renderExpandedIcon = () => {
    const expandedIcon = switcherIcon ? (
      switcherIcon[0]
    ) : (
      <ChevronDown strokeWidth={1} />
    );
    const collapseIcon = switcherIcon ? (
      switcherIcon[1]
    ) : (
      <ChevronRight strokeWidth={1} />
    );
    return (
      <span className={`${prefixCls}-node-switcher`}>
        {isLeaf ? (
          <span
            className={clsx(`${prefixCls}-node-indent`, {
              [`${prefixCls}-node-indent-last`]: isLast,
              [`${prefixCls}-node-indent-with-line`]: showLine,
            })}
          ></span>
        ) : (
          <Button
            className={`${prefixCls}-node-switcher-icon`}
            size="small"
            type="text"
            icon={expanded ? expandedIcon : collapseIcon}
            onClick={() => onExpand(key)}
          />
        )}
      </span>
    );
  };

  const renderCheckbox = () => {
    if (!checkable) return null;
    return (
      <span className={`${prefixCls}-node-checkbox`}>
        <Checkbox value={key} checked={checked} onChange={onCheck} />
      </span>
    );
  };

  const renderLabel = () => {
    const _title = title || (typeof label === 'string' ? label : undefined);
    const mergedIcon = icon || contextIcon;
    const _icon =
      typeof mergedIcon === 'function' ? mergedIcon(original) : mergedIcon;

    return (
      <Button
        className={clsx(`${prefixCls}-node-label`, {
          [`${prefixCls}-node-label-selected`]: selected,
        })}
        size="small"
        type="text"
        title={_title}
        icon={showIcon ? _icon : undefined}
        onClick={disabled ? undefined : () => onSelect(key)}
      >
        {label}
      </Button>
    );
  };

  const renderEmptyNodes = (depth: number) => {
    // eslint-disable-line @typescript-eslint/no-unused-vars

    const temp = new Array(depth).fill(0);
    if (showLine) {
      return temp.map((_, index) => (
        <span
          className={clsx(`${prefixCls}-node-indent`, {
            [`${prefixCls}-node-indent-with-line`]: lines.includes(index),
            [`${prefixCls}-node-indent-last`]: index + 1 === depth,
          })}
          key={index}
        ></span>
      ));
    }

    return temp.map((_, index) => (
      <span
        aria-hidden="true"
        className={`${prefixCls}-node-indent`}
        key={index}
      ></span>
    ));
  };

  const isDropTarget = dropState?.key === key;
  const dropPosition = isDropTarget ? dropState.position : null;

  const dragProps =
    draggable && !disabled
      ? {
          draggable: true as const,
          onDragStart: (e: React.DragEvent) => onNodeDragStart(key, e),
          onDragOver: (e: React.DragEvent) => onNodeDragOver(key, e),
          onDragLeave: (e: React.DragEvent) => onNodeDragLeave(key, e),
          onDrop: (e: React.DragEvent) => onNodeDrop(key, e),
        }
      : {};

  return (
    <div
      className={clsx(`${prefixCls}-node`, {
        [`${prefixCls}-node-with-line`]: showLine,
        [`${prefixCls}-leaf-node`]: isLeaf,
        [`${prefixCls}-last-node`]: isLast,
        [`${prefixCls}-node-dragging`]: draggingKey === key,
        [`${prefixCls}-node-drag-over-before`]: dropPosition === 'before',
        [`${prefixCls}-node-drag-over-after`]: dropPosition === 'after',
        [`${prefixCls}-node-drag-over-inside`]: dropPosition === 'inside',
      })}
      // style={{
      //   paddingLeft: depth * 28 + (isLeaf && checkable ? 24 : 0),
      // }}
      {...dragProps}
    >
      {renderEmptyNodes(depth)}
      {renderExpandedIcon()}
      {renderCheckbox()}
      {renderLabel()}
    </div>
  );
};

export default Node;
