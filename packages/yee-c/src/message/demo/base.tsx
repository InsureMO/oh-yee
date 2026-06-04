import { Button, message, Space } from '@rainbow-oh/yee-c';
import React from 'react';

const BaseDemo = () => {
  const { messageApi, messageHolder } = message.useMessage();
  const showMessage = (type: string) => {
    switch (type) {
      case 'info':
        messageApi.open('This is an info message');
        break;
      case 'success':
        message.success('This is a success message');
        break;
      case 'warning':
        message.warning('This is a warning message');
        break;
      case 'error':
        message.error('This is an error message');
        break;
      case 'loading':
        message.loading('This is a loading message');
        break;
      default:
        message.open('This is a plain message');
    }
  };

  return (
    <Space>
      {messageHolder}
      <Button onClick={() => showMessage('info')}>Info</Button>
      <Button onClick={() => showMessage('success')}>Success</Button>
      <Button onClick={() => showMessage('warning')}>Warning</Button>
      <Button onClick={() => showMessage('error')}>Error</Button>
      <Button onClick={() => showMessage('loading')}>Loading</Button>
      <Button onClick={() => showMessage('')}>Normal</Button>
    </Space>
  );
};

export default BaseDemo;
