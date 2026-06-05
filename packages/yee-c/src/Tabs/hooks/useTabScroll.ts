import { useCallback, useEffect, useState } from 'react';
import useDebounceFunction from '../../hooks/useDebounceFunction';
import {
  getEleTranslate,
  getOffsetFromWheel,
  setEleTranslate,
} from '../utils/tab-utils';

interface UseTabScrollOptions {
  direction: 'horizontal' | 'vertical';
  navContainer: React.RefObject<HTMLDivElement | null>;
  navList: React.RefObject<HTMLDivElement | null>;
  enabled: boolean;
}

export function useTabScroll({
  direction,
  navContainer,
  navList,
  enabled,
}: UseTabScrollOptions) {
  const [refreshKey, setRefreshKey] = useState(0);

  const updateShadow = useCallback(() => {
    const container = navContainer.current;
    const list = navList.current;
    if (!container || !list) return;

    const isHorizontal = direction === 'horizontal';
    const realSize = isHorizontal ? list.scrollWidth : list.scrollHeight;
    const containerSize = isHorizontal
      ? container.clientWidth
      : container.clientHeight;
    const maxOffset = Math.round(realSize - containerSize);

    const [x, y] = getEleTranslate(list);
    const currentOffset = Math.abs(isHorizontal ? x : y);

    // Update shadow class names
    container.classList.toggle('with-prefix-shadow', currentOffset > 0);
    container.classList.toggle('with-suffix-shadow', currentOffset < maxOffset);
  }, [direction, navContainer, navList]);

  const debouncedUpdateShadow = useDebounceFunction(updateShadow, 200);

  useEffect(() => {
    const container = navContainer.current;
    const list = navList.current;

    if (!container || !list || !enabled || direction !== 'horizontal') {
      // Reset transform
      if (list && !enabled) {
        setEleTranslate(list, 0);
      }
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const containerWidth = container.clientWidth;
      const listWidth = list.scrollWidth;
      const maxOffset = listWidth - containerWidth;

      const [x] = getEleTranslate(list);
      const [wheelDirection, wheelDelta] = getOffsetFromWheel(e);

      // Boundary check
      if (
        (wheelDirection === 'up' && x >= 0) ||
        (wheelDirection === 'down' && Math.abs(x) >= maxOffset)
      ) {
        return;
      }

      // Calculate new offset
      let newOffset = x - wheelDelta;
      newOffset = Math.max(-maxOffset, Math.min(0, newOffset));

      setEleTranslate(list, newOffset);
      setRefreshKey((prev) => prev + 1);
      debouncedUpdateShadow();
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    // Initialize shadow
    updateShadow();

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [
    direction,
    enabled,
    navContainer,
    navList,
    debouncedUpdateShadow,
    updateShadow,
  ]);

  return { refreshKey, updateShadow: debouncedUpdateShadow };
}
