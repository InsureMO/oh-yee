import React from 'react';
import { Password } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Password placeholder="Enter password" />
      <Password placeholder="No visibility toggle" visibilityToggle={false} />
    </div>
  );
};