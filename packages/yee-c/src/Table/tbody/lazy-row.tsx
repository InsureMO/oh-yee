import * as React from 'react';
import TableRow from './row';
const createBlank = (size: number, key: string) => {
  return size
    ? [<tr style={{ height: `${size * 47}px`, width: '100%' }} key={key}></tr>]
    : [];
};
const LazyRow = (props: any) => {
  const { range, pageData, columns, ...rest } = props;
  const { start, end } = range;
  let result: any = [];
  const pl = pageData.length;
  const startBlank = createBlank(start, 'row-start');
  result = result.concat(startBlank);

  for (let i = start; i < (end > pl ? pl : end); i++) {
    result.push(
      <TableRow
        {...rest}
        columns={columns}
        record={pageData[i]}
        index={i}
        key={'row-' + i}
      />,
    );
  }
  const maxLength = end > pl ? 0 : pl - end;
  const endBlank = createBlank(maxLength, 'row-end');
  result = result.concat(endBlank);
  return result;
};

export default LazyRow;
