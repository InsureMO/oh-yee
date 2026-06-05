import { Menu } from '@rainbow-oh/yee-c';
import { Aperture, AudioLines, Settings, User } from 'lucide-react';
import React from 'react';

export default () => {
  const items = [
    {
      key: '1',
      label: 'Menu Item 1',
      icon: <Aperture size={16} />,
    },
    {
      type: 'divider' as const,
    },
    {
      type: 'group' as const,
      label: 'User Management',
      children: [
        {
          key: '2',
          label: 'User List',
          icon: <User size={16} />,
        },
        {
          key: '3',
          label: 'User Settings',
          icon: <Settings size={16} />,
        },
      ],
    },
    {
      type: 'divider' as const,
    },
    {
      type: 'group' as const,
      label: 'Content Management',
      children: [
        {
          key: '4',
          label: 'Audio Management',
          icon: <AudioLines size={16} />,
        },
      ],
    },
  ];

  return (
    <Menu
      items={items}
      style={{ width: 256 }}
      onSelect={({ key, keyPath }) => console.log(key, keyPath)}
    />
  );
};
