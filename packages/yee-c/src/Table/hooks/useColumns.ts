import React, { useMemo } from 'react';
import deepClone from '../../utils/deepClone';
import { handleColumns } from '../util';
import {
  flattenLeafColumns,
  injectSelectionExpand,
  parseHeaderRows,
} from '../util/header';

import type {
  ColumnProps,
  ExpandableType,
  RowSelectionType,
  WrapedColumnProps,
} from '../interface';

const getColumnsFromChild = (
  childs: React.ReactElement<ColumnProps>[],
): Array<ColumnProps> | null => {
  const cols: ColumnProps[] = [];
  React.Children.forEach(childs, (child) => {
    if (child) {
      cols.push({ ...(child.props as ColumnProps) });
    }
  });
  return cols.length ? cols : null;
};

export default function useColumns({
  children,
  columns,
  rowSelection,
  expandable,
}: {
  children?:
    | React.ReactElement<ColumnProps>
    | React.ReactElement<ColumnProps>[];
  columns: ColumnProps[];
  rowSelection?: RowSelectionType;
  expandable?: ExpandableType;
}) {
  const childColumns: Array<ColumnProps> | null = useMemo(() => {
    return children
      ? getColumnsFromChild(children as React.ReactElement<ColumnProps>[])
      : null;
  }, [children]);

  // Build the column tree (with selection/expand injected at the top level),
  // then derive both the flat leaf columns (body/colgroup/summary/sorter) and
  // the 2D header rows (thead multi-level rendering).
  const { wrapedColumns, headerRows } = useMemo(() => {
    const base = (deepClone(childColumns || columns || []) ||
      []) as WrapedColumnProps[];
    const tree = injectSelectionExpand(base, rowSelection, expandable);
    const leaves = flattenLeafColumns(tree);
    const wraped = handleColumns(leaves);
    const rows = parseHeaderRows(tree, wraped);
    return { wrapedColumns: wraped, headerRows: rows };
  }, [childColumns, columns, rowSelection, expandable]);

  return {
    wrapedColumns,
    headerRows,
  };
}
