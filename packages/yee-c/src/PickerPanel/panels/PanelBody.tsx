import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import * as React from 'react';
import pickerUtils from '../utils/pickerUtils';
import type { PickerType } from '../interface';

export interface PanelBodyProps {
  prefixCls?: string;
  picker?: PickerType;
  rowCount: number;
  colCount: number;
  baseDate?: Dayjs | number;
  onSelect?: (date: Dayjs) => void;
  handleMouseChange?: (date: Dayjs | '') => void;
  headerCells?: React.ReactNode;
  getCellNode?: (currentDate: Dayjs) => React.ReactNode;
  getCellDate: (baseDate: Dayjs, offset: number) => Dayjs;
  getCellText: (currentDate: Dayjs) => number | string;
  getCellTitle?: (currentDate: Dayjs) => string;
  getCellClassName?: (currentDate: Dayjs) => string;
  prefixColumn?: (currentDate: Dayjs) => React.ReactNode;
  getRowClassName?: (currentDate: Dayjs) => string;
  cellRender?: (date: Dayjs, panel: PickerType) => React.ReactNode;
}

function PanelBody(props: PanelBodyProps) {
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
      const currentDate = getCellDate(baseDate as Dayjs, offset);

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
                (picker === 'year' &&
                  Number(getCellText(currentDate)) % 10 === 0),
              [`${cellPrefixCls}-end`]:
                getCellText(currentDate) ===
                  pickerUtils.getDate(currentDate.endOf('month')) ||
                (picker === 'year' &&
                  Number(getCellText(currentDate)) % 10 === 9),
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
                  {cellRender(currentDate, picker as PickerType)}
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
