import { useCallback, useEffect, useState } from 'react';

interface UseDropdownVisibilityOptions {
  direction: 'horizontal' | 'vertical';
  navContainer: React.RefObject<HTMLDivElement | null>;
  navList: React.RefObject<HTMLDivElement | null>;
  itemsLength: number;
}

export function useDropdownVisibility({
  direction,
  navContainer,
  navList,
  itemsLength,
}: UseDropdownVisibilityOptions) {
  const [isVisible, setIsVisible] = useState(false);

  const checkVisibility = useCallback(() => {
    const container = navContainer.current;
    const list = navList.current;

    if (!container || !list) {
      setIsVisible(false);
      return;
    }

    const isHorizontal = direction === 'horizontal';
    const containerSize = isHorizontal
      ? container.clientWidth
      : container.clientHeight;
    const listSize = isHorizontal ? list.scrollWidth : list.scrollHeight;

    setIsVisible(listSize > containerSize);
  }, [direction, navContainer, navList]);

  useEffect(() => {
    // Delay check to ensure DOM rendering is complete
    const timeoutId = setTimeout(checkVisibility, 0);
    return () => clearTimeout(timeoutId);
  }, [checkVisibility, itemsLength]);

  return { isVisible, checkVisibility };
}
