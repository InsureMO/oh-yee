import React from 'react';
import type { FlattenOption } from './interface';
import Node from './node';

export interface ColumnProps {
  prefixCls: string;
  data: FlattenOption[];
  index: number;
}

const Column = (props: ColumnProps) => {
  const { prefixCls, data, index } = props;
  return (
    <ul className={`${prefixCls}-menu`} role="menu">
      {Array.isArray(data) &&
        data.map((item, idx: number) => {
          return (
            <Node
              {...item}
              index={idx}
              key={`cascader-${index}-${item.uid || idx}`}
            />
          );
        })}
    </ul>
  );
};

export default Column;
