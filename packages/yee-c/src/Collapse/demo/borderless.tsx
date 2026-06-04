import React from 'react';
import { Collapse } from '@oh/yee-c';

export default () => {
  return (
    <Collapse
      bordered={false}
      items={[
        {
          title: 'This is panel header 1',
          key: '1',
          children: <p>Content of panel 1</p>,
        },
        {
          title: 'This is panel header 2',
          key: '2',
          children: <p>Content of panel 2</p>,
        },
        {
          title: 'This is panel header 3',
          key: '3',
          children: <p>Content of panel 3</p>,
        },
      ]}
    />
  );
};
