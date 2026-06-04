import React from 'react';
import { Anchor } from '@rainbow-oh/yee-c';

export default () => {
  const items = [
    {
      key: 'part-1',
      title: 'Part 1',
    },
    {
      key: 'part-2',
      title: 'Part 2',
    },
    {
      key: 'part-3',
      title: 'Part 3',
    },
  ];

  return (
    <div
      id="basic-container"
      style={{ display: 'flex', height: '100vh', overflow: 'auto' }}
    >
      <Anchor
        items={items}
        defaultActiveKey="part-1"
        getContainer={() => document.getElementById('basic-container')!}
      />
      <div style={{ flex: 1, padding: '20px' }}>
        <div
          id="part-1"
          style={{
            height: '300px',
            backgroundColor: '#f0f0f0',
            marginBottom: '20px',
          }}
        >
          Part 1 Content
        </div>
        <div
          id="part-2"
          style={{
            height: '300px',
            backgroundColor: '#e0e0e0',
            marginBottom: '20px',
          }}
        >
          Part 2 Content
        </div>
        <div
          id="part-3"
          style={{ height: '300px', backgroundColor: '#d0d0d0' }}
        >
          Part 3 Content
        </div>
      </div>
    </div>
  );
};
