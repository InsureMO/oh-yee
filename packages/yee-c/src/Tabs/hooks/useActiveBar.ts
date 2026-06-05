import { useCallback, useEffect, useRef } from 'react';

interface UseActiveBarOptions {
  direction: 'horizontal' | 'vertical';
  activeKey: string | number;
  activetab: React.RefObject<HTMLElement | null>;
  activebar: React.RefObject<HTMLDivElement | null>;
  enabled: boolean;
}

export function useActiveBar({
  direction,
  activeKey,
  activetab,
  activebar,
  enabled,
}: UseActiveBarOptions) {
  const rafIdRef = useRef<number>(0);

  const moveActiveBar = useCallback(() => {
    const bar = activebar.current;
    const tab = activetab.current;

    if (!bar || !tab || !enabled) return;

    const rect = tab.getBoundingClientRect();
    const isHorizontal = direction === 'horizontal';

    if (isHorizontal) {
      bar.style.width = `${rect.width}px`;
      bar.style.transform = `translateX(${tab.offsetLeft}px)`;
    } else {
      bar.style.height = `${rect.height}px`;
      bar.style.transform = `translateY(${tab.offsetTop}px)`;
    }
  }, [direction, activetab, activebar, enabled]);

  useEffect(() => {
    // Cancel previous RAF
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // Use RAF to ensure DOM update is complete
    rafIdRef.current = requestAnimationFrame(() => {
      moveActiveBar();
    });

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [activeKey, moveActiveBar]);

  return moveActiveBar;
}
