import React from 'react';
import { Password } from '@oh/yee-c';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Password placeholder="请输入密码" />
      <Password placeholder="无可见性切换" visibilityToggle={false} />
    </div>
  );
};