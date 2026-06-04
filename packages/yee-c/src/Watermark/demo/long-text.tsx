import { Watermark } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Watermark content="This is a very long watermark text that will be automatically calculated">
        <div style={{ height: 300, padding: 20, background: '#f5f5f5' }}>
          <h3>Long Text Auto-width</h3>
          <p>The watermark text width is automatically calculated based on content and will not be truncated.</p>
        </div>
      </Watermark>

      <Watermark
        content={[
          'Yee Design Company Limited',
          'Confidential Document - Do Not Copy',
          'Generated on 2024-01-01',
        ]}
        fontColor="rgba(255, 0, 0, 0.1)"
        fontSize={14}
      >
        <div style={{ height: 300, padding: 20, background: '#f5f5f5' }}>
          <h3>Multi-line Long Text</h3>
          <p>Multi-line long text also auto-calculates width and height.</p>
          <p>Each line is fully displayed.</p>
        </div>
      </Watermark>
    </div>
  );
};
