import clsx from 'clsx';
import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import './style/cycle.less';

import { CycleProps } from './interface';

const LINE_HEIGHT = 22; // Line height constant
const DEFAULT_INTERVAL = 3000; // Default scroll interval (ms)
const TRANSITION_DURATION = 300; // Transition animation duration (ms)

const Cycle: React.FC<CycleProps> = (props) => {
  const {
    prefixCls = 'yee-alert-cycle',
    description,
    direction,
    mode = 'turn',
    speed = 15,
    delay = 0,
    row = 1,
    pauseOnHover,
    pauseOnClick,
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const verticalRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const counter = useRef(0);
  const timesRef = useRef(0); // Ref to track click count

  const rollHeight = row * LINE_HEIGHT;

  // Optimize message list processing logic
  const messageList = useMemo(() => {
    if (!description) return [];

    const list = Array.isArray(description) ? description : [description];
    const len = list.length;
    const remainder = len % row;
    const loopCount = remainder ? Math.ceil(row / remainder) - 1 : 0;

    return [
      ...list,
      ...Array(loopCount)
        .fill(0)
        .flatMap(() => list),
    ];
  }, [description, row]);

  // Merge horizontal scroll rendering logic
  const horizontal = useMemo(() => {
    const messageArray = Array.isArray(description)
      ? description
      : [description];

    return (
      <div className={`${prefixCls}-horizontal-container`}>
        <div className={`${prefixCls}-horizontal-item`}>
          {messageArray.map((msg, index) => (
            <div key={`msg-${index}`}>{msg}</div>
          ))}
        </div>
      </div>
    );
  }, [description, prefixCls]);

  // Optimize vertical scroll logic
  const vertical = useMemo(() => {
    return (
      <div
        className={`${prefixCls}-vertical-container`}
        style={{ height: rollHeight }}
      >
        <div
          className={clsx([`${prefixCls}-vertical-`, mode].filter(Boolean))}
          ref={verticalRef}
        >
          {messageList.map((msg, index) => (
            <div key={`msg-${index}`}>{msg}</div>
          ))}
        </div>
      </div>
    );
  }, [messageList, mode, rollHeight, prefixCls]);

  // Optimize style update logic
  useLayoutEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    currentRef.style.setProperty('--yee-alert-loop-duration', `${speed}s`);
    currentRef.style.setProperty('--yee-alert-loop-delay', `${delay}s`);
  }, [speed, delay]);

  // Optimize auto scroll logic
  const autoScroll = useCallback(() => {
    if (!verticalRef.current) return;

    const vRef = verticalRef.current;
    vRef.style.transitionDuration = `${TRANSITION_DURATION}ms`;
    vRef.style.transform = `translateY(-${counter.current}px)`;

    counter.current += rollHeight;

    if (counter.current >= vRef.clientHeight) {
      clearInterval(timer.current as NodeJS.Timeout);
      timer.current = null;

      // Use requestAnimationFrame to optimize animation
      requestAnimationFrame(() => {
        vRef.style.transitionDuration = '0ms';
        vRef.style.transform = 'translateY(0)';
        counter.current = 0;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        startVertical();
      });
    }
  }, [rollHeight]);

  // Optimize vertical scroll start logic
  const startVertical = useCallback(() => {
    if (direction !== 'vertical') return;

    timer.current = window.setInterval(
      autoScroll,
      speed ? speed * 1000 : DEFAULT_INTERVAL,
    ) as unknown as NodeJS.Timeout;
  }, [direction, speed, autoScroll]);

  // Optimize effect dependencies
  useLayoutEffect(() => {
    startVertical();
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [startVertical]);

  // Optimize event handling logic
  useLayoutEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const pause = () => {
      currentRef.style.setProperty('--yee-alert-loop-play', 'paused');
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };

    const resume = () => {
      currentRef.style.setProperty('--yee-alert-loop-play', 'running');
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
      startVertical();
    };

    // Optimize click handling
    const handleClick = () => {
      timesRef.current = (timesRef.current + 1) % 2;
      if (timesRef.current) {
        pause();
      } else {
        resume();
      }
    };

    // Optimize debounce handling
    const handleMouseEnter = () => {
      if (pauseOnHover) {
        pause();
      }
    };

    const handleMouseLeave = () => {
      if (pauseOnHover) {
        resume();
      }
    };

    // Add event listeners
    if (pauseOnHover) {
      currentRef.addEventListener('mouseenter', handleMouseEnter);
      currentRef.addEventListener('mouseleave', handleMouseLeave);
    }

    if (pauseOnClick) {
      currentRef.addEventListener('click', handleClick);
    }

    // Cleanup function
    return () => {
      if (pauseOnHover) {
        currentRef.removeEventListener('mouseenter', handleMouseEnter);
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }

      if (pauseOnClick) {
        currentRef.removeEventListener('click', handleClick);
      }
    };
  }, [pauseOnHover, pauseOnClick, startVertical]);

  return (
    <div className={prefixCls} ref={ref}>
      {direction === 'vertical' ? vertical : horizontal}
    </div>
  );
};

export default Cycle;
