import { Menu } from '@oh/yee-c';
import React from 'react';

export default () => {
  const items = [
    {
      key: '1',
      icon: <span>✉️</span>,
      label: 'Navigation One',
    },
    {
      key: '2',
      icon: <span>⚙️</span>,
      label: 'Navigation Two',
    },
    {
      key: '3',
      icon: <span>📊</span>,
      label: 'Navigation Three',
      children: [
        {
          key: '3-1',
          label: 'Option 1',
        },
        {
          key: '3-2',
          label: 'Option 2',
        },
      ],
    },
  ];

  return <Menu mode="inline" items={items} style={{ width: 256 }} />;
};
