import clsx from 'clsx';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import Spin from '../Spin';
import ColGroup from './col-group';
import Footer from './footer';
import Header from './header';
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
import type { PaginationType, TableProps } from './interface';
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
  });

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

  // Track filter changes to emit onChange after filtered data is recalculated
  const prevFilterRecordsRef = useRef(filterRecords);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [horizontalScroll, setHorizontalScroll] = React.useState({
    left: false,
    right: false,
  });

  const updateHorizontalScroll = React.useCallback(() => {
    const wrapper = contentWrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const scrollContainer =
      content.scrollWidth - content.clientWidth > 1 ? content : wrapper;
    const maxScrollLeft =
      scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const hasHorizontalScroll = maxScrollLeft > 1;
    const next = {
      left: hasHorizontalScroll && scrollContainer.scrollLeft > 1,
      right:
        hasHorizontalScroll && scrollContainer.scrollLeft < maxScrollLeft - 1,
    };

    setHorizontalScroll((current) =>
      current.left === next.left && current.right === next.right
        ? current
        : next,
    );
  }, []);

  useEffect(() => {
    if (prevFilterRecordsRef.current === filterRecords) return;

    prevFilterRecordsRef.current = filterRecords;
    if (!onChange) return;

    onChange({
      pagination: pagination === false ? undefined : { current, pageSize },
      sorter: sorters,
      filters,
      currentDataSource: sortedData,
      action: 'filter',
    });
  }, [
    filterRecords,
    filters,
    sortedData,
    pagination,
    current,
    pageSize,
    sorters,
    onChange,
  ]);

  useEffect(() => {
    updateHorizontalScroll();

    const wrapper = contentWrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return undefined;

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateHorizontalScroll);
      return () => window.removeEventListener('resize', updateHorizontalScroll);
    }

    const resizeObserver = new ResizeObserver(updateHorizontalScroll);
    resizeObserver.observe(wrapper);
    resizeObserver.observe(content);

    return () => resizeObserver.disconnect();
  }, [updateHorizontalScroll, wrapedColumns, pageData, scroll?.x]);

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
        onInternalFilter={onFilterInternal}
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
        tableLayout: pageData?.length ? tableLayout : undefined,
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
        <table {...tableProps}>
          <ColGroup columns={wrapedColumns} />
          {renderTHeader()}
          {renderTBody()}
          {renderTFooter()}
        </table>
      </TableCtx.Provider>
    );

    return (
      <div
        ref={contentWrapperRef}
        className={clsx(`${prefixCls}-content-wrapper`, {
          [`${prefixCls}-content-wrapper-scroll-left`]: horizontalScroll.left,
          [`${prefixCls}-content-wrapper-scroll-right`]: horizontalScroll.right,
        })}
        onScroll={updateHorizontalScroll}
      >
        <div
          ref={contentRef}
          className={clsx(`${prefixCls}-content`, {
            [`${prefixCls}-${size}-size`]: size,
            [`${prefixCls}-fixed-header`]: scroll?.y,
          })}
          style={{ height: scroll?.y, width: scroll?.x }}
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
      className={clsx(`${prefixCls}-box`, className)}
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
