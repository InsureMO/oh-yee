import clsx from 'clsx';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import Spin from '../Spin';
import ColGroup from './col-group';
import Footer from './footer';
import Header from './header';
import useColumnResize from './hooks/useColumnResize';
import useColumns from './hooks/useColumns';
import useExpand from './hooks/useExpand';
import useSelection from './hooks/useSelection';
import TBody from './tbody';
import TFooter from './tfooter';
import THeader from './theader';

import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import omit from '../utils/omit';
import { pickDataAttrs } from '../utils/types';

import useFilter from './hooks/useFilter';
import usePagination from './hooks/usePagination';
import useSorter from './hooks/useSorter';
import type {
  FilterValue,
  PaginationType,
  TableProps,
  WrapedColumnProps,
} from './interface';
import './style/index.less';

export const TableCtx = React.createContext({} as any);

const Table = React.forwardRef<HTMLDivElement, TableProps>((baseprops, ref) => {
  const { table } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, table);
  const {
    prefixCls = 'yee-table',
    className,
    style,
    classNames,
    styles,
    components,
    rowKey = 'key',
    bordered,
    tableLayout,
    resizable,
    onColumnResize,
    onColumnResizeEnd,
    loading = false,
    showHeader = true,
    pagination: propPagination = true,
    columns: propColumns = [],
    dataSource = [],
    size,
    summary,
    scroll,
    header,
    download,
    footer,
    children,
    expandable,
    rowSelection,
    locale,
    onChange,
    //   sort,
    //   multiSort,
    //   maxSortCount = 3,
    //   children, // Destructured to prevent passing through to THeader
    ...rest
  } = props;

  const dataAttrs = pickDataAttrs(rest as Record<string, unknown>);
  const [measuredColumnWidths, setMeasuredColumnWidths] =
    React.useState<number[]>();
  const contentRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  // Filled in right after `useColumns` below. The resize hook needs the latest
  // leaf columns, but `wrapedColumns` is itself derived from the resized widths,
  // so depending on it directly would rebuild the drag handlers mid-drag.
  const wrapedColumnsRef = useRef<WrapedColumnProps[]>([]);

  const {
    resizedWidths,
    resizingKey,
    onResizeStart,
    onResizeStep,
    resetResizedWidths,
  } = useColumnResize({
    tableRef,
    columnsRef: wrapedColumnsRef,
    onColumnResize,
    onColumnResizeEnd,
  });

  // Once a snapshot exists, every column carries an explicit px width and the
  // table switches to `table-layout: fixed`, which makes those declared widths
  // authoritative. The measured widths lag one frame behind a drag, so they must
  // stop feeding the fixed-column offsets while a snapshot is in play.
  const hasResizeSnapshot = Object.keys(resizedWidths).length > 0;

  const getRowKey = React.useCallback(
    (record: Record<string, any>, key = rowKey) => {
      return typeof key === 'function' ? key(record) : record[key];
    },
    [rowKey],
  );

  const allKeys = useMemo(() => {
    return Array.isArray(dataSource)
      ? dataSource.map((item) => getRowKey(item))
      : [];
  }, [dataSource, rowKey, getRowKey]);

  const { wrapedColumns, headerRows } = useColumns({
    children,
    columns: propColumns,
    expandable,
    rowSelection,
    measuredColumnWidths: hasResizeSnapshot ? undefined : measuredColumnWidths,
    resizable,
    resizedWidths,
  });

  wrapedColumnsRef.current = wrapedColumns;

  // Total width of the px controlled layout. Deliberately `undefined` unless the
  // snapshot covers every single column: a partial snapshot would leave a hole in
  // the layout, so it is safer to fall back to the browser's own distribution.
  const resizeTotalWidth = useMemo(() => {
    if (!wrapedColumns.length) return undefined;
    let total = 0;
    for (const column of wrapedColumns) {
      const width = column.resizeKey
        ? resizedWidths[column.resizeKey]
        : undefined;
      if (!width || !Number.isFinite(width)) return undefined;
      total += width;
    }
    return total;
  }, [wrapedColumns, resizedWidths]);

  const resizeActive = resizeTotalWidth !== undefined;

  // Identity of the column set, ignoring widths. When it changes the snapshot is
  // stale (a new column would have no width of its own), so it gets dropped.
  const resizeKeysSignature = useMemo(
    () => wrapedColumns.map((column) => column.resizeKey).join('|'),
    [wrapedColumns],
  );

  useEffect(() => {
    resetResizedWidths();
  }, [resizeKeysSignature, resetResizedWidths]);

  // Filter
  const {
    data: filteredData,
    filterRecords,
    onFilter: onFilterInternal,
  } = useFilter({
    data: dataSource,
    columns: wrapedColumns,
  });

  const filters = useMemo(
    () =>
      Object.fromEntries(
        filterRecords.map(({ dataIndex, value }) => [dataIndex, value]),
      ),
    [filterRecords],
  );

  // Sort
  const {
    data: sortedData,
    sorters,
    onSort: onSortInternal,
  } = useSorter({ data: filteredData, columns: wrapedColumns });
  // Pagination
  const { pageData, current, pageSize, pagination } = usePagination({
    data: sortedData,
    pagination: propPagination,
    onTableChange: onChange
      ? (info) => {
          onChange({
            pagination: info,
            sorter: sorters,
            filters,
            currentDataSource: sortedData,
            action: 'paginate',
          });
        }
      : undefined,
  });

  const handleSort = React.useCallback(
    (dataIndex: string) => {
      const next = onSortInternal(dataIndex);
      onChange?.({
        pagination: pagination === false ? undefined : { current, pageSize },
        sorter: next.sorters,
        filters,
        currentDataSource: next.data,
        action: 'sort',
      });
    },
    [onSortInternal, onChange, pagination, current, pageSize, filters],
  );

  const handleFilter = React.useCallback(
    (options: { dataIndex: string; value: FilterValue | FilterValue[] }) => {
      const next = onFilterInternal(options);
      // Remove-then-re-add: the committing column's entry must be reported
      // even when the merged records hold no record for it (a controlled
      // column whose prop value is still empty), so parents can mirror state
      // from this payload alone. On clear the key is kept with its empty
      // value, matching antd.
      const emitted = next.filterRecords.filter(
        (record) => record.dataIndex !== options.dataIndex,
      );
      emitted.push({ dataIndex: options.dataIndex, value: options.value });
      onChange?.({
        pagination: pagination === false ? undefined : { current, pageSize },
        sorter: sorters,
        filters: Object.fromEntries(
          emitted.map(({ dataIndex, value }) => [dataIndex, value]),
        ),
        // Filtered but not yet re-sorted; symmetric with handleSort, whose
        // payload is sorted but not re-paginated.
        currentDataSource: next.data,
        action: 'filter',
      });
    },
    [onFilterInternal, onChange, pagination, current, pageSize, sorters],
  );

  // Expanded row data
  const { expandedRowKeys, onExpand } = useExpand(
    expandable,
    allKeys,
    getRowKey,
  );

  const {
    selectedRowKeys,
    checkedAll,
    onCheckAll,
    onChange: onSelectionChange,
  } = useSelection({ pageData, dataSource, getRowKey, rowSelection, allKeys });

  const [horizontalScroll, setHorizontalScroll] = React.useState({
    left: false,
    right: false,
  });

  const updateHorizontalScroll = React.useCallback(() => {
    const content = contentRef.current;
    if (!content) return;

    const maxScrollLeft = content.scrollWidth - content.clientWidth;
    const hasHorizontalScroll = maxScrollLeft > 1;
    const next = {
      left: hasHorizontalScroll && content.scrollLeft > 1,
      right: hasHorizontalScroll && content.scrollLeft < maxScrollLeft - 1,
    };

    setHorizontalScroll((current) =>
      current.left === next.left && current.right === next.right
        ? current
        : next,
    );
  }, []);

  // A primitive signature of everything in the columns that can affect the
  // measured layout, used as an effect dependency instead of the array itself.
  const columnLayoutKey = useMemo(
    () =>
      wrapedColumns
        .map(
          (column, index) =>
            `${column.key ?? column.dataIndex ?? index}:${
              column.fixed ?? ''
            }:${column.width ?? ''}`,
        )
        .join('|'),
    [wrapedColumns],
  );

  // `wrapedColumnsRef` (assigned during render, above) keeps the measure callback
  // stable: `wrapedColumns` is derived from `measuredColumnWidths`, so depending
  // on it directly would recreate the callback (and the ResizeObserver) on every
  // measurement.
  const updateMeasuredColumnWidths = React.useCallback(() => {
    const columns = wrapedColumnsRef.current;
    if (!columns.some((column) => column.fixed)) return;

    const colElements = tableRef.current?.querySelectorAll(
      ':scope > colgroup > col',
    );
    if (!colElements || colElements.length !== columns.length) return;

    // Round to whole pixels: sticky offsets do not need sub-pixel precision,
    // and raw fractional widths would otherwise flip-flop (scrollbar showing /
    // hiding, browser zoom) and keep re-triggering renders.
    const nextWidths = Array.from(colElements, (column) =>
      Math.round(column.getBoundingClientRect().width),
    );
    if (nextWidths.some((width) => !Number.isFinite(width) || width <= 0)) {
      return;
    }

    setMeasuredColumnWidths((current) => {
      const unchanged =
        current?.length === nextWidths.length &&
        current.every((width, index) => width === nextWidths[index]);
      return unchanged ? current : nextWidths;
    });
  }, [wrapedColumnsRef]);

  // Observers are attached once: both callbacks are referentially stable.
  useEffect(() => {
    const content = contentRef.current;
    const tableElement = tableRef.current;
    if (!content || !tableElement) return undefined;

    const handleResize = () => {
      updateHorizontalScroll();
      updateMeasuredColumnWidths();
    };

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(content);
    resizeObserver.observe(tableElement);

    return () => resizeObserver.disconnect();
  }, [updateHorizontalScroll, updateMeasuredColumnWidths]);

  // Re-sync when something that can change the layout changes. `columnLayoutKey`
  // is a primitive, so a measurement round-trip (which produces a new
  // `wrapedColumns` array with identical layout config) does not retrigger it.
  useEffect(() => {
    updateHorizontalScroll();
    updateMeasuredColumnWidths();
  }, [
    columnLayoutKey,
    pageData,
    scroll?.x,
    scroll?.y,
    updateHorizontalScroll,
    updateMeasuredColumnWidths,
  ]);

  const renderHeader = () => {
    return (
      <Header
        prefixCls={prefixCls}
        header={header}
        download={download}
        columns={wrapedColumns}
        pageData={pageData}
        dataSource={dataSource}
      />
    );
  };

  const renderTHeader = () => {
    if (showHeader === false) {
      return null;
    }
    const ths = omit(rest, ['rowSelection']);
    return (
      <THeader
        {...ths}
        headerRows={headerRows}
        checkedAll={checkedAll}
        sorters={sorters}
        onSort={handleSort}
        onCheckAll={onCheckAll}
        onInternalFilter={handleFilter}
        resizingKey={resizingKey}
        onResizeStart={onResizeStart}
        onResizeStep={onResizeStep}
      />
    );
  };

  const renderTBody = () => {
    return (
      <TBody
        {...rest}
        current={current}
        pageSize={pageSize}
        columns={wrapedColumns}
        pageData={pageData}
        selectedRowKeys={selectedRowKeys}
        expandedRowKeys={expandedRowKeys}
        expandable={expandable}
        onExpand={onExpand}
        onSelectionChange={onSelectionChange}
      />
    );
  };

  const renderTFooter = () => {
    if (!summary) return null;
    return <TFooter summary={summary} pageData={pageData} />;
  };

  const renderTable = () => {
    const tableProps = {
      style: {
        ...styles?.table,
        // An explicit total width replaces both `width: 100%` and `scroll.x`:
        // either of those would let the browser stretch the table and redistribute
        // the extra space across the columns, undoing the drag.
        minWidth: resizeActive ? undefined : scroll?.x,
        width: resizeTotalWidth,
        tableLayout: resizeActive
          ? 'fixed'
          : pageData?.length
            ? tableLayout
            : undefined,
      },
      className: clsx(
        { [`${prefixCls}-bordered`]: bordered },
        classNames?.table,
      ),
    };
    const table = (
      <TableCtx.Provider
        value={{
          prefixCls,
          columns: wrapedColumns,
          classNames,
          styles,
          components,
          locale,
          rowKey,
        }}
      >
        <table ref={tableRef} {...tableProps}>
          <ColGroup columns={wrapedColumns} />
          {renderTHeader()}
          {renderTBody()}
          {renderTFooter()}
        </table>
      </TableCtx.Provider>
    );

    return (
      <div
        className={clsx(`${prefixCls}-content-wrapper`, {
          [`${prefixCls}-content-wrapper-scroll-left`]: horizontalScroll.left,
          [`${prefixCls}-content-wrapper-scroll-right`]: horizontalScroll.right,
        })}
      >
        <div
          ref={contentRef}
          className={clsx(`${prefixCls}-content`, {
            [`${prefixCls}-${size}-size`]: size,
            [`${prefixCls}-fixed-header`]: scroll?.y,
          })}
          style={{ height: scroll?.y }}
          onScroll={updateHorizontalScroll}
        >
          {table}
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <Footer
        prefixCls={prefixCls}
        pagination={pagination as PaginationType}
        footer={footer}
        classNames={classNames}
        styles={styles}
      />
    );
  };

  return (
    <div
      className={clsx(
        `${prefixCls}-box`,
        { [`${prefixCls}-resizing`]: !!resizingKey },
        className,
      )}
      style={style}
      ref={ref}
      {...dataAttrs}
    >
      <Spin type="spin" className={`${prefixCls}-spin`} spinning={loading} mask>
        {renderHeader()}
        {renderTable()}
        {renderFooter()}
      </Spin>
    </div>
  );
});

export default Table;
