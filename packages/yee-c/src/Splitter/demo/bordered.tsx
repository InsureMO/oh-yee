import { Splitter } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ height: 300 }}>
      <Splitter bordered>
        <Splitter.Item>
          <div style={{ padding: 16, backgroundColor: '#f0f0f0' }}>
            Bordered Panel 1
          </div>
        </Splitter.Item>
        <Splitter.Item>
          <div style={{ padding: 16, backgroundColor: '#e0e0e0' }}>
            Bordered Panel 2
          </div>
        </Splitter.Item>
      </Splitter>
    </div>
  );
};
