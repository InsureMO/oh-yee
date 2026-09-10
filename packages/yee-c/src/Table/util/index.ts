import { ColumnProps, WrapedColumnProps } from '../interface';

/**
 * Stable identity for a leaf column, used to key its resized width.
 *
 * `key`/`dataIndex` survive re-ordering and data changes, so they are preferred.
 * Columns declaring neither fall back to their position, which is the best that
 * can be done without asking the caller for an id.
 */
export function getColumnResizeKey(column: ColumnProps, index: number) {
  const id = column.key ?? column.dataIndex;
  return id === undefined || id === null || id === ''
    ? `index:${index}`
    : `id:${id}`;
}

/**
 * Stamp every leaf column with its `resizeKey`, resolve whether it is resizable
 * (column level setting wins over the table level one) and override `width` with
 * the dragged value when there is one.
 *
 * This runs before `handleColumns` so that the colgroup, the header cells, the
 * body cells and the sticky offsets of fixed columns all read the same width
 * from a single place.
 */
export function applyColumnResize(
  columns: Array<WrapedColumnProps>,
  resizable?: boolean,
  resizedWidths?: Record<string, number>,
) {
  return columns.map((column, index) => {
    const resizeKey = getColumnResizeKey(column, index);
    const resizedWidth = resizedWidths?.[resizeKey];
    const next: WrapedColumnProps = {
      ...column,
      resizeKey,
      resizable: column.resizable ?? resizable ?? false,
    };
    if (Number.isFinite(resizedWidth) && (resizedWidth as number) > 0) {
      next.width = resizedWidth;
    }
    return next;
  });
}

const getColumnWidth = (
  column: WrapedColumnProps,
  index: number,
  measuredColumnWidths?: number[],
) => {
  const measuredWidth = measuredColumnWidths?.[index];
  if (Number.isFinite(measuredWidth) && measuredWidth && measuredWidth > 0) {
    return measuredWidth;
  }

  if (typeof column.width === 'number') {
    return column.width;
  }

  if (
    typeof column.width === 'string' &&
    /^\s*\d+(?:\.\d+)?px\s*$/.test(column.width)
  ) {
    return Number.parseFloat(column.width);
  }

  return 0;
};

export function handleColumns(
  columns: Array<WrapedColumnProps>,
  measuredColumnWidths?: number[],
) {
  let leftWidthCount = 0;
  let rightWidthCount = 0;

  for (let i = 0; i < columns.length; i++) {
    const col = columns[i] || ({} as WrapedColumnProps);
    if (col.fixed === true || col.fixed === 'left') {
      col.fixed = 'left';
      col.style = { ...col.style, left: leftWidthCount };
      const nextFixed = columns[i + 1]?.fixed;
      const nextIsFixedLeft = nextFixed === true || nextFixed === 'left';
      if (!nextIsFixedLeft) {
        col.isFixedLeftLast = true;
      }
      leftWidthCount += getColumnWidth(col, i, measuredColumnWidths);
    }
  }

  for (let j = columns.length - 1; j >= 0; j--) {
    const col = columns[j] || ({} as WrapedColumnProps);
    if (col.fixed === 'right') {
      col.style = { ...col.style, right: rightWidthCount };
      if (columns[j - 1]?.fixed !== 'right') {
        col.isFixedRightFirst = true;
      }
      rightWidthCount += getColumnWidth(col, j, measuredColumnWidths);
    }
  }
  return columns;
}
