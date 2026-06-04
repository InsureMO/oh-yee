import { useMemo } from 'react';
import useDeepCompareMemorize from './useDeepCompareMemorize';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function useDeepCompareEffect(
  fn: () => any,
  deps: Array<unknown>,
) {
  const memo = useDeepCompareMemorize(deps);
  return useMemo(fn, memo);
}
