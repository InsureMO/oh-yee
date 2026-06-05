import { Anchor } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, height: '200px' }}>
        <Anchor
          items={[
            { key: 'part1', title: 'Part 1' },
            { key: 'part2', title: 'Part 2' },
            { key: 'part3', title: 'Part 3' },
          ]}
          direction="horizontal"
        />
      </div>
    </div>
  );
};
