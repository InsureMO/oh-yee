import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import { WrapedColumnProps } from '../interface';
import { TableCtx } from '../table';

export interface BodyCellProps {
  rowIndex: number;
  column: WrapedColumnProps;
  record: Record<string, any>;
  fixedToLeft?: number;
  current: number;
  pageSize: number;
}

const TableCell: React.FC<BodyCellProps> = (props) => {
  const { column, record, rowIndex } = props;
  const {
    fixed,
    isFixedLeftLast,
    isFixedRightFirst,
    dataIndex,
    align,
    width,
    style,
    className,
    styles,
    classNames,
    onCell,
    render,
  } = column;

  const { prefixCls } = useContext(TableCtx);

  const renderChildren = () => {
    if (render) {
      return typeof render === 'function' ? render(record, rowIndex) : render;
    }
    return (
      <div
        className={clsx(`${prefixCls}-cell-inner`, classNames?.inner)}
        style={styles?.inner}
      >
        {record[dataIndex || '']}
      </div>
    );
  };

  const cellProperty = (onCell?.(record, rowIndex) || {}) as any;

  if (cellProperty.rowSpan === 0) {
    return null;
  }

  const _children = renderChildren();

  const getTdProps = () => {
    const title = render ? undefined : record[dataIndex || ''];
    const cls = clsx(
      `${prefixCls}-cell`,
      {
        [`${prefixCls}-cell-fixed-${fixed}`]: fixed,
        [`${prefixCls}-cell-fixed-${fixed}-first`]: isFixedRightFirst,
        [`${prefixCls}-fixed-${fixed}-last`]: isFixedLeftLast,
      },
      className,
    );

    const styles = { ...style, width, maxWidth: width, textAlign: align };
    const _title = typeof title === 'string' ? title : undefined;

    return {
      ...cellProperty,
      className: cls,
      style: styles,
      title: _title,
    };
  };

  return <td {...getTdProps()}>{_children}</td>;
};

export default TableCell;
