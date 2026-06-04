import { Heart, Star, ThumbsUp } from 'lucide-react';
import { Button, message, Space } from '@rainbow-oh/yee-c';
import React from 'react';

const CustomIconDemo = () => {
  const showCustomIconMessage = () => {
    message.open({
      content: 'This is a message with a custom icon',
      icon: <Star size={16} color="gold" />,
    });
  };

  const showCustomIconWithType = () => {
    message.success({
      content: 'Success message with custom icon',
      icon: <Heart size={16} color="red" />,
    });
  };

  const showEmojiMessage = () => {
    message.info({
      content: 'This message uses a custom icon',
      icon: <ThumbsUp size={16} color="#1677ff" />,
    });
  };

  return (
    <Space>
      <Button onClick={showCustomIconMessage}>Custom Icon</Button>
      <Button onClick={showCustomIconWithType}>Custom Icon with Type</Button>
      <Button onClick={showEmojiMessage}>Different Color Icon</Button>
    </Space>
  );
};

export default CustomIconDemo;
