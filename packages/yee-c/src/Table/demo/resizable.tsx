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
    minWidth: 100,
  },
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
    width: 240,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    width: 180,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 240,
  },
  {
    // Opt this column out of resizing while the rest stay resizable.
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 100,
    resizable: false,
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
    email: 'john.brown@example.com',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    company: 'Globex',
    email: 'jim.green@example.com',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 28,
    address: 'Sidney No. 1 Lake Park',
    company: 'Initech',
    email: 'joe.black@example.com',
  },
];

export default () => {
  const [widths, setWidths] = React.useState<Record<string, number>>({});

  return (
    <>
      <Table
        resizable
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        pagination={false}
        scroll={{ x: 1000 }}
        onColumnResizeEnd={(width, column) =>
          setWidths((current) => ({
            ...current,
            [String(column.key ?? column.dataIndex)]: width,
          }))
        }
      />
      <p style={{ marginTop: 12 }}>
        最近调整：
        {Object.keys(widths).length
          ? Object.entries(widths)
              .map(([key, width]) => `${key}=${width}px`)
              .join('，')
          : '拖动表头右边缘试试'}
      </p>
    </>
  );
};
