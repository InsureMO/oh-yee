import { Button, message, Space } from '@rainbow-oh/yee-c';
import React from 'react';

const UpdateDemo = () => {
  const updateMessage = () => {
    const key = 'updatable';

    message.loading({
      content: 'Loading...',
      key,
      duration: 0,
    });

    // Update message after 2 seconds
    setTimeout(() => {
      message.success({
        content: 'Loaded successfully!',
        key,
        duration: 2,
      });
    }, 2000);
  };

  return (
    <Space>
      <Button onClick={updateMessage}>Update Message</Button>
    </Space>
  );
};

export default UpdateDemo;
