import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import {
  NoticeClose,
  NoticeConfig,
  NoticeType,
  PlacementType,
  WrapperedNoticeConfig,
} from './interface';
import NoticeList from './notice-list';

const noop: NoticeClose = () => {};

const invokeOnClose = (notices: NoticeType[]) => {
  const errors: unknown[] = [];

  notices.forEach((notice) => {
    try {
      notice.onClose?.();
    } catch (error) {
      errors.push(error);
    }
  });

  errors.forEach((error) => {
    const reportError = (
      globalThis as typeof globalThis & {
        reportError?: (reportedError: unknown) => void;
      }
    ).reportError;
    if (reportError) {
      reportError(error);
    } else {
      console.error(error);
    }
  });
};

class NoticeWrapper {
  roots: Map<PlacementType, Root>;
  containers: Map<PlacementType, HTMLElement>;
  notices: Map<PlacementType, NoticeType[]>;
  generationByKey: Map<string | number, number>;
  generation: number;
  timerGeneration: number;

  constructor() {
    this.roots = new Map();
    this.containers = new Map();
    this.notices = new Map();
    this.generationByKey = new Map();
    this.generation = 0;
    this.timerGeneration = 0;
    this.destroy = this.destroy.bind(this);
  }

  uuid(): string {
    const randomUUID = globalThis.crypto?.randomUUID?.();
    if (randomUUID) {
      return randomUUID;
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private createContainer(placement: PlacementType): HTMLElement {
    if (!this.containers.has(placement)) {
      const container = document.createElement('div');
      container.className = `yee-notices-${placement}`;
      document.body.appendChild(container);
      this.containers.set(placement, container);
    }
    return this.containers.get(placement)!;
  }

  private cleanupContainer(placement: PlacementType) {
    const container = this.containers.get(placement);
    if (container?.parentNode) {
      container.parentNode.removeChild(container);
    }
    this.containers.delete(placement);
  }

  unmount(placement?: PlacementType) {
    const placements = placement
      ? [placement]
      : Array.from(this.notices.keys());
    const removed = placements.flatMap((item) => this.notices.get(item) || []);

    placements.forEach((item) => {
      this.roots.get(item)?.unmount();
      this.roots.delete(item);
      this.cleanupContainer(item);
      this.notices.delete(item);
    });

    if (!placement) {
      this.roots.clear();
      this.containers.clear();
    }

    removed.forEach((item) => {
      this.generationByKey.delete(item.key);
    });
    invokeOnClose(removed);
  }

  render(placement: PlacementType) {
    if (typeof document === 'undefined') {
      return;
    }

    const notices = this.notices.get(placement) || [];
    if (notices.length === 0) {
      this.roots.get(placement)?.unmount();
      this.roots.delete(placement);
      this.cleanupContainer(placement);
      this.notices.delete(placement);
      return;
    }

    const container = this.createContainer(placement);
    let root = this.roots.get(placement);
    if (!root) {
      root = createRoot(container);
      this.roots.set(placement, root);
    }

    root.render(
      <NoticeList
        items={notices}
        placement={placement}
        onDestroy={this.destroy}
      />,
    );
  }

  show(params: WrapperedNoticeConfig): NoticeClose {
    if (typeof document === 'undefined') {
      return noop;
    }

    const placement = params.placement ?? 'topRight';
    const key = params.key ?? this.uuid();
    const keyGeneration = this.generationByKey.get(key) ?? this.generation++;
    this.generationByKey.set(key, keyGeneration);

    const affectedPlacements = new Set<PlacementType>([placement]);
    this.notices.forEach((items, currentPlacement) => {
      if (
        currentPlacement !== placement &&
        items.some((item) => item.key === key)
      ) {
        this.notices.set(
          currentPlacement,
          items.filter((item) => item.key !== key),
        );
        affectedPlacements.add(currentPlacement);
      }
    });

    const currentNotices = this.notices.get(placement) || [];
    const existingIndex = currentNotices.findIndex((item) => item.key === key);
    const nextNotice = {
      ...params,
      key,
      placement,
      timerGeneration: this.timerGeneration++,
    } as NoticeType;
    const nextNotices = currentNotices.filter((item) => item.key !== key);

    if (existingIndex >= 0) {
      nextNotices.splice(existingIndex, 0, nextNotice);
    } else {
      nextNotices.push(nextNotice);
    }

    this.notices.set(placement, nextNotices);
    affectedPlacements.forEach((item) => this.render(item));

    return () => {
      if (this.generationByKey.get(key) === keyGeneration) {
        this.destroy(key);
      }
    };
  }

  destroy(key: string | number, expectedTimerGeneration?: number) {
    let target: NoticeType | undefined;
    this.notices.forEach((items) => {
      target ??= items.find((item) => item.key === key);
    });

    if (
      !target ||
      (expectedTimerGeneration !== undefined &&
        target.timerGeneration !== expectedTimerGeneration)
    ) {
      return;
    }

    const affectedPlacements = new Set<PlacementType>();
    this.notices.forEach((items, placement) => {
      if (items.some((item) => item.key === key)) {
        this.notices.set(
          placement,
          items.filter((item) => item.key !== key),
        );
        affectedPlacements.add(placement);
      }
    });

    this.generationByKey.delete(key);
    affectedPlacements.forEach((item) => this.render(item));
    target.onClose?.();
  }

  clear(placement?: PlacementType) {
    this.unmount(placement);
  }

  open(params: string | NoticeConfig) {
    return this.show(typeof params === 'string' ? { content: params } : params);
  }

  info(params: string | NoticeConfig) {
    return this.show(
      typeof params === 'string'
        ? { status: 'info', content: params }
        : { ...params, status: 'info' },
    );
  }

  success(params: string | NoticeConfig) {
    return this.show(
      typeof params === 'string'
        ? { status: 'success', content: params }
        : { ...params, status: 'success' },
    );
  }

  warning(params: string | NoticeConfig) {
    return this.show(
      typeof params === 'string'
        ? { status: 'warning', content: params }
        : { ...params, status: 'warning' },
    );
  }

  error(params: string | NoticeConfig) {
    return this.show(
      typeof params === 'string'
        ? { status: 'error', content: params }
        : { ...params, status: 'error' },
    );
  }
}

const noticeWrapper = new NoticeWrapper();

// Export instance methods
export default noticeWrapper;

// Export function-style call methods
export const notice = {
  open: noticeWrapper.open.bind(noticeWrapper),
  info: noticeWrapper.info.bind(noticeWrapper),
  success: noticeWrapper.success.bind(noticeWrapper),
  warning: noticeWrapper.warning.bind(noticeWrapper),
  error: noticeWrapper.error.bind(noticeWrapper),
  destroy: noticeWrapper.destroy.bind(noticeWrapper),
  clear: noticeWrapper.clear.bind(noticeWrapper),
};
