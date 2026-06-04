import { Breadcrumb } from '@oh/yee-c';
import React, { useState } from 'react';

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
