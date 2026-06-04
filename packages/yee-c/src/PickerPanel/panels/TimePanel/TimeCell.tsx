import React from 'react';
import clsx from 'clsx';

function TimeCell(props: any) {
  const { prefixCls, value, onSelect, active } = props;

  const cls = clsx(`${prefixCls}-time-panel-cell`, {
    [`${prefixCls}-time-panel-cell-selected`]: active,
  });

  const renderValue = value < 10 ? '0' + value : value;

  return (
    <li className={cls} onClick={() => onSelect(value)}>
      <div className={`${prefixCls}-time-panel-cell-inner`}>{renderValue}</div>
    </li>
  );
}

export default TimeCell;
