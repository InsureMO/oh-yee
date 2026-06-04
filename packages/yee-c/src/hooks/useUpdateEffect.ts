import { useRef, useEffect } from 'react';

import useDeepCompareEffect from './useDeepCompareEffect';

const useUpdateEffect = (callback: () => void, deps: Array<any>) => {
  const firstRef = useRef(true);

  useDeepCompareEffect(() => {
    if (!firstRef.current) {
      return callback();
    }
  }, deps);

  useEffect(() => {
    firstRef.current = false;
    return () => {
      firstRef.current = true;
    };
  }, []);
};

export default useUpdateEffect;
