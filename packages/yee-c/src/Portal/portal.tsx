import { memo, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { PortalProps } from './interface';

const canUseDom = () => {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
};

const getMountedNode = (
  el: string | HTMLElement | (() => HTMLElement) | undefined,
  triggerNode?: HTMLElement, // eslint-disable-line @typescript-eslint/no-unused-vars
): HTMLElement | null => {
  if (!canUseDom()) return null;
  if (typeof el === 'string') {
    return document.querySelector(el);
  }

  if (typeof el === 'function') {
    return el();
  }

  if (typeof el === 'object' && el instanceof window.HTMLElement) {
    return el;
  }

  return document.body;
};

export function Portal(props: PortalProps) {
  const {
    prefixCls = 'yee-portal',
    children,
    open,
    destroyOnClose,
    triggerNode,
    getContainer,
  } = props;

  const [mounted, setMounted] = useState(false);

  const container = useMemo((): HTMLDivElement | null => {
    if (!canUseDom()) return null;
    const div = document.createElement('div');
    div.setAttribute('class', `${prefixCls}-wrapper`);
    return div;
  }, [prefixCls]);

  useEffect(() => {
    if (!mounted || !container) return;
    const mountedNode = getMountedNode(getContainer, triggerNode);
    mountedNode?.appendChild?.(container);
    return () => {
      mountedNode?.removeChild?.(container);
    };
  }, [container, getContainer, triggerNode, mounted]);

  useEffect(() => {
    if (open === true) {
      // Prevent layout shift
      const bar = window.innerWidth - document.documentElement.offsetWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = bar + 'px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  useEffect(() => {
    if (!mounted && open) {
      setMounted(true);
    }
  }, [open]);

  useEffect(() => {
    if (destroyOnClose && !open && mounted) {
      setMounted(false);
    }
  }, [destroyOnClose, open, mounted]);

  return canUseDom() && mounted && container
    ? createPortal(children, container)
    : null;
}

Portal.displayName = 'Portal';

export default memo(Portal);
