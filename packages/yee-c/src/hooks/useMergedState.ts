import { useMemo, useRef } from 'react';
import isEqual from '../utils/isEqual';
import useEvent from './useEvent';
import useLayoutEffect, { useLayoutUpdateEffect } from './useLayoutEffect';
import useState from './useState';

type Updater<T> = (
  updater: T | ((origin: T) => T),
  ignoreDestroy?: boolean,
) => void;

enum Source {
  INNER,
  PROP,
}

type ValueRecord<T> = [T, Source, T];

/** We only think `undefined` is empty */
function hasValue(value: any) {
  return value !== undefined;
}

/**
 * Similar to `useState` but will use props value if provided.
 * Note that internal use rc-util `useState` hook.
 */
export default function useMergedState<T, R = T>(
  defaultStateValue: T | (() => T),
  option?: {
    defaultValue?: T | (() => T);
    value?: T;
    onChange?: (value: T, prevValue: T) => void;
    handleState?: (value: T) => T;
    deepCompare?: boolean;
  },
): [R, Updater<T>] {
  const { defaultValue, value, onChange, handleState, deepCompare } =
    option || {};
  const prevValueRef = useRef<T>(undefined);

  // ======================= Init =======================
  const [mergedValue, setMergedValue] = useState<ValueRecord<T>>(() => {
    let finalValue: T = undefined as T;
    let source: Source;

    if (hasValue(value)) {
      finalValue = value as T;
      source = Source.PROP;
    } else if (hasValue(defaultValue)) {
      finalValue =
        typeof defaultValue === 'function'
          ? (defaultValue as any)()
          : defaultValue;
      source = Source.PROP;
    } else {
      finalValue =
        typeof defaultStateValue === 'function'
          ? (defaultStateValue as any)()
          : defaultStateValue;
      source = Source.INNER;
    }
    return [finalValue, source, finalValue];
  });

  const chosenValue = hasValue(value) ? value : mergedValue[0]; // This prevents Chinese IME input
  // const chosenValue = mergedValue[0]; // If using this approach, values can also be updated in controlled mode

  const postMergedValue = useMemo(() => {
    const result = handleState
      ? handleState(chosenValue as unknown as T)
      : chosenValue;

    if (deepCompare && prevValueRef.current) {
      if (isEqual(prevValueRef.current, result)) {
        return prevValueRef.current;
      }
    }
    prevValueRef.current = result;
    return result;
  }, [chosenValue]);

  // ======================= Sync =======================
  useLayoutUpdateEffect(() => {
    // @ts-ignore
    setMergedValue(([prevValue]) => [value, Source.PROP, prevValue]);
  }, [value]);

  // ====================== Update ======================
  const changeEventPrevRef = useRef<T>(undefined);

  const triggerChange: Updater<T> = useEvent((updater, ignoreDestroy) => {
    setMergedValue((prev) => {
      const [prevValue, prevSource, prevPrevValue] = prev;

      const nextValue: T =
        typeof updater === 'function' ? (updater as any)(prevValue) : updater;
      // Do nothing if value not change
      if (nextValue === prevValue) {
        return prev;
      }

      // Use prev prev value if is in a batch update to avoid missing data
      const overridePrevValue =
        prevSource === Source.INNER &&
        changeEventPrevRef.current !== prevPrevValue
          ? prevPrevValue
          : prevValue;

      return [nextValue, Source.INNER, overridePrevValue];
    }, ignoreDestroy);
  });

  // ====================== Change ======================
  // @ts-ignore
  const onChangeFn = useEvent(onChange);

  useLayoutEffect(() => {
    const [current, source, prev] = mergedValue;
    if (current !== prev && source === Source.INNER) {
      onChangeFn(current, prev);
      changeEventPrevRef.current = prev;
    }
  }, [mergedValue]);

  return [postMergedValue as unknown as R, triggerChange];
}
