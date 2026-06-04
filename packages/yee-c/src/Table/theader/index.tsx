import clsx from 'clsx';
import React, { memo, useContext } from 'react';
import Checkbox from '../../Checkbox';
import { WrapedColumnProps } from '../interface';
import { TableCtx } from '../table';
import HeadCell from './cell';
import { HeadCellProps } from '../interface';

export interface TableHeadProps {
  children?: React.ReactNode;
  columns?: Array<HeadCellProps>;
  isExpandable?: boolean;
  expandedColumn?: number;
}

const TableHead: React.FC<any> = (props) => {
  const { columns, onCheckAll, checkedAll, onHeaderRow, ...rest } = props;

  const { prefixCls } = useContext(TableCtx);

  const renderHeadCell = () => {
    return columns.map((column: WrapedColumnProps, index: number) => {
      const { key, type, width, visible } = column;
      if (key === 'YEE_SELECTION_COL') {
        const common = {
          className: `${prefixCls}-cell ${prefixCls}-selection-col`,
          scope: 'col',
          key: 'title-column-selection',
        };
        return (
          <th {...common} key={column.key || column.dataIndex}>
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
            key="title-column-expandable"
          ></th>
        );
      }
      return (
        <HeadCell
          {...rest}
          {...column}
          key={'title-column-' + (column.key || column.dataIndex || index)}
        />
      );
    });
  };

  const rowProps = onHeaderRow ? onHeaderRow(columns) : {};

  return (
    <thead className={clsx(`${prefixCls}-thead`)}>
      <tr {...rowProps} key="thead">
        {renderHeadCell()}
      </tr>
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
