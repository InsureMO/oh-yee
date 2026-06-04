import clsx from 'clsx';
import React from 'react';
import Pagination, { PaginationProps } from '../Pagination';

export interface TableFooterProps {
  prefixCls: string;
  pagination?: PaginationProps | false;
  footer?: React.ReactNode | (() => React.ReactNode);
  classNames?: Record<string, string>;
  styles?: Record<string, React.CSSProperties>;
}

const TableFooter: React.FC<TableFooterProps> = React.memo(
  (props: TableFooterProps) => {
    const { prefixCls, footer, pagination, classNames, styles } = props;
    const showFooter = pagination || footer;

    if (!showFooter) return null;

    return (
      <div
        className={clsx(`${prefixCls}-footer`, classNames?.footer)}
        style={styles?.footer}
      >
        {footer && (typeof footer === 'function' ? footer() : footer)}
        {pagination && (
          <Pagination className={`${prefixCls}-pagination`} {...pagination} />
        )}
      </div>
    );
  },
);

TableFooter.displayName = 'TableFooter';

export default TableFooter;
