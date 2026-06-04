import { Table } from '@oh/yee-c';
import React from 'react';

export default () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
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
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  const expandable = {
    expandedRowRender: (record: object) => (
      <p style={{ margin: 0 }}>{String((record as Record<string, unknown>).description)}</p>
    ),
  };

  // Add description to data source
  const extendedDataSource = dataSource.map((item) => ({
    ...item,
    description: `My name is ${item.name}, I am ${item.age} years old, living in ${item.address}.`,
  }));

  return (
    <Table
      columns={columns}
      dataSource={extendedDataSource}
      expandable={expandable}
    />
  );
};
