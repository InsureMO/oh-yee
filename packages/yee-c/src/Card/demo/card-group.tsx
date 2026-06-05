import { Card, Table } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
  ];

  const data = [
    { key: '1', name: 'John', age: 32 },
    { key: '2', name: 'Jim', age: 42 },
  ];

  return (
    <Card.Group>
      <Card title="User Info">
        <p>Basic card content</p>
      </Card>
      <Card title="User Table" showHeader={false}>
        <Table dataSource={data} columns={columns} />
      </Card>
    </Card.Group>
  );
};
