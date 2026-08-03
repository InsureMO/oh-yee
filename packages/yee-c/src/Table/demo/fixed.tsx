import type { ColumnProps } from '@rainbow-oh/yee-c';
import { Table } from '@rainbow-oh/yee-c';
import React from 'react';

const columns: ColumnProps[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 140,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
    width: 100,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 240,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    width: 180,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    width: 180,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 240,
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 100,
    render: (record) => <a onClick={() => console.log(record)}>View</a>,
  },
];

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    company: 'Acme Inc.',
    department: 'Engineering',
    email: 'john.brown@example.com',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    company: 'Globex',
    department: 'Marketing',
    email: 'jim.green@example.com',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 28,
    address: 'Sidney No. 1 Lake Park',
    company: 'Initech',
    department: 'Product',
    email: 'joe.black@example.com',
  },
];

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    rowKey="key"
    pagination={false}
    scroll={{ x: 1180 }}
    tableLayout="fixed"
  />
);
