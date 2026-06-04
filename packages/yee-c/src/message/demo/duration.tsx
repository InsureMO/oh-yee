import { Button, message, Space } from '@oh/yee-c';
import React from 'react';

const DurationDemo: React.FC = () => {
  const showShortMessage = () => {
    message.success({
      content: '这条消息将在1秒后消失',
      duration: 1,
    });
  };

  const showLongMessage = () => {
    message.error({
      content: '这条消息将在10秒后消失',
      duration: 10,
    });
  };

  const showPermanentMessage = () => {
    message.info({
      content: '这条消息不会自动消失，需要手动关闭',
      duration: 0,
    });
  };

  return (
    <Space>
      <Button onClick={showShortMessage}>1秒后消失</Button>
      <Button onClick={showLongMessage}>10秒后消失</Button>
      <Button onClick={showPermanentMessage}>不自动消失</Button>
    </Space>
  );
};

export default DurationDemo;
