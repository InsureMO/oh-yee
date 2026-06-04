import { Button, message, Space } from '@oh/yee-c';
import React from 'react';

const BaseDemo = () => {
  const { messageApi, messageHolder } = message.useMessage();
  const showMessage = (type: string) => {
    switch (type) {
      case 'info':
        messageApi.open('这是一条info消息');
        break;
      case 'success':
        message.success('这是一条success消息');
        break;
      case 'warning':
        message.warning('这是一条warning消息');
        break;
      case 'error':
        message.error('这是一条error消息');
        break;
      case 'loading':
        message.loading('这是一条loading消息');
        break;
      default:
        message.open('这是一条普通消息');
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
