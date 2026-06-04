import { useCallback, useEffect, type RefObject, useRef, useState } from 'react';
import useEvent from './useEvent';

type ElementInput = HTMLElement | RefObject<HTMLElement | null>;

export interface UseDragOptions {
  element: ElementInput;
  draggable?: boolean;
  direction?: 'x' | 'y' | 'both';
  bounds?: 'parent' | HTMLElement | (() => HTMLElement);
  initial?: { x?: number; y?: number };
  onStart?: (pos: { x: number; y: number }) => void | false;
  onMove?: (pos: { x: number; y: number }) => void;
  onEnd?: (pos: { x: number; y: number }) => void;
}

export interface DragState {
  x: number;
  y: number;
  isDragging: boolean;
}

export const usePressDrag = (
  options: UseDragOptions,
): [
  DragState,
] => {
  const {
    element,
    draggable,
    direction = 'both',
    bounds,
    initial = { x: 0, y: 0 },
    onStart,
    onMove,
    onEnd,
  } = options || {};

  const getElement = useCallback((): HTMLElement | null => {
    if (!element) return null;
    if ('current' in element) return element.current;
    return element;
  }, [element]);

  const state = useRef<DragState>({
    x: initial.x || 0,
    y: initial.y || 0,
    isDragging: false,
  });

  const onStartMemo = useEvent(onStart);
  const onMoveMemo = useEvent(onMove);
  const onEndMemo = useEvent(onEnd);

  const startMousePos = useRef({ x: 0, y: 0 });
  const startTransform = useRef({ x: 0, y: 0 });

  const [dragState, setDragState] = useState<DragState>(state.current);

  const getBounds = useCallback((): DOMRect | undefined => {
    if (!bounds) return undefined;
    const el = getElement();
    if (bounds === 'parent')
      return el?.parentElement?.getBoundingClientRect();
    if (typeof bounds === 'function') return bounds().getBoundingClientRect();
    return bounds.getBoundingClientRect();
  }, [bounds, getElement]);

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!state.current.isDragging) return;
      e.preventDefault();

      const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;

      const deltaX = clientX - startMousePos.current.x;
      const deltaY = clientY - startMousePos.current.y;

      let newX = startTransform.current.x + deltaX;
      let newY = startTransform.current.y + deltaY;

      const boundRect = getBounds();

      if (boundRect) {
        const el = getElement();
        if (el) {
          const elementRect = el.getBoundingClientRect();

          if (direction !== 'y') {
            const minAllowedX = boundRect.left - elementRect.left + startTransform.current.x;
            const maxAllowedX = boundRect.right - elementRect.right + startTransform.current.x;
            newX = Math.max(minAllowedX, Math.min(newX, maxAllowedX));
          }

          if (direction !== 'x') {
            const minAllowedY = boundRect.top - elementRect.top + startTransform.current.y;
            const maxAllowedY = boundRect.bottom - elementRect.bottom + startTransform.current.y;
            newY = Math.max(minAllowedY, Math.min(newY, maxAllowedY));
          }
        }
      }

      state.current.x = direction !== 'y' ? newX : state.current.x;
      state.current.y = direction !== 'x' ? newY : state.current.y;

      const el = getElement();
      if (el) {
        el.style.transform = `translate(${state.current.x}px, ${state.current.y}px)`;
      }

      setDragState({ ...state.current });
      onMoveMemo?.({ x: state.current.x, y: state.current.y });
    },
    [direction, getBounds, getElement],
  );

  const handleEnd = useCallback(() => {
    state.current.isDragging = false;
    setDragState({ ...state.current });
    onEndMemo?.({ x: state.current.x, y: state.current.y });

    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleEnd);
  }, [handleMove]);

  const handleStart = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const el = getElement();
      if (!el) return;

      if (onStartMemo?.(state.current) === false) return;

      const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;

      startMousePos.current = { x: clientX, y: clientY };

      startTransform.current = {
        x: state.current.x,
        y: state.current.y,
      };

      state.current.isDragging = true;
      setDragState({ ...state.current });

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    },
    [handleMove, handleEnd, getElement],
  );

  useEffect(() => {
    const el = getElement();
    if (!el || !draggable) return;

    el.addEventListener('mousedown', handleStart);
    el.addEventListener('touchstart', handleStart, { passive: false });
    return () => {
      el.removeEventListener('mousedown', handleStart);
      el.removeEventListener('touchstart', handleStart);
    };
  }, [handleStart, draggable, getElement]);

  return [dragState];
};
export default usePressDrag;
