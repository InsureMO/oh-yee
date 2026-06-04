import React, { useContext } from 'react';
import clsx from 'clsx';
import { SplitterCtx } from './splitter';

import type { SplitterItemProps } from './interface';

const Item = React.forwardRef<HTMLDivElement, SplitterItemProps>(
  (props, ref) => {
    const { prefixCls } = useContext(SplitterCtx);
    const { className, style, children } = props;
    const cls = clsx(`${prefixCls}-item`, className);

    return (
      <div className={cls} style={style} ref={ref}>
        {children}
      </div>
    );
  },
);

Item.displayName = 'SplitterItem';

export default Item;
