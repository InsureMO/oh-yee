import clsx from 'clsx';
import React, { createRef, forwardRef, useEffect, useRef } from 'react';
import { FlowProps } from './interface';

import './style/index.less';

const Flow = forwardRef<HTMLDivElement, FlowProps>((props, ref) => {
  const {
    prefixCls = 'yee-flow',
    className,
    children,
    stopOnHover = true,
    distance = 1,
    interval = 10,
    classNames,
    styles,
    ...rest
  } = props;

  const componentRef = (ref as any) || createRef<HTMLDivElement>();
  const animateId = useRef<number>(0);

  const cls = clsx(prefixCls, className);

  const flow = () => {
    let prevTimeStamp: number;
    let posx = 1;
    let posy = 1;
    const animate = (timestamp: number) => {
      if (!componentRef.current) return;
      if (!prevTimeStamp) {
        prevTimeStamp = timestamp;
      }
      const delta = timestamp - prevTimeStamp;

      const { x: intervalX, y: intervalY } =
        typeof interval === 'number' ? { x: interval, y: interval } : interval;
      const { x: distanceX, y: distanceY } =
        typeof distance === 'number' ? { x: distance, y: distance } : distance;

      let top = 0;
      let left = 0;
      let ready = false;
      // Handle horizontal scrolling
      if (delta > intervalX) {
        const w = componentRef.current.scrollWidth;
        const cw = componentRef.current.clientWidth;
        const l = componentRef.current.scrollLeft;
        ready = true;
        left = l + distanceX * posx;
        if (left >= w - cw) {
          left = w - cw;
          posx = -1;
        } else if (left <= 0) {
          left = 0;
          posx = 1;
        }
      }
      // Handle vertical scrolling
      if (delta > intervalY) {
        const h = componentRef.current.scrollHeight;
        const ch = componentRef.current.clientHeight;
        const t = componentRef.current.scrollTop;
        ready = true;
        top = t + distanceY * posy;
        if (top >= h - ch) {
          top = h - ch;
          posy = -1;
        } else if (top <= 0) {
          top = 0;
          posy = 1;
        }
      }
      if (ready) {
        componentRef.current.scroll({
          top,
          left,
          behavior: 'smooth',
        });
        prevTimeStamp = timestamp;
      }
      animateId.current = requestAnimationFrame(animate);
    };
    animateId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    flow();
    return () => {
      cancelAnimationFrame(animateId.current);
    };
  }, []);

  const onEnter = () => {
    if (stopOnHover) {
      cancelAnimationFrame(animateId.current);
    }
  };

  const onLeave = () => {
    flow();
  };

  return (
    <div
      {...rest}
      className={cls}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      ref={componentRef}
    >
      <div
        className={clsx(`${prefixCls}-inner`, classNames?.inner)}
        style={styles?.inner}
      >
        {children}
      </div>
    </div>
  );
});

export default Flow;
