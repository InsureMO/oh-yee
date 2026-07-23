import clsx from 'clsx';
import React from 'react';
import { CarouselCtx } from './carousel';
import type { CarouselItemProps } from './interface';

const CarouselItem = (props: CarouselItemProps) => {
  const { style, className, children, index } = props;
  const { prefixCls, current } = React.useContext(CarouselCtx);

  const isActive = index === current - 1;

  return (
    <div
      className={clsx(
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: isActive,
        },
        className,
      )}
      data-index={index}
      style={style}
      role="tabpanel"
      aria-roledescription="slide"
      aria-label={`Slide ${(index ?? 0) + 1}`}
      aria-hidden={!isActive}
    >
      {children}
    </div>
  );
};

export default CarouselItem;
