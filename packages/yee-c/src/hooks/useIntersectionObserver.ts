import { useEffect, useRef, useState } from 'react';
import useLatest from './useLatest';

export interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useIntersectionObserver = <T extends Element>(
  options: UseIntersectionObserverOptions = {},
) => {
  const { root = null, rootMargin = '0px', threshold = 0 } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);
  const optionsRef = useLatest({ root, rootMargin, threshold });

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        root: optionsRef.current.root,
        rootMargin: optionsRef.current.rootMargin,
        threshold: optionsRef.current.threshold,
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return { ref, isIntersecting };
};

export default useIntersectionObserver;
