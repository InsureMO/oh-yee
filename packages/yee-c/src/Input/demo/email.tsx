import React from 'react';
import { Email } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Email placeholder="Enter email address" />
      <Email placeholder="Enter email address" allowClear />
    </div>
  );
};