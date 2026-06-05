import clsx from 'clsx';
import React, { useContext } from 'react';
import Spin from '../Spin';
import type { TimelineItemProps } from './interface';
import { TimelineContext } from './timeline';

export type TimelineItemState =
  | 'success'
  | 'info'
  | 'error'
  | 'warning'
  | 'disabled';

const Item = (props: TimelineItemProps & { index: number }) => {
  const { children, index, status, color, dot, label, ...rest } = props;

  const { prefixCls, total, mode, pending, reverse, crossDisplayDate } =
    useContext(TimelineContext);

  const cls = clsx(`${prefixCls}-item`, {
    [`${prefixCls}-item-${status}`]: status,
    [`${prefixCls}-item-left`]:
      (mode === 'alternate' && index % 2 === 0) ||
      (mode === 'left' && crossDisplayDate),
    [`${prefixCls}-item-right`]:
      (mode === 'alternate' && index % 2 === 1) || mode === 'right',
    [`${prefixCls}-item-pending`]:
      pending && index === (reverse ? total - 1 : total - 2),
    [`${prefixCls}-item-last`]: pending && !reverse && index === total - 1,
    [`${prefixCls}-item-last-reverse`]:
      pending && reverse && index === total - 1,
  });

  const attrs = { ...rest, className: cls };

  const renderDot = () => (
    <div
      className={clsx(`${prefixCls}-item-head`, {
        [`${prefixCls}-item-head-custom`]: dot,
        [`${prefixCls}-item-head-pending`]: pending && index === total - 1,
      })}
      style={{ borderColor: color }}
    >
      {pending && index === total - 1 ? <Spin type="spin" size="small" /> : dot}
    </div>
  );

  const datePosition =
    label && crossDisplayDate
      ? mode === 'left' || !mode
        ? 'left'
        : mode === 'right'
          ? 'right'
          : index % 2 === 1
            ? 'right'
            : 'left'
      : 'left';

  return (
    <li {...attrs}>
      {datePosition === 'left' && (
        <div className={`${prefixCls}-item-label cross`}>
          {crossDisplayDate ? label : null}
        </div>
      )}
      <div className={`${prefixCls}-item-tail`}></div>
      {renderDot()}
      <div className={`${prefixCls}-item-body`}>
        <div className={`${prefixCls}-item-title-wrapper`}>
          <div className={`${prefixCls}-item-title`}>{children}</div>
          {label && !crossDisplayDate && (
            <div className={`${prefixCls}-item-label`}>{label}</div>
          )}
        </div>
      </div>
      {datePosition === 'right' && (
        <div className={`${prefixCls}-item-label cross`}>{label}</div>
      )}
    </li>
  );
};

export default Item;
