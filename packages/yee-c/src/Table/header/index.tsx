import clsx from 'clsx';
import React from 'react';
// import CSVDownload from '../../CSV';
// import ColumnFilter from './column-filter';
import { HeaderProps } from '../interface';

// const getCSVData = (
//   data: Array<Record<string, any>>,
//   columns: Array<ColumnProps>,
// ) => {
//   const headers = {} as Record<string, any>;
//   columns
//     .filter((column) => column.title)
//     .forEach(
//       (column) => (headers[column.dataIndex || 'Unnamed'] = column.title),
//     );

//   const t = [] as Array<any>;
//   data.forEach((item) => {
//     const ti = {} as Record<string, any>;
//     Object.entries(item).forEach(([key, value]) => {
//       if (headers[key]) {
//         ti[headers[key]] = value;
//       }
//     });
//     t.push(ti);
//   });
//   return t;
// };

export default function Header(props: HeaderProps) {
  const { prefixCls, header, classNames, styles } = props;

  if (!header) return null;

  let headerNode: React.ReactNode;
  if (header) {
    headerNode = typeof header === 'function' ? header() : header;
  }

  return (
    <div
      className={clsx(`${prefixCls}-header`, classNames?.header)}
      style={styles?.header}
    >
      {headerNode}
    </div>
  );
}
