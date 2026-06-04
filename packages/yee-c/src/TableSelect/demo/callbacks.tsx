import { TableSelect } from '@rainbow-oh/yee-c';
import type {TableSelectRowSelectionType} from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<string>('');
  const [selectedData, setSelectedData] = useState<Record<string, unknown> | null>(null);

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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 100,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      role: 'Developer',
      department: 'Engineering',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      role: 'Designer',
      department: 'Product',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 28,
      role: 'Manager',
      department: 'Sales',
    },
    {
      key: '4',
      name: 'Alice White',
      age: 35,
      role: 'Developer',
      department: 'Engineering',
    },
    {
      key: '5',
      name: 'Bob Smith',
      age: 29,
      role: 'QA Engineer',
      department: 'Engineering',
    },
  ];

  const rowSelection = {
    type: 'radio' as const,
    selectedRowKeys: value,
    onChange: (selectedKeys: string[] | number[], selectedRows: Array<Record<string, unknown>> | Record<string, unknown>) => {
      setValue(selectedKeys as unknown as string);
      setSelectedData(selectedRows as Record<string, unknown>);
      console.log('Selection changed:', {
        keys: selectedKeys,
        data: selectedRows,
      });
    },
  } as unknown as TableSelectRowSelectionType;

  const handleSearch = (searchValue: string) => {
    console.log('Searching for:', searchValue);
  };

  return (
    <div>
      <TableSelect
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        rowKey="key"
        optionLabelProp="name"
        searchable
        searchOnInput={false}
        onSearch={handleSearch}
        placeholder="Search and select an employee"
        allowClear
        style={{ width: 350 }}
      />
      {selectedData && (
        <div
          style={{
            marginTop: 16,
            padding: 16,
            background: '#f5f5f5',
            borderRadius: 8,
          }}
        >
          <h4>Selected Employee Details:</h4>
          <p><strong>Name:</strong> {selectedData.name as string}</p>
          <p><strong>Age:</strong> {selectedData.age as number}</p>
          <p><strong>Role:</strong> {selectedData.role as string}</p>
          <p><strong>Department:</strong> {selectedData.department as string}</p>
        </div>
      )}
    </div>
  );
};
