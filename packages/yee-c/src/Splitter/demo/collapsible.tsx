import { Splitter } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ height: 300 }}>
      <Splitter>
        <Splitter.Item collapsible>
          <div style={{ padding: 16, backgroundColor: '#f0f0f0' }}>
            Collapsible Panel
          </div>
        </Splitter.Item>
        <Splitter.Item>
          <div style={{ padding: 16, backgroundColor: '#e0e0e0' }}>
            Main Panel
          </div>
        </Splitter.Item>
      </Splitter>
    </div>
  );
};
