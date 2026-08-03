import { WrapedColumnProps } from '../interface';

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
