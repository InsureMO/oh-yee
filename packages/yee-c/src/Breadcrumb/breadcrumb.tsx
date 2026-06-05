import clsx from 'clsx';
import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import Item from './breadcrumb-item';
import type { BreadcrumbProps } from './interface';

import './style/index.less';

type BreadcrumbCtxType = {
  prefixCls?: string;
  separator?: React.ReactNode;
  total: number;
};

export const BreadcrumbCtx = React.createContext<BreadcrumbCtxType>({
  prefixCls: 'yee-breadcrumb',
  separator: '/',
  total: 0,
});

const Breadcrumb: React.FC<BreadcrumbProps> = (baseprops) => {
  const { breadcrumb } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, breadcrumb);
  const {
    prefixCls = 'yee-breadcrumb',
    children,
    separator = '/',
    className,
    style,
    items,
    classNames,
    styles,
    ...rest
  } = props;

  const total = children
    ? React.Children.count(children)
    : Array.isArray(items)
      ? items.length
      : 0;

  const renderItems = () => {
    if (children) {
      return children;
    }
    return items?.map((item, index) => (
      <Item
        {...item}
        index={index}
        key={item.href || `breadcrumb-item-${index}`}
      />
    ));
  };

  return (
    <nav
      {...rest}
      className={clsx(prefixCls, classNames?.list, className)}
      style={{ ...styles?.list, ...style }}
      role="navigation"
      aria-label="Breadcrumb navigation"
    >
      <BreadcrumbCtx.Provider value={{ prefixCls, separator, total }}>
        <ul className={`${prefixCls}-list`} role="list">
          {renderItems()}
        </ul>
      </BreadcrumbCtx.Provider>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
