import { Card, Space, Watermark } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Watermark content="Confidential">
        <Card title="Confidential Document">
          <p>This is a confidential document protected by a watermark.</p>
          <p>Watermarks help prevent unauthorized copying or distribution.</p>
        </Card>
      </Watermark>

      <Watermark content="Draft">
        <Card title="Draft">
          <p>This is a draft document with a &ldquo;Draft&rdquo; watermark.</p>
          <p>
            Draft watermarks are commonly used to mark unfinished documents.
          </p>
        </Card>
      </Watermark>
    </Space>
  );
};
