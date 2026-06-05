import clsx from 'clsx';
import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { DividerProps } from './interface';
import './style/index.less';

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (baseprops, ref) => {
    const { divider } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, divider);
    const {
      prefixCls = 'yee-divider',
      children,
      className,
      style,
      classNames,
      styles,
      orientation = 'center',
      type = 'horizontal',
      variant = 'solid',
      ...rest
    } = props;

    const cls = clsx(
      prefixCls,
      `${prefixCls}-${variant}`,
      `${prefixCls}-${type}`,
      {
        [`${prefixCls}-with-text`]: children,
        [`${prefixCls}-with-text-${orientation}`]: children,
      },
      className,
    );

    return (
      <div {...rest} className={cls} style={style} ref={ref}>
        {children && (
          <span
            className={clsx(
              `${prefixCls}-inner-text`,
              `${prefixCls}-inner-text-${orientation}`,
              classNames?.text,
            )}
            style={styles?.text}
          >
            {children}
          </span>
        )}
      </div>
    );
  },
);

Divider.displayName = 'Divider';

export default Divider;
