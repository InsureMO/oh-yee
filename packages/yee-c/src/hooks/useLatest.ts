import { useRef } from 'react';

export default function useLatest<T>(defaultValue: T) {
  const ref = useRef(defaultValue);
  ref.current = defaultValue;
  return ref;
}
