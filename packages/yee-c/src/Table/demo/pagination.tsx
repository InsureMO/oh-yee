import type { PaginationType } from '@rainbow-oh/yee-c';
import { Table } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
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

  const dataSource = [];
  for (let i = 1; i <= 50; i++) {
    dataSource.push({
      key: i,
      name: `User ${i}`,
      age: 20 + (i % 20),
      address: `Address ${i}`,
    });
  }

  const [, setpagination] = useState({
    current: 1,
    pageSize: 10,
    total: dataSource.length,
  });

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      onChange={({ pagination, action }) => {
        if (action === 'paginate') {
          setpagination((prev) => ({
            ...prev,
            current: (pagination as PaginationType).current,
            pageSize: (pagination as PaginationType).pageSize,
          }));
        }
      }}
    />
  );
};
