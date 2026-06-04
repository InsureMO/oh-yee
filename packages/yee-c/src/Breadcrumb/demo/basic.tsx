import React from 'react';
import { Breadcrumb } from '@rainbow-oh/yee-c';

export default () => {
  const items = [
    {
      title: 'Home',
      href: '#',
    },
    {
      title: 'Products',
      href: '#',
    },
    {
      title: 'Electronics',
      href: '#',
    },
    {
      title: 'Phones',
    },
  ];

  return <Breadcrumb items={items} />;
};
