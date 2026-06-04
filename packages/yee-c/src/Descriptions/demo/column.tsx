import React from 'react';
import { Button, Descriptions } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <Descriptions title="User Info" column={2}>
      <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
      <Descriptions.Item label="Telephone">18100000000</Descriptions.Item>
      <Descriptions.Item label="Live" span={2}>
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </Descriptions.Item>
      <Descriptions.Item label="Remark" span={2}>
        None
      </Descriptions.Item>
    </Descriptions>
  );
};
