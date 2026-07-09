import type {
  ColumnProps,
  ExpandableType,
  HeaderCell,
  RowSelectionType,
  WrapedColumnProps,
} from '../interface';

type FixedType = ColumnProps['fixed'];

/**
 * Recursively flatten a (possibly grouped) column tree into its leaf columns.
 * A parent's `fixed` is inherited by its children when the child does not set its own.
 */
export function flattenLeafColumns(
  columns: WrapedColumnProps[],
  parentFixed?: FixedType,
): WrapedColumnProps[] {
  return columns.reduce<WrapedColumnProps[]>((list, column) => {
    const fixed = column.fixed ?? parentFixed;
    const subColumns = column.children as WrapedColumnProps[] | undefined;
    if (subColumns && subColumns.length > 0) {
      return [...list, ...flattenLeafColumns(subColumns, fixed)];
    }
    return [...list, { ...column, fixed }];
  }, []);
}

/**
 * Convert a column tree into a 2D array of header cells (one array per header row),
 * computing each cell's colSpan/rowSpan. Mirrors rc-table's parseHeaderRows.
 *
 * - Pass 1 (DFS): place each column into the row matching its depth; a group's
 *   colSpan equals the sum of its children's colSpans.
 * - Pass 2: leaf cells (no sub-columns) get rowSpan = rowCount - rowIndex so
 *   they stretch down to the last header row; group cells keep rowSpan = 1.
 */
export function parseHeaderRows(
  rootColumns: WrapedColumnProps[],
): HeaderCell[][] {
  const rows: HeaderCell[][] = [];

  const fillRowCells = (
    columns: WrapedColumnProps[],
    rowIndex: number,
  ): number => {
    rows[rowIndex] = rows[rowIndex] || [];
    let colSpanTotal = 0;
    columns.filter(Boolean).forEach((column) => {
      const cell: HeaderCell = {
        column,
        colSpan: 1,
        rowSpan: 1,
      };
      const subColumns = column.children as WrapedColumnProps[] | undefined;
      if (subColumns && subColumns.length > 0) {
        cell.colSpan = fillRowCells(subColumns, rowIndex + 1);
        cell.hasSubColumns = true;
      }
      rows[rowIndex].push(cell);
      colSpanTotal += cell.colSpan;
    });
    return colSpanTotal;
  };

  fillRowCells(rootColumns, 0);

  const rowCount = rows.length;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    rows[rowIndex].forEach((cell) => {
      // Leaf cells stretch to the bottom row; group cells stay at rowSpan = 1.
      if (!cell.hasSubColumns) {
        cell.rowSpan = rowCount - rowIndex;
      }
    });
  }

  return rows;
}

/**
 * Inject selection / expand columns into the top level of the column tree.
 * `index` is a 1-based position among the top-level columns.
 */
export function injectSelectionExpand(
  columns: WrapedColumnProps[],
  rowSelection?: RowSelectionType,
  expandable?: ExpandableType,
): WrapedColumnProps[] {
  const result = [...columns];
  if (rowSelection) {
    const { index = 1 } = rowSelection;
    result.splice(index - 1, 0, {
      width: 50,
      ...rowSelection,
      key: 'YEE_SELECTION_COL',
    } as WrapedColumnProps);
  }
  if (expandable) {
    const { index = 1, visible = true } = expandable;
    const loc = index ? index - 1 : rowSelection ? 1 : 0;
    if (visible !== false) {
      result.splice(loc, 0, {
        width: 50,
        ...expandable,
        key: 'YEE_EXPAND_COL',
      } as WrapedColumnProps);
    }
  }
  return result;
}
