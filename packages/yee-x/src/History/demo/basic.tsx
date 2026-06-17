import { History } from '@rainbow-oh/yee-x';
import React from 'react';

const Demo = () => {
  const items = [
    { key: '1', label: 'Chat 1' },
    { key: '2', label: 'Chat 2' },
    { key: '3', label: 'Chat 3' },
  ];

  const menu = [
    { key: 1, label: 'Edit' },
    { key: 2, label: 'Delete' },
  ];

  return <History items={items} menu={menu} />;
};

export default Demo;
