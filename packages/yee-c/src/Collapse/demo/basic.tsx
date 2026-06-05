import { Collapse } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const items = [
    {
      key: '1',
      title: 'This is panel header 1',
      children: <p>This is panel content 1</p>,
    },
    {
      key: '2',
      title: 'This is panel header 2',
      children: <p>This is panel content 2</p>,
    },
    {
      key: '3',
      title: 'This is panel header 3',
      children: <p>This is panel content 3</p>,
    },
  ];

  return <Collapse items={items} defaultActiveKey={['1']} />;
};
