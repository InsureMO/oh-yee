import { useRef, useEffect, useCallback, useState } from 'react';

type UseDragReturn = [
  React.RefObject<HTMLElement | null>,
  React.RefObject<HTMLElement | null>,
  boolean, // pressing
  boolean, // dragging
];

export default function useDrag(
  draggable = true, // Whether to enable dragging
  contain = false, // Whether to only trigger within the dragger
  dragLimitInWindow = true, // Whether to limit within the viewport
): UseDragReturn {
  const ref = useRef<HTMLElement>(null); // Element to be moved
  const dragger = useRef<HTMLElement>(null); // Drag handle
  const cachePos = useRef({ x: 0, y: 0 }); // Record the cumulative translate value

  const [pressing, setPressing] = useState(false);
  const [dragging, setDragging] = useState(false);

  /* ----------------- Utility functions ----------------- */
  const clamp = (min: number, max: number, v: number) =>
    Math.min(Math.max(v, min), max);

  const getValidTarget = () => ref.current as HTMLElement;

  /* ----------------- Event handling ----------------- */
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const target = getValidTarget();
      if (!target) return;

      let nextX =
        cachePos.current.x + e.clientX - (onMouseMove as any).__startX;
      let nextY =
        cachePos.current.y + e.clientY - (onMouseMove as any).__startY;

      if (dragLimitInWindow) {
        const { offsetWidth: w, offsetHeight: h } = target;
        nextX = clamp(
          -target.offsetLeft,
          window.innerWidth - target.offsetLeft - w,
          nextX,
        );
        nextY = clamp(
          -target.offsetTop,
          window.innerHeight - target.offsetTop - h,
          nextY,
        );
      }

      target.style.transform = `translate(${nextX}px, ${nextY}px)`;
      (onMouseMove as any).__nextX = nextX;
      (onMouseMove as any).__nextY = nextY;

      setDragging(true);
    },
    [dragLimitInWindow],
  );

  const onMouseUp = useCallback(() => {
    const target = getValidTarget();
    if (!target) return;

    const delta = Date.now() - (onMouseUp as any).__startTime;
    if (delta > 300) {
      cachePos.current = {
        x: (onMouseMove as any).__nextX,
        y: (onMouseMove as any).__nextY,
      };
      setPressing(true);
    } else {
      setPressing(false);
    }

    setDragging(false);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!draggable) return;

      const handle = dragger.current ?? ref.current;
      if (!handle) return;

      if (contain && !handle.contains(e.target as Node)) return;

      (onMouseMove as any).__startX = e.clientX;
      (onMouseMove as any).__startY = e.clientY;
      (onMouseUp as any).__startTime = Date.now();

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [draggable, contain, onMouseMove, onMouseUp],
  );

  /* ----------------- Bind / Unbind ----------------- */
  useEffect(() => {
    const node = ref.current;
    if (!draggable || !node) return;

    node.addEventListener('mousedown', onMouseDown);
    return () => node.removeEventListener('mousedown', onMouseDown);
  }, [draggable, onMouseDown]);

  return [ref, dragger, pressing, dragging];
}
