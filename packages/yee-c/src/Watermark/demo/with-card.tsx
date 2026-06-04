import React from 'react';
import { Watermark, Card, Space } from '@oh/yee-c';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Watermark content="Confidential">
        <Card title="机密文档">
          <p>这是一份机密文档，带有水印保护。</p>
          <p>水印可以防止文档被未经授权的复制或传播。</p>
        </Card>
      </Watermark>

      <Watermark content="Draft">
        <Card title="草稿">
          <p>这是一个草稿文档，带有 "Draft" 水印。</p>
          <p>草稿水印通常用于标识未完成的文档。</p>
        </Card>
      </Watermark>
    </Space>
  );
};
