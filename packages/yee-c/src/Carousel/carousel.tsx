import clsx from 'clsx';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { GlobalContext } from '../Config-Provider';
import useElementSize from '../hooks/useElementSize';
import mergeContextToProps from '../utils/mergeContextToProps';
import Item from './carousel-item';
import type {
  CarouselContextProps,
  CarouselItemProps,
  CarouselProps,
} from './interface';

import './style/index.less';

const DEFAULT_ANIMATION_DURATION = 500;

export const CarouselCtx = React.createContext<CarouselContextProps>({
  prefixCls: 'yee-carousel',
  effect: 'scrollx',
  current: 1,
});

const Carousel = React.forwardRef(
  (baseprops: CarouselProps, ref: React.Ref<HTMLDivElement>) => {
    const { carousel } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, carousel);
    const {
      prefixCls = 'yee-carousel',
      children,
      className,
      autoplay = false,
      pauseOnHover = true,
      arrows = 'hover',
      dots = true,
      dotPosition = 'bottom',
      dotShape = 'line',
      trigger = 'click',
      effect = 'scrollx',
      infinite = true,
      autoplaySpeed = 500,
      animationDuration = DEFAULT_ANIMATION_DURATION,
      classNames,
      styles,
      beforeChange,
      afterChange,
      ...rest
    } = props;

    const loopRef = useRef<HTMLDivElement>(null);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const direction =
      dotPosition === 'left' || dotPosition === 'right'
        ? 'vertical'
        : 'horizontal';

    const count = React.Children.count(children) || 0;
    const [current, setCurrent] = useState(1);
    const [transition, setTransition] = useState(true);

    const [containerSize, setContainerSize] = useState(0);

    const [showArrow, setShowArrow] = useState(
      arrows === 'always' ? true : false,
    );

    const { ref: sizeRef, width, height } = useElementSize<HTMLDivElement>();

    useEffect(() => {
      const newSize = direction === 'horizontal' ? width : height;
      if (newSize > 0) {
        setContainerSize(newSize);
      }
    }, [width, height, direction]);

    // Merge refs
    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        (sizeRef as React.RefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.RefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref, sizeRef],
    );

    const goto = useCallback(
      (index: number) => {
        beforeChange?.(current, index);
        setCurrent(index);
        afterChange?.(index);
      },
      [current, beforeChange, afterChange],
    );

    const prev = useCallback(() => {
      goto(current - 1);
    }, [current, goto]);

    const next = useCallback(() => {
      goto(current + 1);
    }, [current, goto]);

    useEffect(() => {
      if (autoplay) {
        clearInterval(timer.current as NodeJS.Timeout);
        timer.current = setInterval(next, autoplaySpeed);
      }

      return () => {
        clearInterval(timer.current as NodeJS.Timeout);
      };
    }, [autoplay, autoplaySpeed, next]);

    // useEffect in Carousel to monitor current changes
    useEffect(() => {
      if (!infinite || effect !== 'scrollx') return;
      if (current === 0 || current === count + 1) {
        // At clone frame, wait for animation to end then switch back to real frame
        const timer = setTimeout(() => {
          setTransition(false); // Disable animation
          setCurrent(current === 0 ? count : 1); // 0 -> real last, count+1 -> real first
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setTransition(true);
            });
          });
        }, animationDuration ?? DEFAULT_ANIMATION_DURATION); // Match CSS animation duration
        return () => clearTimeout(timer);
      }
    }, [current, infinite, effect, count]);

    const handleMouseEnter = () => {
      if (pauseOnHover) {
        clearInterval(timer.current as NodeJS.Timeout);
        timer.current = null;
      }

      if (arrows === 'hover') {
        setShowArrow(true);
      }
    };

    const handleMouseLeave = () => {
      if (pauseOnHover && autoplay) {
        timer.current = setInterval(next, autoplaySpeed);
      }

      if (arrows === 'hover') {
        setShowArrow(false);
      }
    };

    const carouselProps = {
      ...rest,
      className: clsx(
        prefixCls,
        [`${prefixCls}-${direction}`],
        [`${prefixCls}-${effect}`],
        { [`${prefixCls}-arrows-visible`]: showArrow },
        className,
      ),
      role: 'region' as const,
      'aria-roledescription': 'carousel',
      'aria-live': autoplay ? ('off' as const) : ('polite' as const),
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    };

    const handleIndicator = (index: number, type: 'click' | 'hover') => {
      if (type === trigger) {
        goto(index);
      }
    };

    const renderAction = () => {
      if (arrows === false) return null;

      return (
        <>
          <div
            className={clsx(
              `${prefixCls}-prev`,
              {
                show: infinite || current > 1,
              },
              classNames?.prev,
            )}
            style={styles?.prev}
            onClick={prev}
            role="button"
            aria-label="Previous slide"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                prev();
              }
            }}
          >
            {direction === 'vertical' ? <ChevronUp /> : <ChevronLeft />}
          </div>
          <div
            className={clsx(
              `${prefixCls}-next`,
              {
                show: infinite || current !== count,
              },
              classNames?.next,
            )}
            style={styles?.next}
            onClick={next}
            role="button"
            aria-label="Next slide"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                next();
              }
            }}
          >
            {direction === 'vertical' ? <ChevronDown /> : <ChevronRight />}
          </div>
        </>
      );
    };

    const renderDots = () => {
      return dots ? (
        <ul
          className={clsx(
            `${prefixCls}-bar`,
            [`${prefixCls}-bar-${dotShape}`],
            [`${prefixCls}-bar-${dotPosition}`],
            classNames?.dot,
          )}
          style={styles?.dot}
          role="tablist"
          aria-label="Slide controls"
        >
          {new Array(React.Children.count(children))
            .fill(0)
            .map((i, index: number) => {
              const isActive =
                current === index + 1 ||
                (current === 0 && index === count - 1);
              return (
                <li
                  className={clsx({
                    active: isActive,
                  })}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Slide ${index + 1}`}
                  tabIndex={0}
                  onClick={() => handleIndicator(index + 1, 'click')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleIndicator(index + 1, 'click');
                    }
                  }}
                  onMouseEnter={() => handleIndicator(index + 1, 'hover')}
                  key={`${prefixCls}-bar-${index}`}
                ></li>
              );
            })}
        </ul>
      ) : null;
    };

    const renderFadeChilds = () => {
      return React.Children.map(children, (child, index) => {
        return React.cloneElement(
          child as React.ReactElement<CarouselItemProps>,
          { index },
        );
      });
    };

    const renderWrapedChilds = () => {
      if (count === 0 || containerSize === 0) return null;

      const arr = React.Children.toArray(children);
      const childs = [arr[count - 1], ...arr, arr[0]];

      return childs.map((child, index) => (
        <Item
          style={
            direction === 'horizontal'
              ? { width: `${containerSize}px` }
              : { height: `${containerSize}px` }
          }
          index={index - 1}
          key={index - 1}
        >
          {child}
        </Item>
      ));
    };

    const realTotal = effect === 'scrollx' ? count + 2 : count;

    return (
      <div {...carouselProps} ref={mergedRef}>
        <div
          className={clsx(`${prefixCls}-container`)}
          style={
            direction === 'horizontal'
              ? {
                  width: `${realTotal * containerSize}px`,
                  transform: `translateX(-${current * containerSize}px)`,
                  transition: transition
                    ? `transform ${(animationDuration ?? DEFAULT_ANIMATION_DURATION) / 1000}s ease`
                    : undefined,
                }
              : {
                  height: `${realTotal * containerSize}px`,
                  transform: `translateY(-${current * containerSize}px)`,
                  transition: transition
                    ? `transform ${(animationDuration ?? DEFAULT_ANIMATION_DURATION) / 1000}s ease`
                    : undefined,
                }
          }
          ref={loopRef}
        >
          <CarouselCtx.Provider value={{ prefixCls, effect, current }}>
            {effect === 'scrollx' ? renderWrapedChilds() : renderFadeChilds()}
          </CarouselCtx.Provider>
        </div>
        {renderAction()}
        {renderDots()}
      </div>
    );
  },
);

Carousel.displayName = 'Carousel';

export default Carousel;
