import clsx from 'clsx';
import React, { memo, useContext } from 'react';
import Checkbox from '../../Checkbox';
import type { HeaderCell } from '../interface';
import { TableCtx } from '../table';
import HeadCell from './cell';

export interface TableHeadProps {
  /**
   * Resolved 2D header rows (one array per header row), produced by parseHeaderRows
   */
  headerRows?: HeaderCell[][];
}

const TableHead: React.FC<any> = (props) => {
  const { headerRows = [], onCheckAll, checkedAll, onHeaderRow, ...rest } =
    props;

  const { prefixCls } = useContext(TableCtx);

  const renderCell = (
    cell: HeaderCell,
    rowIndex: number,
    colIndex: number,
  ) => {
    const { column, colSpan, rowSpan } = cell;
    const { key, type, visible } = column;
    const cellKey =
      'title-column-' +
      (column.key || column.dataIndex || `${rowIndex}-${colIndex}`);

    if (key === 'YEE_SELECTION_COL') {
      return (
        <th
          className={`${prefixCls}-cell ${prefixCls}-selection-col`}
          scope="col"
          key={cellKey}
          colSpan={colSpan}
          rowSpan={rowSpan}
        >
          {type === 'checkbox' ? (
            <Checkbox checked={checkedAll} onChange={onCheckAll} />
          ) : null}
        </th>
      );
    }
    if (key === 'YEE_EXPAND_COL' && visible !== false) {
      return (
        <th
          className={clsx(`${prefixCls}-cell`, `${prefixCls}-expand-col`)}
          scope="col"
          key={cellKey}
          colSpan={colSpan}
          rowSpan={rowSpan}
        />
      );
    }
    return (
      <HeadCell
        {...rest}
        {...column}
        colSpan={colSpan}
        rowSpan={rowSpan}
        key={cellKey}
      />
    );
  };

  return (
    <thead className={clsx(`${prefixCls}-thead`)}>
      {headerRows.map((row: HeaderCell[], rowIndex: number) => {
        const rowColumns = row.map((cell) => cell.column);
        const rowProps = onHeaderRow ? onHeaderRow(rowColumns) : {};
        return (
          <tr {...rowProps} key={`thead-row-${rowIndex}`}>
            {row.map((cell, colIndex) =>
              renderCell(cell, rowIndex, colIndex),
            )}
          </tr>
        );
      })}
    </thead>
  );
};

const Row = (props: any) => {
  const { children, ...rest } = props;
  return <tr {...rest}>{children}</tr>;
};

type HeadType = typeof TableHead & {
  Row: typeof Row;
  Cell: typeof HeadCell;
};

const Head = TableHead as HeadType;

Head.Row = Row;
Head.Cell = HeadCell;

export default memo(Head);
