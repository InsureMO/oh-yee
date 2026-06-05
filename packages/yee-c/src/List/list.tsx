import clsx from 'clsx';
import React, { createContext, forwardRef, useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { ListCtxType, ListProps } from './interface';
import ListItem from './list-item';

import './style/index.less';

export const ListCtx = createContext({} as ListCtxType);

const List = forwardRef<HTMLUListElement, ListProps>((baseprops, ref) => {
  const { list } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, list);

  const {
    prefixCls = 'yee-list',
    className,
    items,
    bordered,
    focusedKey,
    itemRender,
    onClick,
    ...rest
  } = props;

  const cls = clsx(
    prefixCls,
    {
      [`${prefixCls}-bordered`]: bordered,
    },
    className,
  );

  const itemRenders = () => {
    return Array.isArray(items)
      ? items.map((item, index) => {
          if (typeof itemRender === 'function') {
            return itemRender(item);
          }
          return <ListItem {...item} $key={item.key} key={item.key || index} />;
        })
      : null;
  };

  return (
    <ul ref={ref} className={cls} tabIndex={0} aria-label="list" {...rest}>
      <ListCtx.Provider
        value={{
          prefixCls,
          focusedKey,
          onClick: onClick,
        }}
      >
        {itemRenders()}
      </ListCtx.Provider>
    </ul>
  );
});

List.displayName = 'List';

export default List;
