import { Button, message, Space } from '@oh/yee-c';
import React from 'react';

const UpdateDemo = () => {
  const updateMessage = () => {
    const key = 'updatable';

    message.loading({
      content: '正在加载中...',
      key,
      duration: 0,
    });

    // Update message after 2 seconds
    setTimeout(() => {
      message.success({
        content: '加载成功!',
        key,
        duration: 2,
      });
    }, 2000);
  };

  return (
    <Space>
      <Button onClick={updateMessage}>更新消息</Button>
    </Space>
  );
};

export default UpdateDemo;
