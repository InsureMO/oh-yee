import { TableSelect } from '@oh/yee-c';
import type {TableSelectRowSelectionType} from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<string>('2');

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
    onChange: (selectedKeys: string[] | number[]) => {
      setValue(selectedKeys as unknown as string);
    },
  } as unknown as TableSelectRowSelectionType;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h4>Disabled</h4>
        <TableSelect
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelection}
          rowKey="key"
          optionLabelProp="name"
          disabled
          placeholder="Disabled select"
          style={{ width: 300 }}
        />
      </div>

      <div>
        <h4>Allow Clear</h4>
        <TableSelect
          columns={columns}
          dataSource={dataSource}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [value],
            onChange: (selectedKeys: string[] | number[]) => {
              setValue(selectedKeys as unknown as string);
            },
          } as unknown as TableSelectRowSelectionType}
          rowKey="key"
          optionLabelProp="name"
          allowClear
          placeholder="Clearable select"
          style={{ width: 300 }}
        />
      </div>

      <div>
        <h4>Custom Placement (topLeft)</h4>
        <TableSelect
          columns={columns}
          dataSource={dataSource}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [value],
            onChange: (selectedKeys: string[] | number[]) => {
              setValue(selectedKeys as unknown as string);
            },
          } as unknown as TableSelectRowSelectionType}
          rowKey="key"
          optionLabelProp="name"
          placement="topLeft"
          placeholder="Popup from top"
          style={{ width: 300 }}
        />
      </div>
    </div>
  );
};
