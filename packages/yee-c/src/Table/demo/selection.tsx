import type { RowSelectionType } from '@rainbow-oh/yee-c';
import { Table } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<
    Array<string | number>
  >([]);

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

  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys,
    onChange: (selectedKeys: string[] | number[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowSelection={rowSelection as RowSelectionType}
      rowKey="key"
    />
  );
};
