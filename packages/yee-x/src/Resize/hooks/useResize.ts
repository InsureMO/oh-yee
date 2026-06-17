import { useEffect, useRef, useState } from 'react';

export default function useResize({
  onResize,
}: {
  onResize?: (width: number) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const handler = useRef<HTMLDivElement>(null);
  const [isResize, setIsResize] = useState(false);

  useEffect(() => {
    const c = container.current!;
    const fn = (e: MouseEvent) => {
      const { left } = c.getBoundingClientRect();
      //   const newWidth = e.clientX - c.offsetLeft;
      const newWidth = e.clientX - left;
      c.style.width = `${newWidth}px`;
      document.body.style.cursor = 'ew-resize';
      document.body.style.pointerEvents = 'none';
      onResize?.(newWidth);
    };

    if (isResize) {
      document.addEventListener('mousemove', fn);
    } else {
      document.removeEventListener('mousemove', fn);
    }

    return () => {
      document.removeEventListener('mousemove', fn);
    };
  }, [isResize]);

  useEffect(() => {
    if (container.current && handler.current) {
      const h = handler.current;

      const down = () => {
        setIsResize(true);
      };

      const up = () => {
        setIsResize(false);
        document.body.style.cursor = '';
        document.body.style.pointerEvents = '';
      };

      h.addEventListener('mousedown', down);

      h.addEventListener('mouseup', up);

      document.addEventListener('mouseup', up);

      return () => {
        h.removeEventListener('mousemove', down);
        h.removeEventListener('mousemove', up);
        document.removeEventListener('mouseup', up);
      };
    }
  }, []);

  return {
    container,
    handler,
  };
}
