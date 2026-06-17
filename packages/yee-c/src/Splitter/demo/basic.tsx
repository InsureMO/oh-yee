import { Splitter } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ height: 300 }}>
      <Splitter>
        <Splitter.Item>
          <div style={{ margin: 8, padding: 16, backgroundColor: '#f0f0f0' }}>
            Left Panel
          </div>
        </Splitter.Item>
        <Splitter.Item>
          <div style={{ margin: 8, padding: 16, backgroundColor: '#e0e0e0' }}>
            Right Panel
          </div>
        </Splitter.Item>
      </Splitter>
    </div>
  );
};
