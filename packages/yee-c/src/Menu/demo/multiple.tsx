import { Menu } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['1', '2']);

  const items = [
    {
      key: '1',
      label: 'Menu Item 1',
    },
    {
      key: '2',
      label: 'Menu Item 2',
    },
    {
      key: '3',
      label: 'Menu Item 3',
    },
    {
      key: '4',
      label: 'Menu Item 4',
    },
  ];

  return (
    <Menu
      items={items}
      multiple
      selectedKeys={selectedKeys}
      onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
      onDeselect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
      style={{ width: 256 }}
    />
  );
};
