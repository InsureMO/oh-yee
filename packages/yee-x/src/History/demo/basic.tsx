import { History } from '@rainbow-oh/yee-x';
import React from 'react';

const Demo = () => {
  const items = [
    {
      key: '1',
      label: 'Family Protect Term',
      group: 'Today',
      description: '14:32',
    },
    {
      key: '2',
      label: 'Wealth Builder Endowment',
      group: 'Today',
      description: '09:15',
    },
    {
      key: '3',
      label: 'Critical Care Plus',
      group: 'Previous 7 days',
      description: '2026-11-16',
    },
    { key: '4', label: 'Legacy session', description: '2026-10-02' },
  ];

  const menu = [
    { key: 'edit', label: 'Edit' },
    { key: 'delete', label: 'Delete' },
  ];

  return <History items={items} menu={menu} activeKey="1" />;
};

export default Demo;
