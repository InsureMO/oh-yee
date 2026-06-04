import { QRCode, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space wrap>
      <QRCode value="https://yee-c.example.com" color="#52c41a" />
      <QRCode value="https://yee-c.example.com" color="#1890ff" />
      <QRCode value="https://yee-c.example.com" color="#722ed1" />
    </Space>
  );
};
