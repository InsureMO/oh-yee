import clsx from 'clsx';
import React from 'react';
import type { GridItemProps } from './interface';

const Item: React.FC<GridItemProps> = (props) => {
  const {
    prefixCls = 'yee-grid',
    children,
    className,
    style,
    spanStyle,
    ...rest
  } = props;
  return (
    <div
      className={clsx(`${prefixCls}-item`, className)}
      style={{ ...spanStyle, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
};

Item.displayName = 'GridItem';

export default Item;
