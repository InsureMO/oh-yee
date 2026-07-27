import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import {
  MessageClose,
  MessageConfig,
  MessageType,
  WrapperedMessageConfig,
} from './interface';
import MessageList from './message-list';
import useMessage from './use-message';

const noop: MessageClose = () => {};

class MessageWrapper {
  root: Root | null;
  messages: MessageType[];
  container: HTMLElement | null;
  generationByKey: Map<string | number, number>;
  generation: number;
  timerGeneration: number;

  constructor() {
    this.root = null;
    this.messages = [];
    this.container = null;
    this.generationByKey = new Map();
    this.generation = 0;
    this.timerGeneration = 0;
    this.destroy = this.destroy.bind(this);
  }

  private createContainer() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'yee-messages';
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  private cleanupContainer() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  }

  uuid(): string {
    return crypto.randomUUID
      ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
  }

  unmount() {
    this.root?.unmount();
    this.root = null;
    this.cleanupContainer();
    this.messages = [];
    this.generationByKey.clear();
  }

  render() {
    if (typeof document === 'undefined') {
      return;
    }

    if (this.messages.length === 0) {
      if (this.root) {
        this.root.unmount();
        this.root = null;
        this.cleanupContainer();
      }
      return;
    }

    const container = this.createContainer();
    if (!this.root) {
      this.root = createRoot(container);
    }

    this.root.render(
      <MessageList items={this.messages} onDestroy={this.destroy} />,
    );
  }

  show(params: WrapperedMessageConfig): MessageClose {
    if (typeof document === 'undefined') {
      return noop;
    }

    const key = params.key ?? this.uuid();
    const keyGeneration =
      this.generationByKey.get(key) ?? this.generation++;
    this.generationByKey.set(key, keyGeneration);
    const nextMessage = {
      ...params,
      key,
      timerGeneration: this.timerGeneration++,
    } as MessageType;
    const exists = this.messages.some((item) => item.key === key);

    if (exists) {
      this.messages = this.messages.map((item) =>
        item.key === key ? nextMessage : item,
      );
    } else {
      this.messages = [...this.messages, nextMessage];
    }

    this.render();
    return () => {
      if (this.generationByKey.get(key) === keyGeneration) {
        this.destroy(key);
      }
    };
  }

  destroy(key: string | number, expectedTimerGeneration?: number) {
    const target = this.messages.find((item) => item.key === key);
    if (
      expectedTimerGeneration !== undefined &&
      target?.timerGeneration !== expectedTimerGeneration
    ) {
      return;
    }

    if (!target) {
      return;
    }

    this.generationByKey.delete(key);
    this.messages = this.messages.filter((item) => item.key !== key);
    this.render();
    target.onClose?.();
  }

  open(params: string | MessageConfig) {
    return this.show(typeof params === 'string' ? { content: params } : params);
  }

  info(params: string | MessageConfig) {
    return this.show(
      typeof params === 'string'
        ? { status: 'info', content: params }
        : { ...params, status: 'info' },
    );
  }

  success(params: string | MessageConfig) {
    return this.show(
      typeof params === 'string'
        ? { status: 'success', content: params }
        : { ...params, status: 'success' },
    );
  }

  warning(params: string | MessageConfig) {
    return this.show(
      typeof params === 'string'
        ? { status: 'warning', content: params }
        : { ...params, status: 'warning' },
    );
  }

  error(params: string | MessageConfig) {
    return this.show(
      typeof params === 'string'
        ? { status: 'error', content: params }
        : { ...params, status: 'error' },
    );
  }

  loading(params: string | MessageConfig) {
    return this.show(
      typeof params === 'string'
        ? { status: 'loading', content: params }
        : { ...params, status: 'loading' },
    );
  }
}

const messageWrapper = new MessageWrapper();

// Export instance methods
export default messageWrapper;

// Export function-style call methods
export const message = {
  open: messageWrapper.open.bind(messageWrapper),
  info: messageWrapper.info.bind(messageWrapper),
  success: messageWrapper.success.bind(messageWrapper),
  warning: messageWrapper.warning.bind(messageWrapper),
  error: messageWrapper.error.bind(messageWrapper),
  loading: messageWrapper.loading.bind(messageWrapper),
  destroy: messageWrapper.destroy.bind(messageWrapper),
  useMessage,
};
