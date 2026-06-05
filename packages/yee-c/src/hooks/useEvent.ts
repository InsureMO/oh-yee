import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function useEvent<T extends Function>(callback?: T): T {
  const ref = React.useRef<any>(undefined);
  ref.current = callback;

  const memoFn = React.useCallback<T>(
    ((...args: any) => ref.current?.(...args)) as any,
    [],
  );

  return memoFn;
}
