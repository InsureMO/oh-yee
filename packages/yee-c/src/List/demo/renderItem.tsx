import React from 'react';
import { List } from '@rainbow-oh/yee-c';
import type { ListItemProps } from '@rainbow-oh/yee-c';

export default () => {
  const users = [
    { key: '1', name: 'Alice', age: 25, email: 'alice@example.com' },
    { key: '2', name: 'Bob', age: 30, email: 'bob@example.com' },
    { key: '3', name: 'Charlie', age: 35, email: 'charlie@example.com' },
  ];

  return (
    <List
      items={users}
      bordered
      itemRender={(item: ListItemProps) => {
        const user = item as typeof users[0];
        return (
          <div style={{ padding: '8px 16px' }}>
            <div style={{ fontWeight: 'bold' }}>{user.name}</div>
            <div>Age: {user.age}</div>
            <div>Email: {user.email}</div>
          </div>
        );
      }}
      onClick={(item) => console.log('Clicked user:', item)}
    />
  );
};
