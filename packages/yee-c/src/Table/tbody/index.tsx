import React from 'react';
import { TableBodyProps } from '../interface';
import { TableCtx } from '../table';
import LazyRow from './lazy-row';
import TableRow from './row';

const TableBody: React.FC<TableBodyProps> = (props) => {
  const { columns, pageData, lazyLoad, ...rest } = props;

  const { prefixCls } = React.useContext(TableCtx);

  const empty = (
    <tbody className={`${prefixCls}-tbody`}>
      <tr className={`${prefixCls}-no-record`}>
        <td colSpan={999}>{'There is no record.'}</td>
      </tr>
    </tbody>
  );

  const dataLength = pageData.length;
  if (dataLength === 0) return empty;

  const getRenderRows = () => {
    if (lazyLoad) {
      return <LazyRow {...rest} pageData={pageData} columns={columns} />;
    }
    return pageData.map((record: Record<string, any>, index: number) => {
      return (
        <TableRow
          {...rest}
          columns={columns}
          record={record}
          index={index}
          key={`row-${record.key || index}`}
        />
      );
    });
  };

  const tbody = <tbody className={`${prefixCls}-tbody`}>{getRenderRows()}</tbody>;

  return tbody;
};

export default TableBody;
