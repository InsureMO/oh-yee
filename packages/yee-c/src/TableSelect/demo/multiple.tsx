import { TableSelect } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<string[]>([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 80,
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

  const rowSelection = {
    type: 'checkbox' as const,
    selectedRowKeys: value,
    onChange: (selectedKeys: string[] | number[]) => {
      setValue(selectedKeys as unknown as string[]);
    },
  };

  return (
    <div>
      <TableSelect
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        rowKey="key"
        optionLabelProp="name"
        placeholder="Please select persons"
        style={{ width: 400 }}
      />
      <div style={{ marginTop: 16 }}>
        Selected: {value.length > 0 ? value.join(', ') : 'None'}
      </div>
    </div>
  );
};
