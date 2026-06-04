import { useCallback, useEffect } from 'react';
import useEvent from './useEvent';

export interface UseEscProps {
  /**
   * Callback when ESC key is pressed
   */
  onEsc?: (event: KeyboardEvent) => void;
  /**
   * Control whether ESC listener is enabled
   * @default true
   */
  enabled?: boolean;
}

/**
 * React Hook for listening to ESC key press
 *
 * @example
 * ```tsx
 * useEsc({
 *   onEsc: () => {
 *     // Handle ESC key logic
 *     closeModal();
 *   }
 * });
 * ```
 */
export default function useEsc({ onEsc, enabled = true }: UseEscProps = {}) {
  const handleEsc = useEvent(onEsc || (() => {}));

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleEsc(event);
      }
    },
    [handleEsc]
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, handleKeyDown]);
}