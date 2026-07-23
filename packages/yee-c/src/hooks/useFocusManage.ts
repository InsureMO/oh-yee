import { useEffect, useRef } from 'react';
import { type FocusStackEntry, popFocus, pushFocus } from '../utils/focusStack';
export default function useFocusManage(
  element: HTMLElement | null,
  open: boolean,
) {
  const entryRef = useRef<FocusStackEntry | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const openCycleRef = useRef(false);
  const releaseEntry = () => {
    if (entryRef.current) {
      popFocus(entryRef.current);
      entryRef.current = null;
    }
  };
  const endOpenCycle = () => {
    releaseEntry();
    previousFocusRef.current = null;
    openCycleRef.current = false;
  };
  useEffect(() => {
    if (open && !openCycleRef.current) {
      openCycleRef.current = true;
      previousFocusRef.current = document.activeElement as HTMLElement | null;
    } else if (!open && openCycleRef.current) {
      endOpenCycle();
    }
  }, [open]);
  useEffect(() => {
    if (!open || !openCycleRef.current || !element || entryRef.current) {
      return;
    }
    entryRef.current = pushFocus(element, previousFocusRef.current);
  }, [element, open]);
  useEffect(() => releaseEntry, []);
}
