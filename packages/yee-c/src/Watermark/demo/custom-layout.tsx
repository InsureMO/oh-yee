import { Watermark } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Watermark
      content="Yee Design"
      rotate={-45}
      gapX={80}
      gapY={40}
      width={100}
      height={50}
    >
      <div style={{ height: 500, padding: 20, background: '#f5f5f5' }}>
        <h2>Custom Layout</h2>
        <p>This is a watermark with a custom layout:</p>
        <ul>
          <li>Rotation: -45 degrees</li>
          <li>Horizontal gap: 80px</li>
          <li>Vertical gap: 40px</li>
          <li>Watermark width: 100px</li>
          <li>Watermark height: 50px</li>
        </ul>
      </div>
    </Watermark>
  );
};
