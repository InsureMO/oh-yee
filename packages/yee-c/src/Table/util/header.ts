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
 * - Fixed metadata from the resolved leaf columns is reused by leaf cells and
 *   aggregated for group cells whose descendants share the same fixed side.
 * - Pass 2: leaf cells (no sub-columns) get rowSpan = rowCount - rowIndex so
 *   they stretch down to the last header row; group cells keep rowSpan = 1.
 */
export function parseHeaderRows(
  rootColumns: WrapedColumnProps[],
  resolvedLeafColumns: WrapedColumnProps[] = flattenLeafColumns(rootColumns),
): HeaderCell[][] {
  const rows: HeaderCell[][] = [];
  let leafIndex = 0;

  const fillRowCells = (
    columns: WrapedColumnProps[],
    rowIndex: number,
  ): number => {
    rows[rowIndex] = rows[rowIndex] || [];
    let colSpanTotal = 0;
    columns.filter(Boolean).forEach((sourceColumn) => {
      let column = sourceColumn;
      const subColumns = sourceColumn.children as
        | WrapedColumnProps[]
        | undefined;
      const leafStartIndex = leafIndex;
      const cell: HeaderCell = {
        column,
        colSpan: 1,
        rowSpan: 1,
      };

      if (subColumns && subColumns.length > 0) {
        cell.colSpan = fillRowCells(subColumns, rowIndex + 1);
        cell.hasSubColumns = true;

        const groupLeaves = resolvedLeafColumns.slice(
          leafStartIndex,
          leafIndex,
        );
        const fixed = groupLeaves[0]?.fixed;
        const isFixedGroup =
          (fixed === 'left' || fixed === 'right') &&
          groupLeaves.every((leaf) => leaf.fixed === fixed);

        if (isFixedGroup) {
          const offsetLeaf =
            fixed === 'left'
              ? groupLeaves[0]
              : groupLeaves[groupLeaves.length - 1];
          const boundaryLeaf =
            fixed === 'left'
              ? groupLeaves[groupLeaves.length - 1]
              : groupLeaves[0];
          column = {
            ...sourceColumn,
            fixed,
            style: {
              ...sourceColumn.style,
              [fixed]: offsetLeaf.style?.[fixed],
            },
            isFixedLeftLast: fixed === 'left' && boundaryLeaf.isFixedLeftLast,
            isFixedRightFirst:
              fixed === 'right' && boundaryLeaf.isFixedRightFirst,
          };
          cell.column = column;
        }
      } else {
        column = resolvedLeafColumns[leafIndex] || sourceColumn;
        cell.column = column;
        leafIndex += 1;
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
