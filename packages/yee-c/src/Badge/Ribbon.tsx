import clsx from 'clsx';
import React, { FC } from 'react';
import type { RibbonProps } from './interface';

const Ribbon: FC<RibbonProps> = (props) => {
  const {
    prefixCls = 'yee-badge-ribbon',
    className,
    style,
    text,
    placement = 'end',
    color,
    children,
  } = props;

  const cls = clsx(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-placement-${placement}`]: placement,
    },
    className,
  );

  return (
    <div className={cls} style={style}>
      {children}
      <div
        className={`${prefixCls}-content`}
        style={{ backgroundColor: color }}
      >
        <div className={`${prefixCls}-title`}>{text}</div>
        <div className={`${prefixCls}-corner`} />
      </div>
    </div>
  );
};

Ribbon.displayName = 'Badge.Ribbon';

export default Ribbon;
