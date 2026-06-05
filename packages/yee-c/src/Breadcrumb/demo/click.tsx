import { Breadcrumb } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [items, setItems] = useState([
    {
      title: 'Home',
      href: '#',
      onClick: ({ index }: { index: number }) => {
        console.log('Breadcrumb item clicked');
        setItems((state) => state.slice(0, index + 1));
      },
    },
    {
      title: 'Products',
      href: '#',
      onClick: ({ index }: { index: number }) => {
        console.log('Breadcrumb item clicked');
        setItems((state) => state.slice(0, index + 1));
      },
    },
    {
      title: 'Electronics',
      href: '#',
      onClick: ({ index }: { index: number }) => {
        console.log('Breadcrumb item clicked');
        setItems((state) => state.slice(0, index + 1));
      },
    },
    {
      title: 'Phones',
      onClick: ({ index }: { index: number }) => {
        console.log('Breadcrumb item clicked');
        setItems((state) => state.slice(0, index + 1));
      },
    },
  ]);

  return <Breadcrumb items={items} />;
};
