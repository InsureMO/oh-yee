import { Anchor } from '@rainbow-oh/yee-c';
import React, { useRef, useState } from 'react';

export default () => {
  const [activeKey, setActiveKey] = useState('part1');
  const containerRef = useRef<HTMLDivElement>(null);
  const onChange = (key: string) => {
    console.log('Anchor changed to:', key);
    setActiveKey(key);
  };

  return (
    <div
      style={{ display: 'flex', height: '200px', overflow: 'auto' }}
      ref={containerRef}
    >
      <Anchor
        items={[
          { key: 'part1', title: 'Part 1' },
          { key: 'part2', title: 'Part 2' },
          { key: 'part3', title: 'Part 3' },
        ]}
        direction="vertical"
        affix={false}
        activeKey={activeKey}
        onChange={onChange}
        getContainer={() => containerRef.current!}
      />
      <div style={{ flex: 1, padding: '20px' }}>
        <div
          id="part1"
          style={{
            height: '300px',
            backgroundColor: '#f0f0f0',
            marginBottom: '20px',
          }}
        >
          Part 1
        </div>
        <div
          id="part2"
          style={{
            height: '300px',
            backgroundColor: '#e0e0e0',
            marginBottom: '20px',
          }}
        >
          Part 2
        </div>
        <div id="part3" style={{ height: '300px', backgroundColor: '#d0d0d0' }}>
          Part 3
        </div>
      </div>
    </div>
  );
};
