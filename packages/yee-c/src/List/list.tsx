import clsx from 'clsx';
import React, { createContext, forwardRef, useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import useVirtualList from '../hooks/useVirtualList';
import mergeContextToProps from '../utils/mergeContextToProps';
import useListKeyboard from './hooks/useListKeyboard';
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
    style,
    items,
    bordered,
    focusedKey: controlledFocusedKey,
    itemRender,
    onClick,
    onFocusChange,
    virtual = false,
    height,
    itemHeight = 32,
    columns = 1,
    ...rest
  } = props;

  const multiColumn = columns > 1;
  const useVirtual =
    virtual && height !== null && height !== undefined && Array.isArray(items);
  const safeItems = Array.isArray(items) ? items : [];

  // Keyboard navigation
  const { focusedKey, onKeyDown } = useListKeyboard({
    items: safeItems,
    columns,
    focusedKey: controlledFocusedKey,
    onFocusChange,
    onClick,
  });

  // Virtual scroll — in multi-column mode, track rows not individual items
  const rowCount = multiColumn
    ? Math.ceil(safeItems.length / columns)
    : safeItems.length;

  const { start, end, offsetY, totalHeight, viewportRef, onScroll } =
    useVirtualList({
      itemCount: useVirtual ? rowCount : 0,
      itemHeight,
      overscan: 4,
    });

  const cls = clsx(
    prefixCls,
    {
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-grid`]: multiColumn && !useVirtual,
    },
    className,
  );

  const renderItem = (item: any, index: number) => {
    if (typeof itemRender === 'function') {
      return itemRender(item);
    }
    return <ListItem {...item} $key={item.key} key={item.key || index} />;
  };

  // ----- Virtual + multi-column: render rows of N items -----
  if (useVirtual && multiColumn) {
    const visibleRows = [];
    for (let rowIdx = start; rowIdx < end; rowIdx++) {
      const rowItems = [];
      for (let col = 0; col < columns; col++) {
        const flatIdx = rowIdx * columns + col;
        if (flatIdx < safeItems.length) {
          rowItems.push({ item: safeItems[flatIdx], flatIdx });
        }
      }
      visibleRows.push({ rowIdx, rowItems });
    }

    return (
      <ul
        ref={ref}
        className={cls}
        tabIndex={0}
        aria-label="list"
        onKeyDown={onKeyDown}
        {...rest}
      >
        <ListCtx.Provider value={{ prefixCls, focusedKey, onClick }}>
          <div
            ref={viewportRef}
            onScroll={onScroll}
            style={{ height, overflowY: 'auto' }}
          >
            <div style={{ height: totalHeight, position: 'relative' }}>
              {visibleRows.map(({ rowIdx, rowItems }, ri) => (
                <div
                  key={rowIdx}
                  className={`${prefixCls}-grid-row`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: itemHeight,
                    transform: `translateY(${offsetY + ri * itemHeight}px)`,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  }}
                >
                  {rowItems.map(({ item, flatIdx }) =>
                    renderItem(item, flatIdx),
                  )}
                </div>
              ))}
            </div>
          </div>
        </ListCtx.Provider>
      </ul>
    );
  }

  // ----- Virtual single-column -----
  if (useVirtual) {
    const slicedItems = safeItems.slice(start, end);
    return (
      <ul
        ref={ref}
        className={cls}
        tabIndex={0}
        aria-label="list"
        onKeyDown={onKeyDown}
        {...rest}
      >
        <ListCtx.Provider value={{ prefixCls, focusedKey, onClick }}>
          <div
            ref={viewportRef}
            onScroll={onScroll}
            style={{ height, overflowY: 'auto' }}
          >
            <div style={{ height: totalHeight, position: 'relative' }}>
              {slicedItems.map((item, i) => {
                const element = renderItem(item, start + i);
                return (
                  <div
                    key={item.key || start + i}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: itemHeight,
                      transform: `translateY(${offsetY + i * itemHeight}px)`,
                    }}
                  >
                    {element}
                  </div>
                );
              })}
            </div>
          </div>
        </ListCtx.Provider>
      </ul>
    );
  }

  // ----- Default mode (non-virtual) -----
  return (
    <ul
      ref={ref}
      className={cls}
      tabIndex={0}
      aria-label="list"
      onKeyDown={onKeyDown}
      style={
        multiColumn
          ? ({ '--yee-list-columns': columns, ...style } as React.CSSProperties)
          : style
      }
      {...rest}
    >
      <ListCtx.Provider value={{ prefixCls, focusedKey, onClick }}>
        {safeItems.map((item, index) => renderItem(item, index))}
      </ListCtx.Provider>
    </ul>
  );
});

List.displayName = 'List';

export default List;
