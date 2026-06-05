import { useCallback, useEffect, useRef, useState } from 'react';

export type CountdownOptions = {
  duration: number;
  interval?: number;
  onComplete?: () => void;
};

export default function useCountdown({
  duration,
  interval = 100,
  onComplete,
}: CountdownOptions) {
  const [remaining, setRemaining] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = useRef(duration);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const clear = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const next = Math.max(0, remainingRef.current - interval);
    remainingRef.current = next;
    setRemaining(next);

    if (next <= 0) {
      onCompleteRef.current?.();
    } else {
      timerRef.current = setTimeout(tick, interval);
    }
  }, [interval]);

  const start = useCallback(() => {
    clear();
    timerRef.current = setTimeout(tick, interval);
  }, [clear, interval, tick]);

  useEffect(() => {
    remainingRef.current = duration;
    setRemaining(duration);
    setIsPaused(false);
    start();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  const onPause = useCallback(() => {
    clear();
    setIsPaused(true);
  }, [clear]);

  const onResume = useCallback(() => {
    if (remainingRef.current <= 0) return;
    setIsPaused(false);
    start();
  }, [start]);

  return { remaining, isPaused, onPause, onResume };
}
