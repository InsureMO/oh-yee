import clsx from 'clsx';
import React, { forwardRef, useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { LabelProps } from './interface';

const Label = forwardRef<HTMLLabelElement, LabelProps>((baseprops, ref) => {
  const { label } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, label);
  const { prefixCls = 'yee-label', className, style, children, ...rest } = props;

  return (
    <label
      ref={ref}
      className={clsx(prefixCls, className)}
      style={style}
      {...rest}
    >
      {children}
    </label>
  );
});

Label.displayName = 'Label';

export default Label;
