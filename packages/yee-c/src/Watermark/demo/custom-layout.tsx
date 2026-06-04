import { Watermark } from '@oh/yee-c';
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
        <h2>自定义布局</h2>
        <p>这是一个带有自定义布局的水印：</p>
        <ul>
          <li>旋转角度：-45度</li>
          <li>水平间距：80px</li>
          <li>垂直间距：40px</li>
          <li>水印宽度：100px</li>
          <li>水印高度：50px</li>
        </ul>
      </div>
    </Watermark>
  );
};
