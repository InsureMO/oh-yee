import { Table } from '@rainbow-oh/yee-c';
import type { ColumnProps, onChangeParams } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [tableData, setTableData] = useState<{
    pagination: { current: number; pageSize: number };
    sorter: object;
    filters: object;
  }>({
    pagination: { current: 1, pageSize: 5 },
    sorter: {},
    filters: {},
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      filter: {
        searchable: true,
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: true,
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      sorter: true,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      filter: {
        filterMode: 'tree' as const,
        items: [
          { label: 'New York', key: 'New York' },
          { label: 'London', key: 'London' },
          { label: 'Paris', key: 'Paris' },
        ],
      },
    },
  ];

  const dataSource = [
    { key: '1', name: 'John Brown', age: 32, score: 85, city: 'New York' },
    { key: '2', name: 'Jim Green', age: 42, score: 92, city: 'London' },
    { key: '3', name: 'Joe Black', age: 28, score: 78, city: 'Paris' },
    { key: '4', name: 'Alice White', age: 35, score: 88, city: 'New York' },
    { key: '5', name: 'Bob Smith', age: 29, score: 95, city: 'London' },
    { key: '6', name: 'Carol Davis', age: 31, score: 82, city: 'Paris' },
    { key: '7', name: 'David Wilson', age: 38, score: 90, city: 'New York' },
  ];

  const handleChange = (params: onChangeParams) => {
    console.log('onChange triggered:', params);
    setTableData({
      pagination: params.pagination as { current: number; pageSize: number },
      sorter: params.sorter ?? {},
      filters: params.filters ?? {},
    });
  };

  return (
    <div>
      <Table
        columns={columns as ColumnProps[]}
        dataSource={dataSource}
        onChange={handleChange}
        pagination={{
          current: tableData.pagination.current,
          pageSize: tableData.pagination.pageSize,
          total: dataSource.length,
        }}
      />
      <div style={{ marginTop: 16, padding: 16, background: '#f5f5f5' }}>
        <p><strong>Current State:</strong></p>
        <p>Pagination: Page {tableData.pagination.current}, {tableData.pagination.pageSize} per page</p>
        <p>Sorter: {JSON.stringify(tableData.sorter)}</p>
        <p>Filters: {JSON.stringify(tableData.filters)}</p>
      </div>
    </div>
  );
};
