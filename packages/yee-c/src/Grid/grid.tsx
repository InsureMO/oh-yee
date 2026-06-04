import clsx from 'clsx';
import React, { forwardRef, useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import { useBreakpoint } from '../hooks';
import mergeContextToProps from '../utils/mergeContextToProps';
import omit from '../utils/omit';
import Item from './item';
import type { GridItemProps, GridProps } from './interface';
import './style/index.less';

const WRAPPERCOMPONENTS = ['Tooltip', 'Popover', 'Popconfirm', 'Dropdown'];

const flattenFragments = (children: React.ReactNode): React.ReactElement[] => {
  const result: React.ReactElement[] = [];
  React.Children.forEach(children, (child) => {
    if (!child) return;
    if (React.isValidElement(child) && child.type === React.Fragment) {
      // Recursively expand Fragments
      result.push(...flattenFragments((child as React.ReactElement<{ children: React.ReactNode }>).props.children));
    } else {
      result.push(child as React.ReactElement);
    }
  });
  return result;
};


const Grid = forwardRef<HTMLDivElement, GridProps>(
  (baseprops, ref) => {
    const { grid } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, grid);
    const {
      id,
      prefixCls = 'yee-grid',
      style,
      className,
      children,
      cols = 4,
      colGap,
      rowGap,
      gap = 16,
    } = props;

    const isMobile = useBreakpoint();

    const resolvedCols = typeof cols === 'object'
      ? (isMobile ? (cols.mobile ?? 1) : (cols.desktop ?? 4))
      : cols;

    const cls = clsx(prefixCls, [`${prefixCls}-columns-${resolvedCols}`], className);

    const _rowGap = rowGap ?? gap;
    const _colGap = colGap ?? gap;

    const styles = {
      rowGap: _rowGap ? _rowGap + 'px' : undefined,
      columnGap: _colGap ? _colGap + 'px' : undefined,
      ...style,
    };

    const total = resolvedCols + 1;
    let countIndex = 1;

    const items = flattenFragments(children);

    return (
      <div className={cls} style={styles} id={id} ref={ref} role="grid">
        {items.map((_child, index: number) => {
          if (!_child) return null;
          let child = _child as React.ReactElement<GridItemProps>;

          let {
            props: { colspan, rowspan },
          } = child;

          // Check if wrapped by overlay components like Tooltip/Popover
          let isWrappedByOverlay = false;
          let innerChild: React.ReactElement | null = null;

          if (typeof child.type === 'object' && child.type !== null && WRAPPERCOMPONENTS.includes((child.type as any).displayName)) {
            innerChild = child.props.children as React.ReactElement<GridItemProps>;
            const childProps = innerChild.props as GridItemProps;
            colspan = childProps.colspan ?? colspan;
            rowspan = childProps.rowspan ?? rowspan;
            isWrappedByOverlay = true;
          }

          const childProps = child.props;
          let itemStyles: Record<string, unknown> = {};
          if (colspan) {
            let _start = countIndex;
            let _end = _start + colspan;

            const offset = _end - _start;

            if (offset + countIndex > total) {
              _start = 1;
              _end = 1 + offset;

              if (_end > total) {
                _end = total;
              }
            }

            countIndex = _end;
            itemStyles = { gridColumnStart: _start, gridColumnEnd: _end };
          } else {
            countIndex++;
          }

          countIndex = countIndex >= total ? 1 : countIndex;
          if (rowspan) {
            itemStyles = {
              ...itemStyles,
              gridRowStart: rowspan.start,
              gridRowEnd: rowspan.end,
            };
          }

          if (Object.keys(itemStyles).length !== 0) {
            const omited = omit(childProps, ['rowspan', 'colspan']);
            child = React.cloneElement(child, {
              ...omited,
            });
          }
          
          // If child is already a Grid.Item, pass spanStyle directly to avoid double wrapping
          const isGridItem = child.type === Item;
          const isWrappedGridItem = isWrappedByOverlay && innerChild?.type === Item;

          if (isGridItem) {
            return React.cloneElement(child, {
              key: index,
              prefixCls,
              spanStyle: { ...itemStyles, ...(child.props.spanStyle as Record<string, unknown>) },
            } as Partial<GridItemProps>);
          }

          if (isWrappedGridItem && innerChild) {
            return React.cloneElement(child, {
              key: index,
              children: React.cloneElement(innerChild, {
                prefixCls,
                spanStyle: { ...itemStyles, ...((innerChild.props as GridItemProps).spanStyle as Record<string, unknown>) },
              } as Partial<GridItemProps>),
            });
          }

          return (
            <Item prefixCls={prefixCls} spanStyle={itemStyles} key={index}>
              {child}
            </Item>
          );
        })}
      </div>
    );
  },
);

Grid.displayName = 'Grid';

export default Grid;
