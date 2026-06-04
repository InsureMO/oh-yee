import React, { useEffect, useRef, useState } from 'react';
import FloatButton from './float-button';
import type { BackTopProps } from './interface';

const BackTop = React.forwardRef((props: BackTopProps, ref: any) => {
  const { scrollTop = 100, getContainer, onClick, ...rest } = props;

  const [visible, setVisible] = useState(false);

  const containerRef = useRef<any>(null);

  useEffect(() => {
    const container = getContainer ? getContainer() : document.body;

    if (!container) return;

    const handleScroll = () => {
      const currentScroll =
        container === document.body || container === document.documentElement
          ? window.scrollY
          : (container as HTMLElement).scrollTop;
      if (currentScroll >= scrollTop) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    container.addEventListener('scroll', handleScroll);
    containerRef.current = container;

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    onClick?.(e);
  };

  return visible ? (
    <FloatButton {...rest} onClick={handleClick} ref={ref} />
  ) : null;
});

BackTop.displayName = 'BackTop';

export default BackTop;
