import clsx from 'clsx';
import React, { createRef, forwardRef } from 'react';
import { SpaceCompactProps } from './interface';

const Compact = forwardRef<HTMLDivElement, SpaceCompactProps>((props, ref) => {
  const {
    prefixCls = 'yee-space-compact',
    className,
    direction = 'horizontal',
    children,
    ...rest
  } = props;

  const componentRef = (ref as any) || createRef<HTMLDivElement>();

  const total = React.Children.count(children);

  const wrappered = React.Children.map(
    children,
    (child: React.ReactElement, index) => {
      if (React.isValidElement(child)) {
        const first = index === 0;
        const middle = index > 0 && index < total;
        const last = index > 0 && index === total - 1;
        const props = child.props as any;
        return React.cloneElement(child as any, {
          className: clsx(
            first
              ? `${prefixCls}-first-item`
              : middle
                ? `${prefixCls}-middle-item`
                : last
                  ? `${prefixCls}-last-item`
                  : `${prefixCls}-compact-item`,
            props.className,
          ),
        });
      }
    },
  );

  const cls = clsx(prefixCls, [`${prefixCls}-${direction}`], className);

  return (
    <div {...rest} className={cls} ref={componentRef}>
      {wrappered}
    </div>
  );
});

export default Compact;
