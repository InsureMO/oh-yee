import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import * as React from 'react';
import pickerUtils from '../utils/pickerUtils';

function PanelBody(props: any) {
  const {
    prefixCls,
    rowCount,
    colCount,
    onSelect,
    handleMouseChange,
    headerCells,
    picker,
    baseDate,
    getCellNode,
    getCellDate,
    getCellText,
    getCellTitle,
    getCellClassName,
    prefixColumn,
    getRowClassName,
    cellRender,
  } = props;

  // Clear hover date when panel closes
  React.useEffect(() => {
    return () => {
      handleMouseChange?.('');
    };
  }, []);

  const rows: React.ReactNode[] = [];
  const cellPrefixCls = `${prefixCls}-cell`;

  for (let i = 0; i < rowCount; i++) {
    const row: React.ReactNode[] = [];
    let rowStartDate: Dayjs;

    for (let j = 0; j < colCount; j++) {
      const offset = i * colCount + j;
      const currentDate = getCellDate(baseDate, offset);

      if (j === 0) {
        rowStartDate = currentDate;
        if (prefixColumn) {
          row.push(prefixColumn(currentDate));
        }
      }

      const title = getCellTitle?.(currentDate);
      const cls = getCellClassName?.(currentDate);

      row.push(
        <td
          key={j}
          title={title}
          className={clsx(
            cellPrefixCls,
            {
              [`${cellPrefixCls}-start`]:
                getCellText(currentDate) === 1 ||
                (picker === 'year' && getCellText(currentDate) % 10 === 0),
              [`${cellPrefixCls}-end`]:
                getCellText(currentDate) ===
                  pickerUtils.getDate(currentDate.endOf('month')) ||
                (picker === 'year' && getCellText(currentDate) % 10 === 9),
            },
            cls,
          )}
          onClick={() => {
            if (picker === 'week') return;
            onSelect?.(currentDate);
          }}
          onMouseOver={() => {
            if (picker === 'week') return;
            handleMouseChange?.(currentDate);
          }}
          onMouseLeave={() => {
            if (picker === 'week') return;
            handleMouseChange?.('');
          }}
        >
          {getCellNode ? (
            getCellNode(currentDate)
          ) : (
            <div className={`${prefixCls}-cell-inner`}>
              <div className={`${prefixCls}-cell-value`}>
                {getCellText(currentDate)}
              </div>
              {cellRender ? (
                <div className={`${prefixCls}-cell-content`}>
                  {cellRender(currentDate, { mode: picker })}
                </div>
              ) : null}
            </div>
          )}
        </td>,
      );
    }

    rows.push(
      <tr
        key={i}
        onClick={() => {
          if (picker !== 'week') return;
          onSelect?.(rowStartDate);
        }}
        onMouseOver={() => {
          if (picker !== 'week') return;
          handleMouseChange?.(rowStartDate);
        }}
        onMouseLeave={() => {
          if (picker !== 'week') return;
          handleMouseChange?.('');
        }}
        // @ts-ignore
        className={getRowClassName?.(rowStartDate)}
      >
        {row}
      </tr>,
    );
  }

  return (
    <div className={`${prefixCls}-body`}>
      <table className={`${prefixCls}-content`}>
        {headerCells && (
          <thead>
            <tr>{headerCells}</tr>
          </thead>
        )}
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default PanelBody;
