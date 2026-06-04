import React, { useState } from 'react';
import { Button, Menu, Space } from '@oh/yee-c';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['1']);

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
  ];

  return (
    <Space direction="vertical">
      <Space>
        <Button onClick={() => setSelectedKeys(['1'])}>Select Item 1</Button>
        <Button onClick={() => setSelectedKeys(['2'])}>Select Item 2</Button>
        <Button onClick={() => setSelectedKeys(['3'])}>Select Item 3</Button>
      </Space>
      <Menu
        items={items}
        selectedKeys={selectedKeys}
        onSelect={({ key }) => setSelectedKeys([key])}
        style={{ width: 256 }}
      />
    </Space>
  );
};
