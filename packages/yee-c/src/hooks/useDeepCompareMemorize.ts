import { useRef } from 'react';
import deepClone from '../utils/deepClone';
import isEqual from '../utils/isEqual';

export default function useDeepCompareMemoize<T>(value: T): T {
  const ref = useRef<T>(undefined as T);
  if (!ref.current || !isEqual(ref.current, value)) {
    ref.current = deepClone(value);
  }
  return ref.current;
}
