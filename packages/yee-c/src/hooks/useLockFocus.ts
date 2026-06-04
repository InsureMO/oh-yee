import { useEffect } from 'react';
import useDelayState from './useDelayState';

export default function useElementFocus(
  element: HTMLElement | null,
  visible: boolean,
) {
  const delayVisible = useDelayState(visible);

  useEffect(() => {
    if (!element) return;
    // get focusable elements
    const focusable = Array.from<HTMLElement>(
      element.querySelectorAll(
        'a[href],button,textarea,input,select,details,[tabindex]:not([tabindex="-1"])',
      ),
    );

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab, when focus is on the first element
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        // Tab, when focus is on the last element, should go to the first one
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    if (delayVisible) {
      element.addEventListener('keydown', handleKeydown);
    } else {
      element.removeEventListener('keydown', handleKeydown);
    }

    return () => {
      element.removeEventListener('keydown', handleKeydown);
    };
  }, [element, delayVisible]);
}
