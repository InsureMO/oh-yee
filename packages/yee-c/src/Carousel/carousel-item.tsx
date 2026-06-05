import clsx from 'clsx';
import React from 'react';
import { CarouselCtx } from './carousel';
import type { CarouselItemProps } from './interface';

const CarouselItem = (props: CarouselItemProps) => {
  const { style, className, children, index } = props;
  const { prefixCls, current } = React.useContext(CarouselCtx);

  return (
    <div
      className={clsx(
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: index === current - 1,
        },
        className,
      )}
      data-index={index}
      style={style}
    >
      {children}
    </div>
  );
};

export default CarouselItem;
