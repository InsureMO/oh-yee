import { ImageViewer, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical" gap={16}>
      <div style={{ height: 300, width: 400 }}>
        <h4 style={{ marginBottom: 8 }}>Position: bottom (default)</h4>
        <ImageViewer
          src="https://picsum.photos/id/20/800/600"
          position="bottom"
        />
      </div>
      <div style={{ height: 300, width: 400 }}>
        <h4 style={{ marginBottom: 8 }}>Position: top</h4>
        <ImageViewer src="https://picsum.photos/id/30/800/600" position="top" />
      </div>
      <div style={{ height: 300, width: 400 }}>
        <h4 style={{ marginBottom: 8 }}>Position: left</h4>
        <ImageViewer
          src="https://picsum.photos/id/40/800/600"
          position="left"
        />
      </div>
    </Space>
  );
};
