import { Watermark } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Watermark
      content="Yee Design"
      fontColor="#1890ff"
      fontSize={20}
      fontFamily="Arial"
      fontStyle="italic"
    >
      <div style={{ height: 500, padding: 20, background: '#f5f5f5' }}>
        <h2>自定义样式水印</h2>
        <p>这是一个带有自定义样式的水印：</p>
        <ul>
          <li>字体颜色：#1890ff</li>
          <li>字体大小：20px</li>
          <li>字体风格：斜体</li>
          <li>字体粗细：粗体</li>
        </ul>
      </div>
    </Watermark>
  );
};
