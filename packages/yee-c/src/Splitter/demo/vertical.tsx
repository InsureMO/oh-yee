import { Splitter } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ height: 300 }}>
      <Splitter layout="vertical">
        <Splitter.Item>
          <div style={{ padding: 16, backgroundColor: '#f0f0f0' }}>
            Top Panel
          </div>
        </Splitter.Item>
        <Splitter.Item>
          <div style={{ padding: 16, backgroundColor: '#e0e0e0' }}>
            Bottom Panel
          </div>
        </Splitter.Item>
      </Splitter>
    </div>
  );
};
