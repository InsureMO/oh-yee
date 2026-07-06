import * as React from 'react';
import debounce from '../../utils/debounce';

export default function useMove(
  handler: React.RefObject<HTMLDivElement | null>,
  direction: 'horizontal' | 'vertical',
  onMove: (dis: number) => void,
) {
  const [moving, setMoving] = React.useState(false);

  const moveTarget = (distance: number) => {
    onMove(distance);
  };

  React.useEffect(() => {
    if (!handler.current) return;
    const ele = handler.current as HTMLElement;
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      let x = e.pageX;
      let y = e.pageY;
      setMoving(true);

      const onMouseMove = debounce((e: MouseEvent) => {
        document.body.style.userSelect = 'none';
        document.body.style.cursor =
          direction === 'horizontal' ? 'col-resize' : 'row-resize';
        const cx = e.pageX - x;
        const cy = e.pageY - y;
        x = e.pageX;
        y = e.pageY;
        if (direction === 'horizontal') {
          moveTarget(cx);
        } else {
          moveTarget(cy);
        }
      }, 5);

      const onMouseUp = () => {
        setMoving(false);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        ele.removeEventListener('mouseup', onMouseUp);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      ele.addEventListener('mouseup', onMouseUp);
    };

    ele.addEventListener('mousedown', onMouseDown);

    return () => {
      ele.removeEventListener('mousedown', onMouseDown);
    };
  }, [handler.current, direction]);

  React.useEffect(() => {
    if (handler.current) {
      const ele = handler.current as HTMLElement;
      if (moving) {
        ele.classList.add('moving');
      } else {
        ele.classList.remove('moving');
      }
    }
  }, [moving]);

  return [moving];
}
