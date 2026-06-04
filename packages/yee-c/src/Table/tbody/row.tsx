import clsx from 'clsx';
import { SquareMinus, SquarePlus } from 'lucide-react';
import React, { useCallback, useContext } from 'react';
import Button from '../../Button';
import Checkbox from '../../Checkbox';
import Radio from '../../Radio';
import { TableRowProps, WrapedColumnProps } from '../interface';
import BodyCell from './cell';
import ExpandRow from './expand-row';

import { TableCtx } from '../table';

const TableRow: React.FC<TableRowProps> = (props) => {
  const {
    index,
    record,
    columns,
    highlight,
    stripe,
    expandedKeyType,
    expandedRowKeys,
    selectedRowKeys,
    expandable,
    onExpand,
    onRow,
    rowClassName,
    rowStyle,
    onDoubleClick,
    onSelectionChange,
    ...rest
  } = props;

  const { prefixCls, rowKey } = useContext(TableCtx);

  const expanded = expandedRowKeys?.includes(
    expandedKeyType === 'index' ? index + 1 : record[rowKey],
  );

  const high = React.useMemo(() => {
    if (typeof highlight === 'undefined') return false;
    if (highlight === 'odd') {
      return index % 2 === 0;
    }
    if (highlight === 'even') {
      return index % 2 === 1;
    }
    return highlight.includes(index + 1);
  }, [highlight, index]);

  const handleExpand = () => {
    onExpand({
      expanded: !expanded,
      record,
      index,
    });
  };

  const getSelection = (column: WrapedColumnProps) => {
    const { type, onCell, ...restCol } = column;
    const key = record[rowKey];
    const props = onCell ? onCell(record, index) : {};
    const checked = selectedRowKeys?.includes(key);

    const commonProps = {
      // ...rest,
      ...restCol,
      ...props,
      checked,
      value: key,
      onChange: onSelectionChange,
    };

    if (type === 'checkbox') {
      // @ts-ignore
      return <Checkbox {...commonProps} />;
    } else {
      // @ts-ignore
      return <Radio {...commonProps} />;
    }
  };

  let colSpanStart = Infinity;
  let colSpanEnd = -1;
  // index: row, ind: column
  const renderCells = () => {
    return columns
      .map((column: any, col: number) => {
        const { key, onCell } = column;
        const cellProperty = onCell?.(record, index) || {};
        if (cellProperty?.colSpan && cellProperty.colSpan !== 1) {
          colSpanStart = col;
          colSpanEnd = col + cellProperty.colSpan;
        }
        if (col > colSpanStart && col < colSpanEnd) {
          return null;
        }
        if (key === 'YEE_SELECTION_COL') {
          const selection = getSelection(column);
          return (
            <td className={`${prefixCls}-cell`} style={{ textAlign: 'center' }} key={`selection-${col}`}>
              {selection}
            </td>
          );
        }
        if (key === 'YEE_EXPAND_COL') {
          const { rowExpandable, visible } = column;
          if (visible === false) {
            return null;
          }

          let renderExpandable = (
            <td
              className={clsx(`${prefixCls}-cell`, `${prefixCls}-row-expand-icon`)}
              style={{ textAlign: 'center' }}
              key={'expandable-' + index}
            >
              <Button
                type="text"
                icon={
                  expanded ? (
                    <SquareMinus size={14} strokeWidth={1.5} />
                  ) : (
                    <SquarePlus size={14} strokeWidth={1.5} />
                  )
                }
                onClick={handleExpand}
              />
            </td>
          );

          if (
            typeof rowExpandable === 'function' &&
            rowExpandable(record) === false
          ) {
            renderExpandable = (
              <td
                className={`${prefixCls}-cell`}
                style={{ textAlign: 'center' }}
                key={'expandable-' + index}
              ></td>
            );
          }
          return renderExpandable;
        }

        return (
          <BodyCell
            {...rest}
            record={record}
            column={column}
            rowIndex={index}
            key={'cell-' + col}
          />
        );
      })
      .filter(Boolean);
  };

  const getTrProps = () => {
    const cls = clsx(
      `${prefixCls}-row`,
      {
        [`${prefixCls}-odd-row`]: index % 2 === 0 && stripe,
        [`${prefixCls}-even-row`]: index % 2 === 1 && stripe,
        [`${prefixCls}-highlight-row`]: high,
      },
      rowClassName?.(record, index),
    );
    const _onRow = onRow ? onRow(record, index) : {};
    const _style = rowStyle ? rowStyle(record, index) : undefined;
    const _onDoubleClick = onDoubleClick
      ? (event: React.MouseEvent<HTMLTableRowElement>) =>
          onDoubleClick(record, event)
      : undefined;

    return {
      className: cls,
      ..._onRow,
      style: _style,
      'data-row-index': index + 1,
      onDoubleClick: _onDoubleClick,
    };
  };

  return (
    <>
      <tr {...getTrProps()}>{renderCells()}</tr>
      {expandable ? (
        <ExpandRow
          {...expandable}
          {...rest}
          expanded={expanded}
          record={record}
          index={index}
        />
      ) : null}
    </>
  );
};

export default TableRow;
