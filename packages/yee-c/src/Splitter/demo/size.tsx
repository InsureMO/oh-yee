import { Splitter } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ height: 300 }}>
      <Splitter>
        <Splitter.Item defaultSize="30%">
          <div style={{ padding: 16, backgroundColor: '#f0f0f0' }}>
            30% Panel
          </div>
        </Splitter.Item>
        <Splitter.Item min="200px" max="60%">
          <div style={{ padding: 16, backgroundColor: '#e0e0e0' }}>
            Min 200px, Max 60% Panel
          </div>
        </Splitter.Item>
        <Splitter.Item>
          <div style={{ padding: 16, backgroundColor: '#d0d0d0' }}>
            Auto Panel
          </div>
        </Splitter.Item>
      </Splitter>
    </div>
  );
};
