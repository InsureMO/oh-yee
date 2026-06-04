import { Watermark } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Watermark content="Yee Design">
      <div
        style={{
          height: 500,
          padding: 20,
          background: '#f5f5f5',
          width: '100%',
        }}
      >
        <h2>Basic Text Watermark</h2>
        <p>This is a container with a text watermark. The watermark automatically covers the entire area.</p>
        <p>
          Try removing the watermark layer in browser DevTools — the watermark will automatically restore (anti-removal feature).
        </p>
      </div>
    </Watermark>
  );
};
