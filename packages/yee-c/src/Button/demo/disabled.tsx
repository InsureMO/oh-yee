import { Button, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Space wrap>
      <Button disabled>Default</Button>
      <Button disabled type="primary">
        Primary
      </Button>
      <Button disabled color="success">
        Success
      </Button>
      <Button disabled color="warning">
        Warning
      </Button>
      <Button disabled color="danger">
        Danger
      </Button>
      <Button disabled color="info">
        Info
      </Button>
      <Button disabled type="text">
        Text
      </Button>
    </Space>
  );
};
