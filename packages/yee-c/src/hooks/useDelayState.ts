import { useEffect, useState } from 'react';

export default function useDelayState<T>(state: T, delay = 0): T {
  const [delayState, setDelayState] = useState<T>();

  useEffect(() => {
    setTimeout(() => {
      setDelayState(state);
    }, delay * 1000);
  }, [state]);

  return delayState as T;
}
