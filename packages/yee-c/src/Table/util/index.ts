import { WrapedColumnProps } from '../interface';

export function handleColumns(columns: Array<WrapedColumnProps>) {
  let leftWidthCount = 0;
  let rightWidthCount = 0;

  for (let i = 0; i < columns.length; i++) {
    const col = columns[i] || ({} as any);
    if (col.fixed === true || col.fixed === 'left') {
      col.fixed = 'left';
      col.style = { ...col.style, left: leftWidthCount };
      if (!columns[i + 1].fixed) {
        col.isFixedLeftLast = true;
      }
      leftWidthCount =
        leftWidthCount + (col.width ? parseFloat(col.width as string) : 0);
    }
  }

  for (let j = columns.length - 1; j >= 0; j--) {
    const col = columns[j] || ({} as any);
    if (col.fixed === 'right') {
      col.style = { ...col.style, right: rightWidthCount };
      if (columns[j - 1]?.fixed !== 'right') {
        col.isFixedRightFirst = true;
      }
      rightWidthCount =
        rightWidthCount + (col.width ? parseFloat(col.width as string) : 0);
    }
  }
  return columns;
}
