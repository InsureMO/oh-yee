import clsx from 'clsx';
import React from 'react';
import useResize from './hooks/useResize';
import { ResizeProps } from './interface';

import './style/index.less';

const Resize = (props: ResizeProps) => {
  const {
    prefixCls = 'yee-resize',
    className,
    style,
    width,
    children,
    placement = 'right',
    onResize,
  } = props;
  const { container, handler } = useResize({ onResize });

  return (
    <div
      className={clsx(
        prefixCls,
        [`${prefixCls}-handler-${placement}`],
        className,
      )}
      style={{ ...style, width }}
      ref={container}
    >
      {placement === 'left' ? (
        <div className={`${prefixCls}-handler`} ref={handler}></div>
      ) : null}
      {children}
      {placement === 'right' ? (
        <div className={`${prefixCls}-handler`} ref={handler}></div>
      ) : null}
    </div>
  );
};

export default Resize;
