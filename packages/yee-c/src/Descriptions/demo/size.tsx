import React from 'react';
import { Descriptions } from '@oh/yee-c';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Descriptions title="Small" size="small" bordered>
        <Descriptions.Item label="Name">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Telephone">18100000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Default" size="default" bordered>
        <Descriptions.Item label="Name">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Telephone">18100000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Large" size="large" bordered>
        <Descriptions.Item label="Name">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Telephone">18100000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
