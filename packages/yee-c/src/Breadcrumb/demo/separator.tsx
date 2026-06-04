import { Breadcrumb } from '@oh/yee-c';
import React from 'react';

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

  return (
    <>
      <Breadcrumb items={items} separator=">" />
      <br />
      <Breadcrumb items={items} separator="|" />
      <br />
      <Breadcrumb items={items} separator="→" />
    </>
  );
};
