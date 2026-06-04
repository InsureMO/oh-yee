import { Button, Dropdown, Menu, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const menu = (
    <Menu
      items={[
        { key: '1', label: 'Option 1' },
        { key: '2', label: 'Option 2' },
        { key: '3', label: 'Option 3' },
      ]}
    />
  );

  return (
    <Space wrap>
      <Dropdown popup={menu} trigger="hover">
        <Button>Hover me</Button>
      </Dropdown>
      <Dropdown popup={menu} trigger="click">
        <Button>Click me</Button>
      </Dropdown>
    </Space>
  );
};
