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

  const { wrapedColumns, columns } = useColumns({
    children,
    columns: propColumns,
    expandable,
    rowSelection,
  });

  // Filter
  const { data: filteredData, onFilter: onFilterInternal } = useFilter({
    data: dataSource,
  });

  // Sort
  const {
    data: sortedData,
    sorters,
    onSort,
  } = useSorter({ data: filteredData, columns });
  // Pagination
  const { pageData, current, pageSize, pagination } = usePagination({
    data: sortedData,
    pagination: propPagination,
    onTableChange: onChange
      ? (info) => {
          onChange({
            pagination: info,
            sorter: sorters,
            filters: undefined, // TODO: Extract filter info from onFilterInternal
            currentDataSource: sortedData,
            action: 'paginate',
          });
        }
      : undefined,
  });

  // Expanded row data
  const { expandedRowKeys, onExpand } = useExpand(
    expandable,
    allKeys,
    getRowKey,
  );

  const {
    selectedRowKeys,
    checkedAll,
    pageDataRowKeys,
    onCheckAll,
    onChange: onSelectionChange,
  } = useSelection({ pageData, dataSource, getRowKey, rowSelection, allKeys });

  // Track previous values to determine what action triggered onChange
  const prevSortersRef = useRef<typeof sorters>({});
  const prevPaginationRef = useRef<{ current: number; pageSize: number }>({
    current,
    pageSize,
  });

  // Wrap onFilter to trigger onChange
  const onFilter = React.useCallback(
    (...args: Parameters<typeof onFilterInternal>) => {
      onFilterInternal(...args);
      // Trigger onChange for filter action
      if (onChange) {
        onChange({
          pagination: pagination === false ? undefined : { current, pageSize },
          sorter: sorters,
          filters: undefined, // TODO: Extract filter info from args
          currentDataSource: filteredData,
          action: 'filter',
        });
      }
    },
    [
      onChange,
      pagination,
      current,
      pageSize,
      sorters,
      filteredData,
      onFilterInternal,
    ],
  );

  // Trigger onChange when sorter, pagination, or filter changes
  useEffect(() => {
    if (!onChange) return;

    // Check if sorters changed
    const sortersChanged =
      JSON.stringify(prevSortersRef.current) !== JSON.stringify(sorters);
    if (sortersChanged && prevSortersRef.current !== sorters) {
      prevSortersRef.current = sorters;
      onChange({
        pagination: pagination === false ? undefined : { current, pageSize },
        sorter: sorters,
        filters: undefined,
        currentDataSource: sortedData,
        action: 'sort',
      });
      return;
    }
  }, [sorters, current, pageSize, pageData, sortedData, onChange]);

  const renderHeader = () => {
    return (
      <Header
        prefixCls={prefixCls}
        header={header}
        download={download}
        columns={columns}
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
        columns={wrapedColumns}
        pageDataRowKeys={pageDataRowKeys}
        checkedAll={checkedAll}
        sorters={sorters}
        onSort={onSort}
        onCheckAll={onCheckAll}
        onInternalFilter={onFilter}
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
          columns,
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
      <div className={`${prefixCls}-content-wrapper`}>
        <div
          className={clsx(`${prefixCls}-content`, {
            [`${prefixCls}-${size}-size`]: size,
            [`${prefixCls}-fixed-header`]: scroll?.y,
          })}
          style={{ height: scroll?.y, width: scroll?.x }}
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
