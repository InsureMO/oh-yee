import { Button, message, Space } from '@oh/yee-c';
import React from 'react';

const ClosableDemo = () => {
  const showClosableMessage = () => {
    const key = `message_${Date.now()}`;
    message.loading({
      content: 'This is a manually closable message',
      duration: 0,
      key,
      onClose: () => {
        console.log('Message closed');
      },
    });

    // Manually close after 3 seconds
    setTimeout(() => {
      message.destroy(key);
    }, 3000);
  };

  const showCallbackMessage = () => {
    message.success({
      content: 'This message has a close callback',
      duration: 2,
      onClose: () => {
        message.info('Previous message closed');
      },
    });
  };

  return (
    <Space>
      <Button onClick={showClosableMessage}>Manual Close</Button>
      <Button onClick={showCallbackMessage}>Close Callback</Button>
    </Space>
  );
};

export default ClosableDemo;
