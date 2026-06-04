import React from 'react';
import { Watermark } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Watermark
        content="Short"
        width={200}
        height={80}
        gapX={20}
        gapY={20}
      >
        <div style={{ height: 300, padding: 20, background: '#f5f5f5' }}>
          <h3>Fixed-size Watermark (Short Text)</h3>
          <p>Forced dimensions: width=200, height=80</p>
          <p>The watermark area stays fixed even when the text is short</p>
        </div>
      </Watermark>

      <Watermark
        content="This is a very long watermark text"
        width={100}
        height={30}
        gapX={20}
        gapY={20}
        fontColor="rgba(255, 0, 0, 0.15)"
      >
        <div style={{ height: 300, padding: 20, background: '#f5f5f5' }}>
          <h3>Fixed-size Watermark (Text Overflow)</h3>
          <p>Forced dimensions: width=100, height=30</p>
          <p>Text is truncated, showing only partial content</p>
        </div>
      </Watermark>
    </div>
  );
};
