import { TableSelect } from '@oh/yee-c';
import type {TableSelectRowSelectionType} from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<string>('3');
  const [multiValue, setMultiValue] = useState<string[]>(['1', '3']);

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h4>Single Select (Controlled)</h4>
        <TableSelect
          columns={columns}
          dataSource={dataSource}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [value],
            onChange: (selectedKeys: any) => {
              setValue(selectedKeys);
              console.log('Selected:', selectedKeys);
            },
          } as any}
          rowKey="key"
          optionLabelProp="name"
          placeholder="Select a person"
          style={{ width: 300 }}
        />
        <div style={{ marginTop: 8 }}>
          Selected: {dataSource.find(d => d.key === value)?.name || 'None'}
        </div>
      </div>

      <div>
        <h4>Multiple Select (Controlled)</h4>
        <TableSelect
          columns={columns}
          dataSource={dataSource}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: multiValue,
            onChange: (selectedKeys: any) => {
              setMultiValue(selectedKeys);
              console.log('Selected:', selectedKeys);
            },
          } as TableSelectRowSelectionType}
          rowKey="key"
          optionLabelProp="name"
          placeholder="Select persons"
          style={{ width: 350 }}
        />
        <div style={{ marginTop: 8 }}>
          Selected: {multiValue.length > 0
            ? multiValue.map(k => dataSource.find(d => d.key === k)?.name).join(', ')
            : 'None'}
        </div>
      </div>
    </div>
  );
};
