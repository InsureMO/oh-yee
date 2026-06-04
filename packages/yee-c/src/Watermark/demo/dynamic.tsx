import { Input, Space, Watermark } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [text, setText] = useState('Yee Design');

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Input
        placeholder="输入水印文本"
        value={text}
        onChange={(e) => setText(e)}
        style={{ width: 300 }}
      />
      <Watermark content={text}>
        <div style={{ height: 500, padding: 20, background: '#f5f5f5' }}>
          <h2>动态水印</h2>
          <p>在上方输入框中输入文本，水印会实时更新。</p>
        </div>
      </Watermark>
    </Space>
  );
};
