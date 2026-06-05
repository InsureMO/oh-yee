import { useEffect, useRef } from 'react';
import useLatest from './useLatest'; // Assumes you have this hook, or write it manually as below

export type UseResizeObserverOptions = {
  box?: ResizeObserverBoxOptions; // Use official type
};

const useResizeObserver = <T extends Element>(
  callback: ResizeObserverCallback,
  options: UseResizeObserverOptions = {},
) => {
  const ref = useRef<T>(null);
  const { box = 'content-box' } = options;

  // 1. Use ref to always point to the latest callback function
  // This way callback changes won't trigger useEffect re-execution
  const callbackRef = useLatest(callback);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    // 2. Call the latest function stored in ref here
    const observer = new ResizeObserver((entries, obs) => {
      callbackRef.current?.(entries, obs);
    });

    observer.observe(target, { box });

    return () => {
      observer.disconnect();
    };
    // 3. Dependency array only contains box, callback is removed
    // This way the observer is only rebuilt when box mode changes
  }, [box]);

  return { ref };
};

export default useResizeObserver;
