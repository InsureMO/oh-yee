import { useCallback, useEffect, useRef, useState } from 'react';

export type CountdownOptions = {
  duration: number;
  interval?: number;
  onComplete?: () => void;
  resetKey?: string | number;
};

export default function useCountdown({
  duration,
  interval = 100,
  onComplete,
  resetKey,
}: CountdownOptions) {
  const initialRemaining = Math.max(0, duration);
  const [remaining, setRemaining] = useState(initialRemaining);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = useRef(initialRemaining);
  const isPausedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const identityRef = useRef({ duration, resetKey });
  const epochRef = useRef(0);

  onCompleteRef.current = onComplete;
  if (
    identityRef.current.duration !== duration ||
    identityRef.current.resetKey !== resetKey
  ) {
    identityRef.current = { duration, resetKey };
    epochRef.current += 1;
  }

  const clear = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const tick = useCallback(
    (epoch: number) => {
      if (epoch !== epochRef.current) {
        return;
      }

      const next = Math.max(0, remainingRef.current - interval);
      remainingRef.current = next;
      setRemaining(next);

      if (next <= 0) {
        onCompleteRef.current?.();
      } else {
        timerRef.current = setTimeout(() => tick(epoch), interval);
      }
    },
    [interval],
  );

  const start = useCallback(() => {
    clear();
    if (remainingRef.current > 0 && !isPausedRef.current) {
      const epoch = epochRef.current;
      timerRef.current = setTimeout(() => tick(epoch), interval);
    }
  }, [clear, interval, tick]);

  useEffect(() => {
    clear();
    const nextRemaining = Math.max(0, duration);
    remainingRef.current = nextRemaining;
    setRemaining(nextRemaining);

    if (nextRemaining > 0 && !isPausedRef.current) {
      start();
    }

    return clear;
  }, [clear, duration, resetKey, start]);

  const onPause = useCallback(() => {
    isPausedRef.current = true;
    clear();
    setIsPaused(true);
  }, [clear]);

  const onResume = useCallback(() => {
    isPausedRef.current = false;
    setIsPaused(false);
    if (remainingRef.current > 0) {
      start();
    }
  }, [start]);

  return { remaining, isPaused, onPause, onResume };
}
