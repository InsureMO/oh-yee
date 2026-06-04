import { Button, message, Space } from '@oh/yee-c';
import React from 'react';

const ClosableDemo = () => {
  const showClosableMessage = () => {
    const key = `message_${Date.now()}`;
    message.loading({
      content: '这是一个可手动关闭的消息',
      duration: 0,
      key,
      onClose: () => {
        console.log('消息已关闭');
      },
    });

    // Manually close after 3 seconds
    setTimeout(() => {
      message.destroy(key);
    }, 3000);
  };

  const showCallbackMessage = () => {
    message.success({
      content: '这条消息关闭时会有回调',
      duration: 2,
      onClose: () => {
        message.info('上一条消息已关闭');
      },
    });
  };

  return (
    <Space>
      <Button onClick={showClosableMessage}>手动关闭消息</Button>
      <Button onClick={showCallbackMessage}>关闭回调</Button>
    </Space>
  );
};

export default ClosableDemo;
