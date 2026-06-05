import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  MessageConfig,
  MessageType,
  WrapperedMessageConfig,
} from './interface';
import Message from './message';

const useMessage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const count = useRef(0);

  const onDestroy = (key: string | number) => {
    setMessages((prevMessage) => [
      ...prevMessage.filter((msg) => msg.key !== key),
    ]);
  };

  const add = useCallback((props: WrapperedMessageConfig) => {
    const id = count.current++;
    setMessages((prevMessages) => [...prevMessages, { key: id, ...props }]);
    return () => onDestroy(id);
  }, []);

  const messageApi = {
    open: (props: string | MessageConfig) => {
      return add(
        typeof props === 'string'
          ? { content: props, status: 'info' }
          : { status: 'info', ...props },
      );
    },
    info: (props: string | MessageConfig) => {
      return add(
        typeof props === 'string'
          ? { content: props, status: 'info' }
          : { status: 'info', ...props },
      );
    },
    success: (props: string | MessageConfig) => {
      return add(
        typeof props === 'string'
          ? { content: props, status: 'success' }
          : { ...props, status: 'success' },
      );
    },
    error: (props: string | MessageConfig) => {
      return add(
        typeof props === 'string'
          ? { content: props, status: 'error' }
          : { ...props, status: 'error' },
      );
    },
    warning: (props: string | MessageConfig) => {
      return add(
        typeof props === 'string'
          ? { content: props, status: 'warning' }
          : { ...props, status: 'warning' },
      );
    },
    loading: (props: string | MessageConfig) => {
      return add(
        typeof props === 'string'
          ? { content: props, status: 'loading' }
          : { ...props, status: 'loading' },
      );
    },
    destroy: (key: string | number) => {
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.key !== key),
      );
    },
    clear: () => {
      setMessages([]);
    },
  };

  const messageHolder = createPortal(
    <div className="yee-message-list">
      {messages.map((msg) => (
        <Message {...msg} onDestroy={onDestroy} id={msg.key} key={msg.key} />
      ))}
    </div>,
    document.body,
  );

  return { messageApi, messageHolder };
};

export default useMessage;
