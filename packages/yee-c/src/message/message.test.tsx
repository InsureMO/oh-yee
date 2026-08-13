// @vitest-environment jsdom

import {
  act,
  cleanup,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { MessageApi, MessageClose } from './interface';
import { useGlobalMessage } from './message-provider';
import useMessage from './use-message';
import messageWrapper, { message } from './wrapper';

let currentApi: MessageApi;

function MessageHarness() {
  const { messageApi, messageHolder } = useMessage();
  currentApi = messageApi;
  return <>{messageHolder}</>;
}

afterEach(() => {
  cleanup();
  messageWrapper.unmount();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('message', () => {
  it('renders safely without a document during SSR', () => {
    vi.stubGlobal('document', undefined);

    expect(() => renderToString(<MessageHarness />)).not.toThrow();
    expect(() => message.info('server message')).not.toThrow();
  });

  it('keeps the hook API reference stable across message updates', () => {
    render(<MessageHarness />);
    const initialApi = currentApi;

    act(() => {
      currentApi.info({ content: 'saved', duration: 0 });
    });

    expect(currentApi).toBe(initialApi);
  });

  it('does not restart existing timers when another message is added', () => {
    vi.useFakeTimers();
    const firstOnClose = vi.fn();
    render(<MessageHarness />);

    act(() => {
      currentApi.info({
        content: 'first',
        duration: 3,
        onClose: firstOnClose,
      });
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    act(() => {
      currentApi.info({ content: 'second', duration: 3 });
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(firstOnClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('first')).toBeNull();
    expect(screen.queryByText('second')).not.toBeNull();
  });

  it('does not let an old timer close a reused key in the same batch', () => {
    vi.useFakeTimers();
    const secondOnClose = vi.fn();
    render(<MessageHarness />);

    act(() => {
      currentApi.info({ key: 'timer', content: 'first', duration: 3 });
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    act(() => {
      currentApi.destroy('timer');
      currentApi.info({
        key: 'timer',
        content: 'second',
        duration: 3,
        onClose: secondOnClose,
      });
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('second')).not.toBeNull();
    expect(secondOnClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.queryByText('second')).toBeNull();
    expect(secondOnClose).toHaveBeenCalledTimes(1);
  });

  it('restarts the timer when an existing key is updated', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<MessageHarness />);

    act(() => {
      currentApi.info({
        key: 'updating-timer',
        content: 'working',
        duration: 3,
        onClose,
      });
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    act(() => {
      currentApi.info({
        key: 'updating-timer',
        content: 'finished',
        duration: 3,
        onClose,
      });
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('finished')).not.toBeNull();
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.queryByText('finished')).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('updates duplicate keys and closes the current message with its handle', () => {
    const firstOnClose = vi.fn();
    const updatedOnClose = vi.fn();
    let close!: MessageClose;
    render(<MessageHarness />);

    act(() => {
      close = currentApi.info({
        key: 'job',
        content: 'working',
        duration: 0,
        onClose: firstOnClose,
      });
      currentApi.success({
        key: 'job',
        content: 'finished',
        duration: 0,
        onClose: updatedOnClose,
      });
    });

    expect(screen.queryByText('working')).toBeNull();
    expect(screen.queryByText('finished')).not.toBeNull();
    expect(document.querySelectorAll('.yee-message')).toHaveLength(1);

    act(() => close());

    expect(screen.queryByText('finished')).toBeNull();
    expect(firstOnClose).not.toHaveBeenCalled();
    expect(updatedOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not let stale hook close handles close a reused key', () => {
    let staleClose!: MessageClose;
    render(<MessageHarness />);

    act(() => {
      staleClose = currentApi.info({
        key: 'reused',
        content: 'first generation',
        duration: 0,
      });
      staleClose();
      currentApi.info({
        key: 'reused',
        content: 'second generation',
        duration: 0,
      });
      staleClose();
    });

    expect(screen.queryByText('second generation')).not.toBeNull();
  });

  it('does not let stale global close handles close a reused key', () => {
    let staleClose!: MessageClose;

    act(() => {
      staleClose = message.info({
        key: 'global-reused',
        content: 'first generation',
        duration: 0,
      });
      staleClose();
      message.info({
        key: 'global-reused',
        content: 'second generation',
        duration: 0,
      });
      staleClose();
    });

    expect(screen.queryByText('second generation')).not.toBeNull();
    act(() => message.destroy('global-reused'));
  });

  it('calls onClose when clearing hook messages', () => {
    const firstOnClose = vi.fn();
    const secondOnClose = vi.fn();
    render(<MessageHarness />);

    act(() => {
      currentApi.info({ content: 'first', duration: 0, onClose: firstOnClose });
      currentApi.info({
        content: 'second',
        duration: 0,
        onClose: secondOnClose,
      });
      currentApi.clear();
    });

    expect(firstOnClose).toHaveBeenCalledTimes(1);
    expect(secondOnClose).toHaveBeenCalledTimes(1);
  });

  it('preserves a falsy global key without mutating the config', () => {
    const onClose = vi.fn();
    const config = { key: 0, content: 'zero', duration: 0, onClose };

    act(() => {
      message.open(config);
    });

    expect(config.key).toBe(0);
    expect(screen.queryByText('zero')).not.toBeNull();

    act(() => {
      message.destroy(0);
    });

    expect(screen.queryByText('zero')).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('throws a clear error outside MessageProvider', () => {
    expect(() => renderHook(() => useGlobalMessage())).toThrow(
      'useGlobalMessage must be used within MessageProvider',
    );
  });

  it('forwards data attributes and exposes live-region semantics', () => {
    render(<MessageHarness />);

    act(() => {
      currentApi.error({
        content: <div>failed</div>,
        duration: 0,
        'data-track-id': 'failure-message',
      });
    });

    const element = screen.getByText('failed').closest('.yee-message');
    expect(element?.getAttribute('data-track-id')).toBe('failure-message');
    expect(element?.getAttribute('role')).toBe('alert');
    expect(element?.getAttribute('aria-live')).toBe('assertive');
    expect(element?.querySelector('.yee-message-content')?.tagName).toBe('DIV');
    expect(
      element?.querySelector('.yee-message-icon')?.getAttribute('aria-hidden'),
    ).toBe('true');
  });
});
