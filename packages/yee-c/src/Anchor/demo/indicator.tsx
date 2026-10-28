import { Anchor } from '@rainbow-oh/yee-c';
import React, { useRef, useState } from 'react';

const COLORS = [
  '#f0f0f0',
  '#e0e0e0',
  '#d0d0d0',
  '#f5e6e6',
  '#e6f0f5',
  '#e6f5e9',
  '#f5f0e6',
  '#f0e6f5',
];

export default () => {
  const [activeKey, setActiveKey] = useState('slide-part1');
  const containerRef = useRef<HTMLDivElement>(null);
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div
      style={{ display: 'flex', height: '300px', overflow: 'auto' }}
      ref={containerRef}
    >
      <Anchor
        items={COLORS.map((_, i) => ({
          key: `slide-part${i + 1}`,
          title: `Part ${i + 1}`,
        }))}
        direction="vertical"
        affix={false}
        indicator="slide"
        activeKey={activeKey}
        onChange={onChange}
        getContainer={() => containerRef.current!}
      />
      <div style={{ flex: 1, padding: '20px' }}>
        {COLORS.map((color, i) => (
          <div
            key={`slide-part${i + 1}`}
            id={`slide-part${i + 1}`}
            style={{
              height: '250px',
              backgroundColor: color,
              marginBottom: '20px',
            }}
          >
            Part {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
