import { Watermark } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Watermark content={['Yee Design', '2024-01-01']}>
      <div style={{ height: 500, padding: 20, background: '#f5f5f5' }}>
        <h2>多行文本水印</h2>
        <p>这是一个带有多行文本水印的容器。</p>
        <p>可以显示多行内容，例如公司名称和日期。</p>
      </div>
    </Watermark>
  );
};
