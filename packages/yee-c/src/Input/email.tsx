import { Mail } from 'lucide-react';
import React, { forwardRef, useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import Input from './input';
import type { EmailProps } from './interface';

const Email = forwardRef<HTMLInputElement, EmailProps>((baseProps, ref) => {
  const { email } = useContext(GlobalContext);
  const props = mergeContextToProps(baseProps, email);

  const { prefixCls = 'yee-input-email', suffix, ...rest } = props;

  const defaultSuffix = <Mail size={16} />;
  const mergedSuffix = suffix !== undefined ? suffix : defaultSuffix;

  return (
    <Input
      suffix={mergedSuffix}
      {...rest}
      ref={ref}
      className={prefixCls}
      type="email"
    />
  );
});

export default Email;
