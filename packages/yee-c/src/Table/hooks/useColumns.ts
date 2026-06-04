import React, { useMemo } from 'react';
import deepClone from '../../utils/deepClone';
import useDeepCompareEffect from '../../hooks/useDeepCompareEffect';
import useDeepCompareMemo from '../../hooks/useDeepCompareMemo';
import { handleColumns } from '../util';

import { ColumnProps, RowSelectionType, ExpandableType } from '../interface';

export default function useColumns({
  children,
  columns,
  rowSelection,
  expandable,
}: {
  children?: React.ReactElement<ColumnProps> | React.ReactElement<ColumnProps>[];
  columns: ColumnProps[];
  rowSelection?: RowSelectionType;
  expandable?: ExpandableType;
}) {
  const shouldRenderSelection = !!rowSelection;
  const shouldRenderExpand = !!expandable;


  const getColumnsFromChild = (
    children: React.ReactElement<ColumnProps>[],
  ): Array<ColumnProps> | null => {
    const columns: ColumnProps[] = [];
    React.Children.forEach(children, (child) => {
      if (child) {
        columns.push({ ...child.props as ColumnProps });
      }
    });
    return columns.length ? columns : null;
  };

  const childColumns: Array<ColumnProps> | null = useMemo(() => {
    return children ? getColumnsFromChild(children as React.ReactElement<ColumnProps>[]) : null;
  }, [children]);

  // Wrap columns
  const wrapColumns = (columns: Array<ColumnProps>) => {
    let result = deepClone(columns);
    if (rowSelection) {
      const { index = 1 } = rowSelection;
      const loc = index - 1;
      result.splice(loc, 0, {
        width: 50,
        ...rowSelection,
        key: 'YEE_SELECTION_COL',
      });
    }
    if (expandable) {
      const { index = 1, visible = true } = expandable;
      const loc = index ? index - 1 : rowSelection ? 1 : 0;
      if (visible !== false) {
        result.splice(loc, 0, { width: 50, ...expandable, key: 'YEE_EXPAND_COL' });
      }
    }
    result = handleColumns(result);
    return result;
  };

  // const [mergedColumns, setMergedColumns] = React.useState(
  //   wrapColumns(childColumns || columns || []),
  // );

  // useDeepCompareEffect(() => {
  //   const merged = wrapColumns(childColumns || columns || []);
  //   setMergedColumns(merged);
  // }, [childColumns, columns, shouldRenderSelection, shouldRenderExpand]);

  const mergedColumns = useDeepCompareMemo(() => {
    return wrapColumns(childColumns || columns || []);
  },[childColumns, columns, shouldRenderSelection, shouldRenderExpand]);

  return {
    wrapedColumns: mergedColumns,
    columns: childColumns || columns,
  };
}
