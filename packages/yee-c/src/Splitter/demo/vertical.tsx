import { Splitter } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ height: 500 }}>
      <Splitter layout="vertical">
        <Splitter.Item size={250}>
          <div
            style={{
              marginBottom: 8,
              padding: 16,
              backgroundColor: '#f0f0f0',
              height: '100%',
            }}
          >
            Top Panel
          </div>
        </Splitter.Item>
        <Splitter.Item size={250}>
          <div
            style={{
              marginTop: 8,
              padding: 16,
              backgroundColor: '#e0e0e0',
              height: '100%',
            }}
          >
            Bottom Panel
          </div>
        </Splitter.Item>
      </Splitter>
    </div>
  );
};
