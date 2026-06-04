import * as React from 'react';

const canUseDom = () => {
    return !!(
        typeof window !== 'undefined' &&
        window.document &&
        window.document.createElement
    );
}

/**
 * Wrap `React.useLayoutEffect` which will not throw warning message in test env
 */
const useLayoutEffect =
  canUseDom()
    ? React.useLayoutEffect
    : React.useEffect;

export default useLayoutEffect;

export const useLayoutUpdateEffect: typeof React.useEffect = (
  callback,
  deps,
) => {
  const firstMountRef = React.useRef(true);

  useLayoutEffect(() => {
    if (!firstMountRef.current) {
      return callback();
    }
  }, deps);

  // We tell react that first mount has passed
  useLayoutEffect(() => {
    firstMountRef.current = false;
    return () => {
      firstMountRef.current = true;
    };
  }, []);
};
