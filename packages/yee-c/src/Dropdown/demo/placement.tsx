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
      keyboard
    />
  );

  return (
    <Space wrap>
      <Dropdown popup={menu} placement="bottomLeft">
        <Button>Bottom Left</Button>
      </Dropdown>
      <Dropdown popup={menu} placement="bottom">
        <Button>Bottom Center</Button>
      </Dropdown>
      <Dropdown popup={menu} placement="bottomRight">
        <Button>Bottom Right</Button>
      </Dropdown>
      <Dropdown popup={menu} placement="topLeft">
        <Button>Top Left</Button>
      </Dropdown>
      <Dropdown popup={menu} placement="top">
        <Button>Top Center</Button>
      </Dropdown>
      <Dropdown popup={menu} placement="topRight">
        <Button>Top Right</Button>
      </Dropdown>
    </Space>
  );
};
