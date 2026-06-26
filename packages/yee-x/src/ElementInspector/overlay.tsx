import clsx from 'clsx';
import React from 'react';
import { createPortal } from 'react-dom';
import { findTestidBoundary, harvest } from './fiber';
import type { ElementInfo } from './interface';

export interface PickerOverlayProps {
  active: boolean;
  prefixCls: string;
  theme: 'light' | 'dark';
  onPick: (info: ElementInfo) => void;
  contextMenu?: boolean;
  onContextMenu?: (
    info: ElementInfo,
    point: { x: number; y: number },
  ) => void;
  projectRoot?: string;
}

/**
 * The interactive picking layer. When `active`, it tracks the pointer over the
 * whole document, highlights the nearest `data-testid` boundary, and — on
 * click — harvests element info and forwards it via `onPick`. All listeners are
 * attached in the capture phase and the click is suppressed, so the underlying
 * application does not react while picking.
 *
 * Rendered only while active; mounted through a portal so it overlays the whole
 * document regardless of where the host component lives in the tree.
 */
const PickerOverlay: React.FC<PickerOverlayProps> = ({
  active,
  prefixCls,
  theme,
  onPick,
  contextMenu,
  onContextMenu,
  projectRoot,
}) => {
  const highlightRef = React.useRef<HTMLDivElement | null>(null);
  const boundaryRef = React.useRef<HTMLElement | null>(null);
  const rafRef = React.useRef<number | null>(null);

  // Keep the latest onPick without re-binding the document listeners.
  const onPickRef = React.useRef(onPick);
  onPickRef.current = onPick;

  // Keep the latest onContextMenu without re-binding the document listeners.
  const onContextMenuRef = React.useRef(onContextMenu);
  onContextMenuRef.current = onContextMenu;

  // Keep the latest projectRoot without re-binding the document listeners.
  const projectRootRef = React.useRef(projectRoot);
  projectRootRef.current = projectRoot;

  const paint = React.useCallback(() => {
    const box = highlightRef.current;
    const target = boundaryRef.current;
    if (!box) {
      return;
    }
    if (!target) {
      box.style.opacity = '0';
      return;
    }
    const rect = target.getBoundingClientRect();
    box.style.transform = `translate(${rect.left - 2}px, ${rect.top - 2}px)`;
    box.style.width = `${rect.width}px`;
    box.style.height = `${rect.height}px`;
    box.style.opacity = '1';
  }, []);

  const schedulePaint = React.useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(paint);
  }, [paint]);

  React.useEffect(() => {
    if (!active) {
      boundaryRef.current = null;
      if (highlightRef.current) {
        highlightRef.current.style.opacity = '0';
      }
      return;
    }

    const ownSelector = `.${prefixCls}-highlight, .${prefixCls}-toggle, .${prefixCls}-popover, .${prefixCls}-menu`;
    // `instanceof Element` (not HTMLElement): lucide icons render as <svg>
    // (SVGElement), which does not extend HTMLElement — a HTMLElement check would
    // let clicks on our own icons fall through and get swallowed by the
    // capture-phase pick handler.
    const isOwnElement = (target: EventTarget | null): boolean =>
      target instanceof Element && !!target.closest(ownSelector);

    const handlePointerMove = (event: PointerEvent) => {
      if (isOwnElement(event.target)) {
        return;
      }
      if (!(event.target instanceof HTMLElement)) {
        return;
      }
      boundaryRef.current = findTestidBoundary(event.target);
      schedulePaint();
    };

    const handleClick = (event: MouseEvent) => {
      if (isOwnElement(event.target)) {
        return; // let the toggle / popover handle their own clicks
      }
      event.preventDefault();
      event.stopPropagation();
      const boundary =
        boundaryRef.current ??
        (event.target instanceof HTMLElement
          ? findTestidBoundary(event.target)
          : null);
      if (!boundary) {
        return;
      }
      onPickRef.current(harvest(boundary, { projectRoot: projectRootRef.current }));
    };

    const handleContextMenu = (event: MouseEvent) => {
      if (!contextMenu) {
        return;
      }
      if (isOwnElement(event.target)) {
        return;
      }
      if (!(event.target instanceof HTMLElement)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const boundary = findTestidBoundary(event.target);
      onContextMenuRef.current?.(
        harvest(boundary, { projectRoot: projectRootRef.current }),
        {
          x: event.clientX,
          y: event.clientY,
        },
      );
    };

    const handleReposition = () => schedulePaint();

    document.addEventListener('pointermove', handlePointerMove, true);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);
    document.body.classList.add(`${prefixCls}-picking`);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove, true);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
      document.body.classList.remove(`${prefixCls}-picking`);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      boundaryRef.current = null;
    };
  }, [active, prefixCls, contextMenu, schedulePaint]);

  if (!active || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      ref={highlightRef}
      className={clsx(
        `${prefixCls}-highlight`,
        theme === 'dark' && `${prefixCls}-theme-dark`,
      )}
      aria-hidden="true"
    />,
    document.body,
  );
};

export default PickerOverlay;
