import { useCallback, useRef, useState } from 'react';

interface UseMoveOptions {
  moveable: boolean;
}

interface UseMoveResult {
  onMove: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  reset: () => void;
  moveX: number;
  moveY: number;
}

export default function useMove(
  _img: React.RefObject<HTMLImageElement | null>,
  options: UseMoveOptions,
): UseMoveResult {
  const { moveable } = options;
  const totalX = useRef(0);
  const totalY = useRef(0);

  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!moveable) return;

      const startX = e.clientX;
      const startY = e.clientY;
      let currentX = totalX.current;
      let currentY = totalY.current;

      const handleMouseMove = (ev: MouseEvent) => {
        currentX = ev.clientX - startX + totalX.current;
        currentY = ev.clientY - startY + totalY.current;
        setMoveX(currentX);
        setMoveY(currentY);
      };

      const handleMouseUp = () => {
        totalX.current = currentX;
        totalY.current = currentY;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [moveable],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!moveable) return;

      const touch = e.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      let currentX = totalX.current;
      let currentY = totalY.current;

      const handleTouchMove = (ev: TouchEvent) => {
        ev.preventDefault();
        const t = ev.touches[0];
        currentX = t.clientX - startX + totalX.current;
        currentY = t.clientY - startY + totalY.current;
        setMoveX(currentX);
        setMoveY(currentY);
      };

      const handleTouchEnd = () => {
        totalX.current = currentX;
        totalY.current = currentY;
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    },
    [moveable],
  );

  const reset = useCallback(() => {
    setMoveX(0);
    setMoveY(0);
    totalX.current = 0;
    totalY.current = 0;
  }, []);

  return { onMove: handleMouseDown, onTouchStart: handleTouchStart, reset, moveX, moveY };
}
