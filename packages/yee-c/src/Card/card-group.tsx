import clsx from 'clsx';
import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { CardGroupProps } from './interface';
import './style/index.less';

const CardGroup: React.FC<CardGroupProps> = (baseprops) => {
  const { cardgroup } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, cardgroup);

  const {
    prefixCls = 'yee-card-group',
    children,
    className,
    inner,
    ...rest
  } = props;

  const cls = clsx(
    prefixCls,
    {
      [`${prefixCls}-inner`]: inner,
    },
    className,
  );

  return (
    <div {...rest} className={cls}>
      {children}
    </div>
  );
};

export default CardGroup;
