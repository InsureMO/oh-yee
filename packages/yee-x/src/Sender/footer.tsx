import React, { FC } from 'react';
import { SenderHeaderProps } from './interface';

const prefixCls = 'yee-sender-footer';

const Footer: FC<SenderHeaderProps> = (props) => {
  const { children } = props;

  if (!children) return null;

  return (
    <div className={`${prefixCls}`}>
      {children && <div className={`${prefixCls}-content`}>{children}</div>}
    </div>
  );
};

export default Footer;
