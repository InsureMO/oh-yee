import type { ColumnProps, RowSelectionType } from '@rainbow-oh/yee-c';
import { Table } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<
    Array<string | number>
  >([]);

  const columns: ColumnProps[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 120,
      sorter: true,
    },
    {
      title: 'Info',
      key: 'info',
      children: [
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: 100,
          sorter: true,
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          width: 200,
        },
      ],
    },
    {
      title: 'Company',
      key: 'company',
      children: [
        {
          title: 'Name',
          dataIndex: 'companyName',
          key: 'companyName',
          width: 180,
        },
        {
          title: 'Address',
          dataIndex: 'companyAddress',
          key: 'companyAddress',
          width: 220,
        },
      ],
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (record) => <a onClick={() => console.log(record)}>Edit</a>,
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      companyName: 'Acme Inc.',
      companyAddress: 'NY Office',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      companyName: 'Globex',
      companyAddress: 'London Office',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 28,
      address: 'Sidney No. 1 Lake Park',
      companyName: 'Initech',
      companyAddress: 'Sidney Office',
    },
  ];

  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys,
    onChange: (keys: string[] | number[]) => setSelectedRowKeys(keys),
  };

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="key"
      rowSelection={rowSelection as RowSelectionType}
      bordered
      scroll={{ x: 1200 }}
    />
  );
};
