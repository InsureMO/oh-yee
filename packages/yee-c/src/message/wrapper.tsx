import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import {
  MessageConfig,
  MessageType,
  WrapperedMessageConfig,
} from './interface';
import MessageList from './message-list';
import useMessage from './use-message';

class MessageWrapper {
  root: Root | null;
  messages: MessageType[];
  container: HTMLElement | null;

  constructor() {
    this.root = null;
    this.messages = [];
    this.container = null;
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
  }

  render() {
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
      <MessageList items={this.messages} onDestroy={this.destroy.bind(this)} />,
    );
  }

  show(params: WrapperedMessageConfig) {
    if (!params.key) {
      params.key = this.uuid();
    }
    const isExit = this.messages.find((item) => item.key === params.key);
    if (isExit) {
      this.messages = this.messages.map((item) => {
        if (item.key === params.key) {
          return params as MessageType;
        }
        return item;
      });
    } else {
      this.messages.push(params as MessageType);
    }

    this.render();
  }

  destroy(key: string | number) {
    this.messages = this.messages.filter((item) => item.key !== key);
    this.render();
  }

  open(params: string | MessageConfig) {
    this.show(typeof params === 'string' ? { content: params } : params);
  }

  info(params: string | MessageConfig) {
    this.show(
      typeof params === 'string'
        ? { status: 'info', content: params }
        : { ...params, status: 'info' },
    );
  }

  success(params: string | MessageConfig) {
    this.show(
      typeof params === 'string'
        ? { status: 'success', content: params }
        : { ...params, status: 'success' },
    );
  }

  warning(params: string | MessageConfig) {
    this.show(
      typeof params === 'string'
        ? { status: 'warning', content: params }
        : { ...params, status: 'warning' },
    );
  }

  error(params: string | MessageConfig) {
    this.show(
      typeof params === 'string'
        ? { status: 'error', content: params }
        : { ...params, status: 'error' },
    );
  }

  loading(params: string | MessageConfig) {
    this.show(
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
