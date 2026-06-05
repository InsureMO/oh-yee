export default function useKeyControl({
  onArrowDown,
  onArrowUp,
  onArrowLeft,
  onArrowRight,
  onEnter,
}: {
  onArrowDown?: (event: KeyboardEvent) => void;
  onArrowUp?: (event: KeyboardEvent) => void;
  onArrowLeft?: (event: KeyboardEvent) => void;
  onArrowRight?: (event: KeyboardEvent) => void;
  onEnter?: (event: KeyboardEvent) => void;
}) {
  const onKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    if (key === 'ArrowDown') {
      event.preventDefault();
      onArrowDown?.(event);
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      onArrowUp?.(event);
    } else if (key === 'ArrowLeft') {
      event.preventDefault();
      onArrowLeft?.(event);
    } else if (key === 'ArrowRight') {
      event.preventDefault();
      onArrowRight?.(event);
    } else if (key === 'Enter') {
      event.preventDefault();
      onEnter?.(event);
    }
  };

  const listen = () => {
    document.addEventListener('keydown', onKeyDown);
  };

  const unlisten = () => {
    document.removeEventListener('keydown', onKeyDown);
  };

  return {
    listen,
    unlisten,
  };
}
