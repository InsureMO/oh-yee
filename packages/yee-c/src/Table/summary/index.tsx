import clsx from 'clsx';
import * as React from 'react';

import { TableCtx } from '../table';

const Summary = (props: any) => {
  const { children, fixed, className, style, ...rest } = props;

  const { prefixCls } = React.useContext(TableCtx);

  return (
    <tfoot
      {...rest}
      className={clsx(
        `${prefixCls}-summary`,
        { [`${prefixCls}-summary-fixed`]: fixed },
        className,
      )}
      style={style}
    >
      {children}
    </tfoot>
  );
};

const Row = (props: any) => {
  const { children, ...rest } = props;
  const cloned = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, { index });
  });
  return <tr {...rest}>{cloned}</tr>;
};

const Cell = (props: any) => {
  const { children, index, style, className, ...rest } = props;
  const { prefixCls, columns = [] } = React.useContext(TableCtx);
  const {
    fixed,
    isRightFixedFirst,
    isLeftFixedLast,
    style: innerStyle,
  } = columns[index] || {};

  const cls = clsx(
    'yee-table-cell',
    {
      [`${prefixCls}-fixed-${fixed}`]: fixed,
      [`${prefixCls}-fixed-${fixed}-first`]: isRightFixedFirst,
      [`${prefixCls}-fixed-${fixed}-last`]: isLeftFixedLast,
    },
    className,
  );
  const mergedStyle = { ...style, ...innerStyle };
  return (
    <td className={cls} style={mergedStyle} {...rest}>
      {children}
    </td>
  );
};

type SummaryType = typeof Summary & {
  Row: typeof Row;
  Cell: typeof Cell;
};

const InternalSummary = Summary as SummaryType;

InternalSummary.Row = Row;
InternalSummary.Cell = Cell;

export default InternalSummary;
