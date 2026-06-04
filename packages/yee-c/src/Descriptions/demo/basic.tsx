import { Descriptions } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Descriptions title="User Info">
      <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
      <Descriptions.Item label="Telephone">18100000000</Descriptions.Item>
      <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
      <Descriptions.Item label="Remark">None</Descriptions.Item>
      <Descriptions.Item label="Address">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </Descriptions.Item>
    </Descriptions>
  );
};
