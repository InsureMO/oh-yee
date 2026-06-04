import { useCallback, useEffect } from 'react';
import debounce from '../../utils/debounce';

export function useContainerResize(
  containerRef: React.RefObject<HTMLElement | null>,
  onResize: () => void,
  delay = 300,
) {
  const debouncedResize = useCallback(debounce(onResize, delay), [
    onResize,
    delay,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if browser supports ResizeObserver
    if (typeof ResizeObserver === 'undefined') {
      console.warn('ResizeObserver is not supported in this browser');
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === container) {
          debouncedResize();
        }
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [containerRef, debouncedResize]);
}
