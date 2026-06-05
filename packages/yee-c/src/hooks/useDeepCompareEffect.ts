import * as React from 'react';
import useDeepCompareMemorize from './useDeepCompareMemorize';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function useDeepCompareEffect(fn: () => void, deps: Array<any>) {
  const memo = useDeepCompareMemorize(deps);
  React.useEffect(fn, memo);
}
