import { Table } from '@oh/yee-c';
import React from 'react';

export default () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filter: {
        searchable: true,
      },
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
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      filter: {
        filterMode: 'tree',
      },
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      gender: 'male',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      gender: 'female',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      gender: 'male',
    },
    {
      key: '4',
      name: 'Jon Snow',
      age: 42,
      address: 'Ottawa No. 2 Lake Park',
      gender: 'female',
    },
    {
      key: '5',
      name: 'Arya Stark',
      age: 16,
      address: 'Winterfell',
      gender: 'female',
    },
  ];

  return <Table columns={columns as any} dataSource={dataSource} />;
};
