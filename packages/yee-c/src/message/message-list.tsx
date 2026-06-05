import React from 'react';
import type { MessageProps } from './interface';
import Message from './message';

import './style/index.less';

const MessageList = ({
  items,
  onDestroy,
}: {
  items: MessageProps[];
  onDestroy: (key: string | number) => void;
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="yee-message-list">
      {items.map((item: MessageProps) => (
        <Message {...item} id={item.key} onDestroy={onDestroy} key={item.key} />
      ))}
    </div>
  );
};

export default MessageList;
