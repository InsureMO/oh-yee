import { Watermark } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Watermark content="This is a very long watermark text that will be automatically calculated">
        <div style={{ height: 300, padding: 20, background: '#f5f5f5' }}>
          <h3>长文本自动计算宽度</h3>
          <p>水印文本会根据内容自动计算宽度，不会被截断。</p>
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
          <h3>多行长文本</h3>
          <p>多行长文本也会自动计算宽度和高度。</p>
          <p>每一行都会被完整显示。</p>
        </div>
      </Watermark>
    </div>
  );
};
