import { TableSelect } from '@rainbow-oh/yee-c';
import type {TableSelectRowSelectionType} from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<string>('');

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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      email: 'john@example.com',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      email: 'jim@example.com',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 28,
      email: 'joe@example.com',
    },
    {
      key: '4',
      name: 'Alice White',
      age: 35,
      email: 'alice@example.com',
    },
    {
      key: '5',
      name: 'Bob Smith',
      age: 29,
      email: 'bob@example.com',
    },
    {
      key: '6',
      name: 'Carol Davis',
      age: 31,
      email: 'carol@example.com',
    },
    {
      key: '7',
      name: 'David Wilson',
      age: 38,
      email: 'david@example.com',
    },
  ];

  const rowSelection = {
    type: 'radio' as const,
    selectedRowKeys: value,
    onChange: (selectedKeys: string[] | number[]) => {
      setValue(selectedKeys as unknown as string);
    },
  } as unknown as TableSelectRowSelectionType;

  const handleSearch = (searchValue: string) => {
    console.log('Search value:', searchValue);
  };

  return (
    <TableSelect
      columns={columns}
      dataSource={dataSource}
      rowSelection={rowSelection}
      rowKey="key"
      optionLabelProp="name"
      searchable
      searchOnInput
      placeholder="Search and select a person"
      onSearch={handleSearch}
      style={{ width: 350 }}
    />
  );
};
