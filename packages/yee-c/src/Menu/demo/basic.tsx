import { Menu } from '@rainbow-oh/yee-c';
import { Aperture, AudioLines, Barrel } from 'lucide-react';
import React from 'react';

export default () => {
  const items = [
    {
      key: '1',
      label: 'Menu Item 1',
      icon: <Aperture />,
    },
    {
      key: '2',
      label: 'Menu Item 2',
      icon: <AudioLines />,
    },
    {
      key: '3',
      label: 'Menu Item 3',
      icon: <Barrel />,
      children: [
        {
          key: '3-1',
          label: 'Sub Menu Item 3-1',
        },
        {
          key: '3-2',
          label: 'Sub Menu Item 3-2',
        },
      ],
    },
  ];

  return (
    <Menu
      items={items}
      onSelect={({ key, keyPath }) => {
        console.log('Selected key:', key);
        console.log('Key path:', keyPath);
      }}
    />
  );
};
