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
  const {
    prefixCls,
    header,
    // columnFilter,
    download,
    // pageData,
    // dataSource,
    // columns,
    classNames,
    styles,
  } = props;

  if (!header && !download) return null;

  let renderHeader: React.ReactNode;
  if (header) {
    renderHeader = typeof header === 'function' ? header() : header;
  }

  const renderDownload = () => {
    if (!download) return null;
    // const def = {
    //   range: 'current',
    //   icon: 'Download',
    //   title: 'download',
    // };
    // const deps =
    //   typeof download === 'boolean'
    //     ? def
    //     : {
    //         ...def,
    //         ...(typeof download === 'function'
    //           ? download({
    //               columns: columns,
    //               pageData,
    //               data: dataSource,
    //             })
    //           : download),
    //       };

    // const dataInfo = {
    //   data: getCSVData(
    //     deps.range === 'current' ? pageData : dataSource,
    //     columns,
    //   ),
    // };
    // return <CSVDownload {...dataInfo} {...deps} />;
    return <span></span>;
  };

  const renderColumnFilter = () => {
    // if (!columnFilter) return null;
    // return (
    //   <ColumnFilter {...rest} columns={columns} columnFilter={columnFilter} />
    // );
    return null;
  };

  const renderActions = () => {
    // if (!columnFilter && !download) return null;
    return (
      <div className={`${prefixCls}-actionbar`}>
        {renderDownload()}
        {renderColumnFilter()}
      </div>
    );
  };

  return (
    <div
      className={clsx(`${prefixCls}-header`, classNames?.header)}
      style={styles?.header}
    >
      {renderHeader}
      {renderActions()}
    </div>
  );
}
