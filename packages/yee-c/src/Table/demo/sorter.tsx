import { Table } from '@oh/yee-c';
import React from 'react';

export default () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
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
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 28,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Alice White',
      age: 35,
      address: 'Paris No. 2 Lake Park',
    },
    {
      key: '5',
      name: 'Bob Smith',
      age: 29,
      address: 'Tokyo No. 3 Lake Park',
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
};
