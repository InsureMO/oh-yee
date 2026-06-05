import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { NoticeConfig, NoticeType, WrapperedNoticeConfig } from './interface';
import NoticeList from './notice-list';

type PlacementType =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'top'
  | 'bottom';

class NoticeWrapper {
  roots: Map<PlacementType, Root>;
  containers: Map<PlacementType, HTMLElement>;
  notices: Map<PlacementType, NoticeType[]>;

  constructor() {
    this.roots = new Map();
    this.containers = new Map();
    this.notices = new Map();
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
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
      this.containers.delete(placement);
    }
  }

  unmount(placement?: PlacementType) {
    if (placement) {
      const root = this.roots.get(placement);
      if (root) {
        root.unmount();
        this.roots.delete(placement);
        this.cleanupContainer(placement);
        this.notices.delete(placement);
      }
    } else {
      // Clean up all
      this.roots.forEach((root, placement) => {
        root.unmount();
        this.cleanupContainer(placement);
      });
      this.roots.clear();
      this.containers.clear();
      this.notices.clear();
    }
  }

  render(placement: PlacementType) {
    const notices = this.notices.get(placement) || [];

    if (notices.length === 0) {
      const root = this.roots.get(placement);
      if (root) {
        root.unmount();
        this.roots.delete(placement);
        this.cleanupContainer(placement);
      }
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
        onDestroy={(key) => this.destroy(key, placement)}
      />,
    );
  }

  show(params: WrapperedNoticeConfig) {
    const placement = params.placement || 'topRight';

    if (!params.key) {
      params.key = this.uuid();
    }

    const notices = this.notices.get(placement) || [];
    const existIndex = notices.findIndex((item) => item.key === params.key);

    if (existIndex >= 0) {
      notices[existIndex] = params as NoticeType;
    } else {
      notices.push(params as NoticeType);
    }

    this.notices.set(placement, notices);
    this.render(placement);
  }

  destroy(key: string | number, placement?: PlacementType) {
    if (placement) {
      const notices = this.notices.get(placement) || [];
      const filtered = notices.filter((item) => item.key !== key);
      this.notices.set(placement, filtered);
      this.render(placement);
    } else {
      // Find and remove in all placements
      this.notices.forEach((notices, p) => {
        const filtered = notices.filter((item) => item.key !== key);
        this.notices.set(p, filtered);
        this.render(p);
      });
    }
  }

  open(params: string | NoticeConfig) {
    this.show(typeof params === 'string' ? { content: params } : params);
  }

  info(params: string | NoticeConfig) {
    this.show(
      typeof params === 'string'
        ? { status: 'info', content: params }
        : { ...params, status: 'info' },
    );
  }

  success(params: string | NoticeConfig) {
    this.show(
      typeof params === 'string'
        ? { status: 'success', content: params }
        : { ...params, status: 'success' },
    );
  }

  warning(params: string | NoticeConfig) {
    this.show(
      typeof params === 'string'
        ? { status: 'warning', content: params }
        : { ...params, status: 'warning' },
    );
  }

  error(params: string | NoticeConfig) {
    this.show(
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
};
