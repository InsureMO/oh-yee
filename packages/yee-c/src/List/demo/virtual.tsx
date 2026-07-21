import { List } from '@rainbow-oh/yee-c';
import React from 'react';

const items = Array.from({ length: 10000 }, (_, i) => ({
  key: String(i),
  label: `List item ${i + 1}`,
  value: String(i),
}));

export default () => {
  return (
    <List
      virtual
      height={300}
      itemHeight={32}
      items={items}
      onClick={(item) => console.log('Clicked:', item.label)}
    />
  );
};
