import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { RevealProps } from './interface';

import './style/index.less';

const Reveal: React.FC<RevealProps> = (baseprops) => {
  const { reveal } = React.useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, reveal);
  const {
    prefixCls = 'yee-reveal',
    className,
    style,
    children,
    mode = 'scroll',
    offset = '0px',
    scrollContainer = null,
    ...rest
  } = props;

  const childList = React.Children.toArray(children);
  const total = childList.length;
  const [renderCount, setRenderCount] = useState(1);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const done = renderCount >= total;

  // scroll mode: IntersectionObserver
  useEffect(() => {
    if (mode !== 'scroll' || done) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRenderCount((c) => Math.min(c + 1, total));
        }
      },
      { root: scrollContainer, rootMargin: offset, threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mode, renderCount, done, total, offset, scrollContainer]);

  // stagger mode: rAF with auto-tuning batch size
  useEffect(() => {
    if (mode !== 'stagger' || done) return;

    let rafId: number;
    let batchSize = 1;
    let prevTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const elapsed = now - prevTime;
      prevTime = now;

      if (elapsed > 25) {
        batchSize = Math.max(1, batchSize - 1);
      } else if (elapsed <= 20) {
        batchSize = Math.min(20, batchSize + 1);
      }

      setRenderCount((c) => {
        if (c >= total) return c;
        return Math.min(c + batchSize, total);
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [mode, done, total]);

  return (
    <div {...rest} className={clsx(prefixCls, className)} style={style}>
      {childList.slice(0, renderCount)}
      {mode === 'scroll' && !done && (
        <div ref={sentinelRef} className={`${prefixCls}-sentinel`} />
      )}
    </div>
  );
};

export default Reveal;
