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
  const { node, style: nodeStyle } = props;
  const {
    uid,
    isLeaf,
    isLast,
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
    selectedUids,
    checkedUids,
    indeterminateUids,
    expandedUids,
    switcherIcon,
    draggable,
    draggingUid,
    dropState,
    onCheck,
    onSelect,
    onExpand,
    onNodeDragStart,
    onNodeDragOver,
    onNodeDragLeave,
    onNodeDrop,
  } = useContext(TreeContext);

  const expanded = expandedUids.has(uid);
  const checked = checkedUids.has(uid);
  const indeterminate = indeterminateUids.has(uid);
  const selected = selectedUids.has(uid);

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
            onClick={() => onExpand(uid)}
          />
        )}
      </span>
    );
  };

  const renderCheckbox = () => {
    if (!checkable) return null;
    return (
      <span className={`${prefixCls}-node-checkbox`}>
        <Checkbox
          value={uid}
          checked={checked}
          indeterminate={indeterminate}
          onChange={(e) => onCheck(e, uid)}
        />
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
        onClick={disabled ? undefined : () => onSelect(uid)}
      >
        {label}
      </Button>
    );
  };

  const renderEmptyNodes = (depth: number) => {
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

  const isDropTarget = dropState?.uid === uid;
  const dropPosition = isDropTarget ? dropState.position : null;

  const dragProps =
    draggable && !disabled
      ? {
          draggable: true as const,
          onDragStart: (e: React.DragEvent) => onNodeDragStart(uid, e),
          onDragOver: (e: React.DragEvent) => onNodeDragOver(uid, e),
          onDragLeave: (e: React.DragEvent) => onNodeDragLeave(uid, e),
          onDrop: (e: React.DragEvent) => onNodeDrop(uid, e),
        }
      : {};

  return (
    <div
      className={clsx(`${prefixCls}-node`, {
        [`${prefixCls}-node-with-line`]: showLine,
        [`${prefixCls}-leaf-node`]: isLeaf,
        [`${prefixCls}-last-node`]: isLast,
        [`${prefixCls}-node-dragging`]: draggingUid === uid,
        [`${prefixCls}-node-drag-over-before`]: dropPosition === 'before',
        [`${prefixCls}-node-drag-over-after`]: dropPosition === 'after',
        [`${prefixCls}-node-drag-over-inside`]: dropPosition === 'inside',
      })}
      style={nodeStyle}
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
