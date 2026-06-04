import * as React from 'react';
import debounce from '../utils/debounce';

export default function useDebounceFunction<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  deps = [],
) {
  const debouncedFn = React.useCallback(debounce(fn, delay), deps);

  return debouncedFn;
}
