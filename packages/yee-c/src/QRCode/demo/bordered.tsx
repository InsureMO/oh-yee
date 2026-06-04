import { QRCode } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <QRCode value="https://yee-c.example.com" bordered={true} />
      <QRCode value="https://yee-c.example.com" bordered={false} />
    </div>
  );
};
