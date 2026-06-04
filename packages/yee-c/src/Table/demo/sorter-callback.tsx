import { Table } from '@rainbow-oh/yee-c';
import type { ColumnProps, onChangeParams } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        sort: () => Math.random() - 0.5, // Random sort example
        multiple: true,
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
      defaultSortOrder: 'descend' as const,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      score: 85,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      score: 92,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 28,
      score: 78,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Alice White',
      age: 35,
      score: 88,
      address: 'Paris No. 2 Lake Park',
    },
    {
      key: '5',
      name: 'Bob Smith',
      age: 29,
      score: 95,
      address: 'Tokyo No. 3 Lake Park',
    },
  ];

  const handleChange = (params: onChangeParams) => {
    console.log('Table changed:', params);
  };

  return (
    <Table
      columns={columns as ColumnProps[]}
      dataSource={dataSource}
      onChange={handleChange}
    />
  );
};
