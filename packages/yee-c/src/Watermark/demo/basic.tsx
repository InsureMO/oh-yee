import { Watermark } from '@oh/yee-c';
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
        <h2>基础文本水印</h2>
        <p>这是一个带有文本水印的容器。水印会自动覆盖整个区域。</p>
        <p>
          尝试在浏览器开发者工具中删除水印层，水印会自动恢复（防删除功能）。
        </p>
      </div>
    </Watermark>
  );
};
