import { Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space.Compact>
      <input placeholder="Enter name" style={{ padding: '4px 11px' }} />
      <button
        style={{
          background: '#1890ff',
          color: 'white',
          border: 'none',
          padding: '4px 11px',
        }}
      >
        Submit
      </button>
    </Space.Compact>
  );
};
