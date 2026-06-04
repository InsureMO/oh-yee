import { useRef, useEffect } from 'react';

export default function useMount(callback: () => void) {
  const init = useRef(false);

  useEffect(() => {
    if (init.current) {
      callback?.();
    }
  }, []);

  useEffect(() => {
    init.current = true;
    return () => {
      init.current = false;
    };
  }, []);
}
