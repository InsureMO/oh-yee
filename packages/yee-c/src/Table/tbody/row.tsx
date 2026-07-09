import clsx from 'clsx';
import { SquareMinus, SquarePlus } from 'lucide-react';
import React, { useContext } from 'react';
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
    const { type, disabled: colDisabled, onCell } = column;
    const rowKeyValue = record[rowKey];
    const props = (onCell?.(record, index) || {}) as Record<string, unknown>;
    const checked = selectedRowKeys?.includes(rowKeyValue);

    // rowSelection.disabled may be a boolean, a per-row array, or a function
    const disabled =
      typeof colDisabled === 'function'
        ? colDisabled(record, index)
        : Array.isArray(colDisabled)
          ? colDisabled[index]
          : !!colDisabled;

    // Only forward input-relevant props. Spreading the whole column would leak
    // rowSelection fields (selectedRowKeys/selectAll/...) and the synthetic
    // `key` onto the DOM <input>.
    const commonProps = {
      checked,
      value: rowKeyValue,
      onChange: onSelectionChange,
      disabled,
      ...props,
    };

    if (type === 'checkbox') {
      return (
        <Checkbox
          {...(commonProps as React.ComponentProps<typeof Checkbox>)}
        />
      );
    }
    return <Radio {...(commonProps as React.ComponentProps<typeof Radio>)} />;
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
            <td
              className={`${prefixCls}-cell`}
              style={{ textAlign: 'center' }}
              key={`selection-${col}`}
            >
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
              className={clsx(
                `${prefixCls}-cell`,
                `${prefixCls}-row-expand-icon`,
              )}
              style={{ textAlign: 'center' }}
              key={'expandable-' + index}
            >
              <Button
                type="text"
                icon={
                  expanded ? (
                    <SquareMinus size={16} strokeWidth={2} />
                  ) : (
                    <SquarePlus size={16} strokeWidth={2} />
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
