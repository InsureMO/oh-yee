// @vitest-environment jsdom

import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { NoticeApi, NoticeClose } from './interface';
import { useGlobalNotice } from './notice-provider';
import useNotice from './use-notice';
import noticeWrapper, { notice } from './wrapper';

let currentApi: NoticeApi;

function NoticeHarness() {
  const { noticeApi, noticeHolders } = useNotice();
  currentApi = noticeApi;
  return <>{noticeHolders}</>;
}

afterEach(() => {
  vi.unstubAllGlobals();
  cleanup();
  noticeWrapper.unmount();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('notice', () => {
  it('renders safely without a document during SSR', () => {
    vi.stubGlobal('document', undefined);

    expect(() => renderToString(<NoticeHarness />)).not.toThrow();
    expect(() => notice.info('server notice')).not.toThrow();
  });

  it('keeps duration zero notices open', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<NoticeHarness />);

    act(() => {
      currentApi.info({ content: 'persistent', duration: 0, onClose });
      vi.advanceTimersByTime(10000);
    });

    expect(screen.queryByText('persistent')).not.toBeNull();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('keeps the hook API reference stable across updates', () => {
    render(<NoticeHarness />);
    const initialApi = currentApi;

    act(() => {
      currentApi.info({ content: 'stable', duration: 0 });
    });

    expect(currentApi).toBe(initialApi);
  });

  it('keeps automatic keys independent from explicit numeric keys', () => {
    render(<NoticeHarness />);

    act(() => {
      currentApi.info({
        key: Number.POSITIVE_INFINITY,
        content: 'explicit infinity',
        duration: 0,
      });
      currentApi.info({ content: 'automatic one', duration: 0 });
      currentApi.info({ content: 'automatic two', duration: 0 });
    });

    expect(screen.queryByText('explicit infinity')).not.toBeNull();
    expect(screen.queryByText('automatic one')).not.toBeNull();
    expect(screen.queryByText('automatic two')).not.toBeNull();
    expect(document.querySelectorAll('.yee-notice')).toHaveLength(3);
  });

  it('does not restart existing timers when another notice is added', () => {
    vi.useFakeTimers();
    const firstOnClose = vi.fn();
    render(<NoticeHarness />);

    act(() => {
      currentApi.info({
        content: 'first',
        duration: 300,
        onClose: firstOnClose,
      });
    });
    act(() => vi.advanceTimersByTime(200));
    act(() => {
      currentApi.info({ content: 'second', duration: 300 });
    });
    act(() => vi.advanceTimersByTime(100));

    expect(firstOnClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('first')).toBeNull();
    expect(screen.queryByText('second')).not.toBeNull();
  });

  it('restarts the timer when an existing key is updated', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<NoticeHarness />);

    act(() => {
      currentApi.info({
        key: 'timer-update',
        content: 'working',
        duration: 300,
        onClose,
      });
    });
    act(() => vi.advanceTimersByTime(200));
    act(() => {
      currentApi.success({
        key: 'timer-update',
        content: 'finished',
        duration: 300,
        onClose,
      });
    });
    act(() => vi.advanceTimersByTime(100));

    expect(screen.queryByText('finished')).not.toBeNull();
    expect(onClose).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByText('finished')).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('moves an existing key to its new placement', () => {
    render(<NoticeHarness />);

    act(() => {
      currentApi.info({
        key: 'moving',
        content: 'before move',
        placement: 'topLeft',
        duration: 0,
      });
      currentApi.success({
        key: 'moving',
        content: 'after move',
        placement: 'bottomRight',
        duration: 0,
      });
    });

    expect(screen.queryByText('before move')).toBeNull();
    const moved = screen.getByText('after move').closest('.yee-notice');
    expect(document.querySelectorAll('.yee-notice')).toHaveLength(1);
    expect(moved?.getAttribute('data-placement')).toBe('bottomRight');
  });

  it('keeps update close handles valid but invalidates them after key reuse', () => {
    let staleClose!: NoticeClose;
    render(<NoticeHarness />);

    act(() => {
      staleClose = currentApi.info({
        key: 'reused',
        content: 'first',
        duration: 0,
      });
      currentApi.success({
        key: 'reused',
        content: 'updated',
        duration: 0,
      });
      staleClose();
      currentApi.info({
        key: 'reused',
        content: 'new generation',
        duration: 0,
      });
      staleClose();
    });

    expect(screen.queryByText('updated')).toBeNull();
    expect(screen.queryByText('new generation')).not.toBeNull();
  });

  it('calls onClose exactly once for clear and destroy', () => {
    const firstOnClose = vi.fn();
    const secondOnClose = vi.fn();
    render(<NoticeHarness />);

    act(() => {
      currentApi.info({
        key: 'first-close',
        content: 'first',
        duration: 0,
        onClose: firstOnClose,
      });
      currentApi.info({
        key: 'second-close',
        content: 'second',
        duration: 0,
        onClose: secondOnClose,
      });
      currentApi.destroy('first-close');
      currentApi.clear();
    });

    expect(firstOnClose).toHaveBeenCalledTimes(1);
    expect(secondOnClose).toHaveBeenCalledTimes(1);
  });

  it('runs every hook clear callback even when one throws', () => {
    const secondOnClose = vi.fn();
    const reportError = vi.fn();
    vi.stubGlobal('reportError', reportError);
    render(<NoticeHarness />);

    act(() => {
      currentApi.info({
        content: 'throwing hook callback',
        duration: 0,
        onClose: () => {
          throw new Error('hook close failed');
        },
      });
      currentApi.info({
        content: 'later hook callback',
        duration: 0,
        onClose: secondOnClose,
      });
    });

    act(() => currentApi.clear());
    expect(secondOnClose).toHaveBeenCalledTimes(1);
    expect(reportError).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('later hook callback')).toBeNull();
  });

  it('runs every global clear callback even when one throws', () => {
    const secondOnClose = vi.fn();
    const reportError = vi.fn();
    vi.stubGlobal('reportError', reportError);

    act(() => {
      notice.info({
        content: 'throwing global callback',
        duration: 0,
        onClose: () => {
          throw new Error('global close failed');
        },
      });
      notice.info({
        content: 'later global callback',
        duration: 0,
        onClose: secondOnClose,
      });
    });

    act(() => notice.clear());
    expect(secondOnClose).toHaveBeenCalledTimes(1);
    expect(reportError).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('later global callback')).toBeNull();
  });

  it('preserves hover pause while the notice is updated', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<NoticeHarness />);

    act(() => {
      currentApi.info({
        key: 'paused',
        content: 'hover me',
        duration: 300,
        onClose,
      });
    });
    act(() => vi.advanceTimersByTime(100));
    fireEvent.mouseEnter(screen.getByText('hover me').closest('.yee-notice')!);

    act(() => {
      currentApi.info({
        key: 'paused',
        content: 'still paused',
        duration: 300,
        onClose,
      });
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('still paused')).not.toBeNull();
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.mouseLeave(
      screen.getByText('still paused').closest('.yee-notice')!,
    );
    act(() => vi.advanceTimersByTime(300));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('resumes a paused countdown when pauseOnHover is disabled', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<NoticeHarness />);

    act(() => {
      currentApi.info({
        key: 'disable-pause',
        content: 'pause enabled',
        duration: 300,
        pauseOnHover: true,
        onClose,
      });
    });
    fireEvent.mouseEnter(
      screen.getByText('pause enabled').closest('.yee-notice')!,
    );

    act(() => {
      currentApi.info({
        key: 'disable-pause',
        content: 'pause disabled',
        duration: 300,
        pauseOnHover: false,
        onClose,
      });
    });
    act(() => vi.advanceTimersByTime(300));

    expect(screen.queryByText('pause disabled')).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('pauses when pauseOnHover is enabled while already hovered', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<NoticeHarness />);

    act(() => {
      currentApi.info({
        key: 'enable-pause',
        content: 'pause disabled',
        duration: 300,
        pauseOnHover: false,
        onClose,
      });
    });
    fireEvent.mouseEnter(
      screen.getByText('pause disabled').closest('.yee-notice')!,
    );

    act(() => {
      currentApi.info({
        key: 'enable-pause',
        content: 'pause enabled',
        duration: 300,
        pauseOnHover: true,
        onClose,
      });
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('pause enabled')).not.toBeNull();
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.mouseLeave(
      screen.getByText('pause enabled').closest('.yee-notice')!,
    );
    act(() => vi.advanceTimersByTime(300));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('preserves falsy global keys and dispatches onClose on destroy', () => {
    const onClose = vi.fn();
    const config = { key: 0, content: 'zero', duration: 0, onClose };

    act(() => {
      notice.open(config);
    });

    expect(config.key).toBe(0);
    expect(screen.queryByText('zero')).not.toBeNull();

    act(() => notice.destroy(0));
    expect(screen.queryByText('zero')).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('preserves generations when global clear callbacks reopen a key', () => {
    let reopenedClose!: NoticeClose;

    act(() => {
      notice.info({
        key: 'reopener',
        content: 'reopener',
        duration: 0,
        onClose: () => {
          reopenedClose = notice.info({
            key: 'reopened-key',
            content: 'reopened',
            duration: 0,
          });
        },
      });
      notice.info({
        key: 'reopened-key',
        content: 'old generation',
        duration: 0,
      });
      notice.clear();
    });

    expect(screen.queryByText('reopened')).not.toBeNull();
    act(() => reopenedClose());
    expect(screen.queryByText('reopened')).toBeNull();
  });

  it('throws a clear error outside NoticeProvider', () => {
    expect(() => renderHook(() => useGlobalNotice())).toThrow(
      'useGlobalNotice must be used within NoticeProvider',
    );
  });

  it('forwards data attributes and supports keyboard activation', () => {
    const onClick = vi.fn();
    render(<NoticeHarness />);

    act(() => {
      currentApi.error({
        content: 'interactive',
        duration: 0,
        onClick,
        'data-track-id': 'interactive-notice',
      });
    });

    const element = screen.getByText('interactive').closest('.yee-notice')!;
    expect(element.getAttribute('data-track-id')).toBe('interactive-notice');
    expect(element.getAttribute('role')).toBe('button');
    expect(element.getAttribute('aria-live')).toBe('assertive');
    expect(element.getAttribute('tabindex')).toBe('0');
    expect(
      element.querySelector('.yee-notice-icon')?.getAttribute('aria-hidden'),
    ).toBe('true');

    fireEvent.keyDown(element, { key: 'Enter' });
    fireEvent.keyDown(element, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
