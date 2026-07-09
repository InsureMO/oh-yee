import clsx from 'clsx';
import React, { useContext } from 'react';
import Tooltip from '../../Tooltip';
import ArrowIcon from '../icon/arrow-icon';
import { HeadCellProps } from '../interface';
import Filter from './filter';

import { TableCtx } from '../table';

const HeadCell: React.FC<HeadCellProps> = (props) => {
  const {
    fixed,
    isFixedLeftLast,
    isFixedRightFirst,
    align = 'left',
    title,
    dataIndex,
    sorter,
    filter,
    sorters,
    className,
    styles,
    classNames,
    showSorterTooltip = true,
    tableActionBarShowOnHover,
    internalFilters,
    style,
    width,
    colSpan,
    rowSpan,
    onHeaderCell,
    onSort,
    onInternalFilter,
    ...rest
  } = props;

  const { prefixCls } = useContext(TableCtx);

  const showFilter = !!filter;

  // Get current sort order for this column (0 = none, 1 = ascend, -1 = descend)
  // Convert -1 to 2 for UI display (2 = descend)
  const sortOrder = (dataIndex && sorters?.[dataIndex]) || 0;
  const displaySortOrder: 0 | 1 | 2 =
    sortOrder === -1 ? 2 : (sortOrder as 0 | 1);

  const handleSort = () => {
    if (dataIndex && onSort) {
      onSort(dataIndex, sorter);
    }
  };

  const renderSort = () => {
    const trigger = (
      <span className={`${prefixCls}-column-sorter`}>
        <ArrowIcon
          direction="up"
          className={clsx({ active: displaySortOrder === 1 })}
        />
        <ArrowIcon className={clsx({ active: displaySortOrder === 2 })} />
      </span>
    );
    return trigger;
  };

  const renderTitle = () => {
    if (sorter) {
      const trigger = (
        <span
          className={clsx(`${prefixCls}-column-sorters`)}
          onClick={sorter ? handleSort : undefined}
        >
          <span className={`${prefixCls}-column-title`} title={title}>
            {title}
          </span>
          {renderSort()}
        </span>
      );

      if (showSorterTooltip && sorter) {
        let title = '';
        if (displaySortOrder === 0) {
          title = 'Click to sort ascending';
        } else if (displaySortOrder === 1) {
          title = 'Click to sort descending';
        } else if (displaySortOrder === 2) {
          title = 'Click to cancel sorting';
        }

        return <Tooltip title={title}>{trigger}</Tooltip>;
      }
    }
    return <span>{title}</span>;
  };

  const renderFilter = () => {
    if (!showFilter) return null;
    return (
      <div
        className={clsx(`${prefixCls}-thead-action`, classNames?.action)}
        style={styles?.action}
      >
        <Filter
          {...rest}
          filter={filter}
          column={props}
          internalFilters={internalFilters}
          onInternalFilter={onInternalFilter}
          dataIndex={dataIndex as string}
        />
      </div>
    );
  };

  const renderCellWithAction = () => {
    return (
      <div
        className={`${prefixCls}-thead-cell`}
        style={{ justifyContent: align }}
      >
        {renderTitle()}
        {renderFilter()}
      </div>
    );
  };

  const cls = clsx(
    `${prefixCls}-cell`,
    {
      [`${prefixCls}-cell-fixed-${fixed}`]: fixed,
      [`${prefixCls}-cell-fixed-${fixed}-last`]: isFixedLeftLast,
      [`${prefixCls}-cell-fixed-${fixed}-first`]: isFixedRightFirst,
      [`${prefixCls}-cell-operate-hover`]: tableActionBarShowOnHover,
    },
    className,
  );

  const getThProps = () => {
    const styles = { ...style, width, maxWidth: width, textAlign: align };
    const cellProps = onHeaderCell ? onHeaderCell(props) : {};
    return {
      ...cellProps,
      className: cls,
      scope: 'col',
      style: styles,
      colSpan,
      rowSpan,
    };
  };

  const thProps = getThProps();

  const renderCell = () => {
    if (!filter && !sorter) {
      return <th {...thProps}>{title}</th>;
    }

    return <th {...thProps}>{renderCellWithAction()}</th>;
  };

  const cell = renderCell();

  return cell;
};

export default HeadCell;
