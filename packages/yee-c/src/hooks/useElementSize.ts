import { useState, useLayoutEffect, useRef } from 'react';

// Hook specifically for getting element dimensions
const useElementSize = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new ResizeObserver((entries) => {
      // entry.contentRect contains width and height
      const { width, height } = entries[0].contentRect;

      // Add check to prevent unnecessary re-renders
      setSize((prev) => {
        if (prev.width === width && prev.height === height) return prev;
        return { width, height };
      });
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency, only runs on mount

  return { ref, width: size.width, height: size.height };
};

export default useElementSize;