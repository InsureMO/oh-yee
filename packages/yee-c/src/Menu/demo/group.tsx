import { Menu } from '@oh/yee-c';
import React from 'react';
import { Aperture, AudioLines, Settings, User } from 'lucide-react';

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
      label: '用户管理',
      children: [
        {
          key: '2',
          label: '用户列表',
          icon: <User size={16} />,
        },
        {
          key: '3',
          label: '用户设置',
          icon: <Settings size={16} />,
        },
      ],
    },
    {
      type: 'divider' as const,
    },
    {
      type: 'group' as const,
      label: '内容管理',
      children: [
        {
          key: '4',
          label: '音频管理',
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
