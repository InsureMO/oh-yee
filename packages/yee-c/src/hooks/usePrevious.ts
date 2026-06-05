import { useRef } from 'react';

const defaultShouldUpdate = <T>(a?: T, b?: T) => !Object.is(a, b);

type ShouldUpdateFunc = typeof defaultShouldUpdate;

export default function usePrevious<T>(
  state: T,
  shouldUpdate: ShouldUpdateFunc = defaultShouldUpdate,
): T | undefined {
  // Store the previous value
  const prevRef = useRef<T>(undefined);
  // Current value
  const curRef = useRef<T>(undefined);

  // Custom check for whether to update the previous value
  if (shouldUpdate(curRef.current, state)) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
}
