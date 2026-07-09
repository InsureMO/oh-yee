import React from 'react';
import { useLocale } from '../../locale';
import { TableBodyProps } from '../interface';
import { TableCtx } from '../table';
import LazyRow from './lazy-row';
import TableRow from './row';

const TableBody: React.FC<TableBodyProps> = (props) => {
  const { columns, pageData, lazyLoad, ...rest } = props;

  const { prefixCls, components, rowKey } = React.useContext(TableCtx);
  const { locale } = useLocale();
  const { table: tableLocale } = locale;

  const empty = (
    <tbody className={`${prefixCls}-tbody`}>
      <tr className={`${prefixCls}-no-record`}>
        <td colSpan={999}>{tableLocale.emptyText}</td>
      </tr>
    </tbody>
  );

  const dataLength = pageData.length;
  if (dataLength === 0) return empty;

  const BodyWrapper = components?.body?.tbody ?? 'tbody';
  const RowRenderer = components?.body?.row;

  const resolveRowKey = (record: Record<string, any>) =>
    typeof rowKey === 'function' ? rowKey(record) : record[rowKey];

  const getRenderRows = () => {
    if (lazyLoad) {
      return <LazyRow {...rest} pageData={pageData} columns={columns} />;
    }
    return pageData.map((record: Record<string, any>, index: number) => {
      // 整行接管：由外部组件渲染 <tr> + 单元格（可放拖拽手柄等）
      if (RowRenderer) {
        const rk = resolveRowKey(record);
        return (
          <RowRenderer
            key={rk ?? index}
            record={record}
            index={index}
            columns={columns}
            rowKey={rk}
          />
        );
      }
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

  const tbody = (
    <BodyWrapper className={`${prefixCls}-tbody`}>{getRenderRows()}</BodyWrapper>
  );

  return tbody;
};

export default TableBody;
