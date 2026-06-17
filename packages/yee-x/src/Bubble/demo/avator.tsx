import { Bubble } from '@rainbow-oh/yee-x';
import React from 'react';

export default function Index() {
  return (
    <div>
      <Bubble
        content="hello world!"
        avatar={{
          icon: <span>X</span>,
          style: { backgroundColor: 'red', color: 'white' },
        }}
        placement="start"
      />
      <Bubble
        content="hello world!"
        avatar={{
          icon: <span>Y</span>,
          style: { backgroundColor: 'red', color: 'white' },
        }}
        placement="end"
      />
    </div>
  );
}
