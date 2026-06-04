import { Button, message, Space } from '@oh/yee-c';
import React from 'react';

const DurationDemo: React.FC = () => {
  const showShortMessage = () => {
    message.success({
      content: 'This message will disappear in 1 second',
      duration: 1,
    });
  };

  const showLongMessage = () => {
    message.error({
      content: 'This message will disappear in 10 seconds',
      duration: 10,
    });
  };

  const showPermanentMessage = () => {
    message.info({
      content: 'This message will not auto-close and must be dismissed manually',
      duration: 0,
    });
  };

  return (
    <Space>
      <Button onClick={showShortMessage}>Disappear in 1s</Button>
      <Button onClick={showLongMessage}>Disappear in 10s</Button>
      <Button onClick={showPermanentMessage}>No Auto-Close</Button>
    </Space>
  );
};

export default DurationDemo;
