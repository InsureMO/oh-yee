import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import pickerUtils from '../../utils/pickerUtils';

function TimeColumn(props: any) {
  const {
    prefixCls,
    type,
    value,
    onSelect,
    cells,
    disabled,
    maxDate,
    minDate,
  } = props;

  const ref = React.useRef<HTMLUListElement>(null);
  const selectedRef = React.createRef<HTMLLIElement>();
  const [selectedCell, setSelectedCell] = React.useState<number>();

  React.useLayoutEffect(() => {
    if (value !== -1 && selectedRef.current) {
      ref.current?.scrollTo({
        top: selectedRef.current?.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [selectedCell]);

  const columnClassName = clsx(`${prefixCls}-time-panel-column`, {
    [`${prefixCls}-time-panel-column-disabled`]: disabled,
  });

  const handleInternalSelect = (cell: Dayjs, value: number) => {
    if (disabled) return;
    let newDate: Dayjs;
    if (type === 'hour') {
      newDate = pickerUtils.setHour(cell, value);
    } else if (type === 'minute') {
      newDate = pickerUtils.setMinute(cell, value);
    } else {
      newDate = pickerUtils.setSecond(cell, value);
    }
    onSelect?.(newDate);
  };

  return (
    <ul className={columnClassName} ref={ref}>
      {cells.map((cell: Dayjs, index: number) => {
        const cellValue =
          type === 'hour'
            ? pickerUtils.getHour(cell)
            : type === 'minute'
            ? pickerUtils.getMinute(cell)
            : type === 'second'
            ? pickerUtils.getSecond(cell)
            : 0;

        const renderCell = cellValue < 10 ? '0' + cellValue : cellValue;

        const isSelected = pickerUtils.isSame(cell, value, type);

        if (isSelected && selectedCell !== cellValue) {
          setSelectedCell(cellValue);
        }

        let maxDateDisabled = false;
        if (maxDate) {
          maxDateDisabled = pickerUtils.isAfter(cell, dayjs(maxDate), type);
        }

        let minDateDisabled = false;
        if (minDate) {
          minDateDisabled = pickerUtils.isBefore(cell, dayjs(minDate), type);
        }

        const cls = clsx(`${prefixCls}-time-panel-cell`, {
          [`${prefixCls}-cell-disabled`]: maxDateDisabled || minDateDisabled,
          [`${prefixCls}-time-panel-cell-selected`]: isSelected,
        });
        return (
          <li
            className={cls}
            onClick={() => handleInternalSelect(cell, cellValue)}
            ref={isSelected ? selectedRef : undefined}
            key={index}
          >
            <div className={`${prefixCls}-time-panel-cell-inner`}>
              {renderCell}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TimeColumn;
