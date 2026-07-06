import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function useEvent<T extends Function>(callback?: T): T {
  const ref = React.useRef<T | undefined>(undefined);
  ref.current = callback;

  const memoFn = React.useCallback(
    (...args: unknown[]) =>
      (ref.current as ((...args: unknown[]) => unknown) | undefined)?.(
        ...args,
      ),
    [],
  ) as unknown as T;

  return memoFn;
}
