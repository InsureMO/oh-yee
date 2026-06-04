import React, { useState } from 'react';
import { Breadcrumb } from '@rainbow-oh/yee-c';

export default () => {

  const handleClick = ({ index }: { index: number }) => {
    console.log('Breadcrumb item clicked');

    setItems(state => (state.slice(0, index + 1)));
  };

  const [items, setItems] = useState([
    {
      title: 'Home',
      href: '#',
      onClick: handleClick,
    },
    {
      title: 'Products',
      href: '#',
      onClick: handleClick,
    },
    {
      title: 'Electronics',
      href: '#',
      onClick: handleClick,
    },
    {
      title: 'Phones',
      onClick: handleClick,
    },
  ])

  return <Breadcrumb items={items} />;
};
