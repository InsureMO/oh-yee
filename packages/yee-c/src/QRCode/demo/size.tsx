import { QRCode, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space wrap>
      <QRCode value="https://yee-c.example.com" size={100} />
      <QRCode value="https://yee-c.example.com" size={160} />
      <QRCode value="https://yee-c.example.com" size={200} />
    </Space>
  );
};
