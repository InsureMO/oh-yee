import React from 'react';
import { Watermark } from '@oh/yee-c';

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
          <h3>固定尺寸水印（文本较短）</h3>
          <p>强制使用 width=200, height=80</p>
          <p>即使文本很短，水印区域也是固定的</p>
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
          <h3>固定尺寸水印（文本超出）</h3>
          <p>强制使用 width=100, height=30</p>
          <p>文本会被截断，只显示部分内容</p>
        </div>
      </Watermark>
    </div>
  );
};
