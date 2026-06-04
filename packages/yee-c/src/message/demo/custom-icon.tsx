import { Heart, Star, ThumbsUp } from 'lucide-react';
import { Button, message, Space } from '@oh/yee-c';
import React from 'react';

const CustomIconDemo = () => {
  const showCustomIconMessage = () => {
    message.open({
      content: '这是自定义图标的message',
      icon: <Star size={16} color="gold" />,
    });
  };

  const showCustomIconWithType = () => {
    message.success({
      content: '带自定义图标的success消息',
      icon: <Heart size={16} color="red" />,
    });
  };

  const showEmojiMessage = () => {
    message.info({
      content: '这条消息使用了自定义图标',
      icon: <ThumbsUp size={16} color="#1677ff" />,
    });
  };

  return (
    <Space>
      <Button onClick={showCustomIconMessage}>自定义图标</Button>
      <Button onClick={showCustomIconWithType}>自定义图标with类型</Button>
      <Button onClick={showEmojiMessage}>不同颜色图标</Button>
    </Space>
  );
};

export default CustomIconDemo;
