import { useEffect, useState } from 'react';

export default function useDelayState<T>(state: T, delay = 0): T {
  const [delayState, setDelayState] = useState<T>();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDelayState(state);
    }, delay * 1000);

    return () => window.clearTimeout(timer);
  }, [delay, state]);

  return delayState as T;
}
