import { Card, QRCode, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical" gap={16}>
      <Card title="Basic QR Code">
        <QRCode value="https://yee-c.example.com" />
      </Card>

      <Card title="Custom Sizes">
        <Space wrap>
          <QRCode value="https://yee-c.example.com" size={100} />
          <QRCode value="https://yee-c.example.com" size={160} />
          <QRCode value="https://yee-c.example.com" size={220} />
        </Space>
      </Card>

      <Card title="Custom Colors">
        <Space wrap>
          <QRCode value="https://yee-c.example.com" color="#52c41a" />
          <QRCode value="https://yee-c.example.com" color="#1890ff" />
          <QRCode value="https://yee-c.example.com" color="#722ed1" />
        </Space>
      </Card>
    </Space>
  );
};
