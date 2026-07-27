import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  MessageApi,
  MessageType,
  WrapperedMessageConfig,
} from './interface';
import Message from './message';

const useMessage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );
  const messagesRef = useRef<MessageType[]>([]);
  const generationByKey = useRef(new Map<string | number, number>());
  const generation = useRef(0);
  const timerGeneration = useRef(0);
  const count = useRef(0);

  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  const updateMessages = useCallback(
    (updater: (current: MessageType[]) => MessageType[]) => {
      const nextMessages = updater(messagesRef.current);
      messagesRef.current = nextMessages;
      setMessages(nextMessages);
    },
    [],
  );

  const onDestroy = useCallback(
    (key: string | number, expectedTimerGeneration?: number) => {
      const target = messagesRef.current.find((message) => message.key === key);
      if (
        expectedTimerGeneration !== undefined &&
        target?.timerGeneration !== expectedTimerGeneration
      ) {
        return;
      }

      if (!target) {
        return;
      }

      generationByKey.current.delete(key);
      updateMessages((current) =>
        current.filter((message) => message.key !== key),
      );
      target.onClose?.();
    },
    [updateMessages],
  );

  const add = useCallback(
    (props: WrapperedMessageConfig) => {
      const key = props.key ?? count.current++;
      if (typeof key === 'number' && key >= count.current) {
        count.current = key + 1;
      }
      const keyGeneration =
        generationByKey.current.get(key) ?? generation.current++;
      generationByKey.current.set(key, keyGeneration);
      const nextMessage = {
        ...props,
        key,
        timerGeneration: timerGeneration.current++,
      } as MessageType;

      updateMessages((current) => {
        const exists = current.some((item) => item.key === key);
        if (exists) {
          return current.map((item) =>
            item.key === key ? nextMessage : item,
          );
        }
        return [...current, nextMessage];
      });

      return () => {
        if (generationByKey.current.get(key) === keyGeneration) {
          onDestroy(key);
        }
      };
    },
    [onDestroy, updateMessages],
  );

  const clear = useCallback(() => {
    const currentMessages = messagesRef.current;
    generationByKey.current.clear();
    messagesRef.current = [];
    setMessages([]);
    currentMessages.forEach((message) => message.onClose?.());
  }, []);

  const messageApi = useMemo<MessageApi>(
    () => ({
      open: (props) =>
        add(
          typeof props === 'string'
            ? { content: props, status: 'info' }
            : { status: 'info', ...props },
        ),
      info: (props) =>
        add(
          typeof props === 'string'
            ? { content: props, status: 'info' }
            : { status: 'info', ...props },
        ),
      success: (props) =>
        add(
          typeof props === 'string'
            ? { content: props, status: 'success' }
            : { ...props, status: 'success' },
        ),
      error: (props) =>
        add(
          typeof props === 'string'
            ? { content: props, status: 'error' }
            : { ...props, status: 'error' },
        ),
      warning: (props) =>
        add(
          typeof props === 'string'
            ? { content: props, status: 'warning' }
            : { ...props, status: 'warning' },
        ),
      loading: (props) =>
        add(
          typeof props === 'string'
            ? { content: props, status: 'loading' }
            : { ...props, status: 'loading' },
        ),
      destroy: onDestroy,
      clear,
    }),
    [add, clear, onDestroy],
  );

  const messageHolder = portalContainer
    ? createPortal(
        <div className="yee-message-list">
          {messages.map((msg) => (
            <Message
              {...msg}
              onDestroy={onDestroy}
              id={msg.key}
              key={msg.key}
            />
          ))}
        </div>,
        portalContainer,
      )
    : null;

  return { messageApi, messageHolder };
};

export default useMessage;
