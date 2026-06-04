import { motion } from 'motion/react';
import React, { useContext, useState } from 'react';
import { ExpandableType } from '../interface';
import { TableCtx } from '../table';

export interface TableExpandRowProps extends ExpandableType {
  record: Record<string, any>;
  current: number;
  pageSize: number;
  index: number;
  expanded?: boolean;
}

const TableExpandRow: React.FC<TableExpandRowProps> = (props) => {
  const {
    expandedRowRender,
    rowExpandable,
    record,
    index,
    current,
    pageSize,
    expanded,
  } = props;

  const { prefixCls } = useContext(TableCtx);
  const [mounted, setMounted] = useState(expanded);

  const expandable = rowExpandable?.(record);

  if (expandable === false) {
    return null;
  }

  if (!mounted && expanded) {
    setMounted(true);
  }

  if (!mounted) {
    return null;
  }

  const renderExpandRow = () => {
    return typeof expandedRowRender === 'function'
      ? expandedRowRender(record, index, {
          order: (current - 1) * pageSize + index + 1,
        })
      : expandedRowRender;
  };

  return mounted ? (
    <motion.tr
      initial={{ opacity: 0, height: 0 }}
      animate={
        expanded ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }
      }
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.15 }}
      className={`${prefixCls}-expanded-row`}
      style={{ overflow: 'hidden', display: expanded ? 'table-row' : 'none' }}
    >
      <td colSpan={999}>{renderExpandRow()}</td>
    </motion.tr>
  ) : null;
};

export default TableExpandRow;
