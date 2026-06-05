import type {
  TableSelectProps,
  TableSelectRowSelectionType,
} from '@rainbow-oh/yee-c';
import { TableSelect } from '@rainbow-oh/yee-c';
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
  ];

  const rowSelection = {
    type: 'radio' as const,
    selectedRowKeys: value,
  } as unknown as TableSelectRowSelectionType;

  const handleChange: TableSelectProps['onChange'] = (selectedKeys) => {
    console.log('Selected keys:', selectedKeys);
    setValue(selectedKeys as string);
  };

  return (
    <TableSelect
      columns={columns}
      dataSource={dataSource}
      rowSelection={rowSelection}
      value={value}
      rowKey="key"
      optionLabelProp="name"
      placeholder="Please select a person"
      onChange={handleChange}
    />
  );
};
