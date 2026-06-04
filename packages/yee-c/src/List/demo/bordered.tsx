import React from 'react';
import { List } from '@rainbow-oh/yee-c';

export default () => {
  const items = [
    { key: '1', label: 'List item 1', value: '1' },
    { key: '2', label: 'List item 2', value: '2' },
    { key: '3', label: 'List item 3', value: '3' },
    { key: '4', label: 'List item 4', value: '4' },
  ];

  return (
    <List
      items={items}
      bordered
      onClick={(item) => console.log('Clicked item:', item)}
    />
  );
};
