import { QRCode, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space wrap>
      <QRCode value="https://yee-c.example.com" errorLevel="L" />
      <QRCode value="https://yee-c.example.com" errorLevel="M" />
      <QRCode value="https://yee-c.example.com" errorLevel="Q" />
      <QRCode value="https://yee-c.example.com" errorLevel="H" />
    </Space>
  );
};
