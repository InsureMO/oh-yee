import clsx from 'clsx';
import { ChevronLeft } from 'lucide-react';
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import AnchorItem from './anchor-item';
import type {
  AnchorContextType,
  AnchorItemType,
  AnchorProps,
} from './interface';

import './style/index.less';

export const AnchorContext = createContext<AnchorContextType>(
  {} as AnchorContextType,
);

const NAVIGATION_LOCK_TIMEOUT = 5000;
const NAVIGATION_SETTLE_DELAY = 100;
const TARGET_POSITION_TOLERANCE = 2;
const SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
  'Spacebar',
]);

const Anchor = forwardRef<HTMLDivElement, AnchorProps>((baseprops, ref) => {
  const { anchor } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, anchor);

  const {
    prefixCls = 'yee-anchor',
    className,
    style,
    classNames,
    styles,
    items = [],
    children,
    auto = false,
    name,
    defaultActiveKey,
    activeKey,
    affix = true,
    direction = 'vertical',
    indicator = 'static',
    offsetTop = 0,
    getContainer,
    onChange,
    ...rest
  } = props;

  // Sliding indicator (indicator="slide", vertical only): one shared bar is
  // placed at the active item's position and slides across items on change.
  // The native item-active::before is hidden via the -slide styles.
  const slideIndicator = indicator === 'slide' && direction === 'vertical';

  const [mergedActiveKey, setMergedActiveKey] = useMergedState(undefined, {
    value: activeKey,
    defaultValue: defaultActiveKey,
  });

  const [anchorList, setAnchorList] = useState<Array<AnchorItemType>>([]);

  const containerRef = useRef<HTMLElement | Window | null>(null);
  const anchorRootRef = useRef<HTMLDivElement | null>(null);
  const activeKeyRef = useRef(mergedActiveKey);
  const handleScrollRef = useRef<() => void>(() => {});
  const pendingTargetKeyRef = useRef<string | undefined>(undefined);
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const navigationSettleTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    activeKeyRef.current = mergedActiveKey;
  }, [mergedActiveKey]);

  const setAnchorRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      anchorRootRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const clearNavigationSettleTimer = useCallback(() => {
    if (navigationSettleTimeoutRef.current !== null) {
      clearTimeout(navigationSettleTimeoutRef.current);
      navigationSettleTimeoutRef.current = null;
    }
  }, []);

  const clearNavigationLock = useCallback(() => {
    pendingTargetKeyRef.current = undefined;
    clearNavigationSettleTimer();
    if (navigationTimeoutRef.current !== null) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
  }, [clearNavigationSettleTimer]);

  const scheduleNavigationUnlock = useCallback(
    (key: string) => {
      clearNavigationSettleTimer();
      navigationSettleTimeoutRef.current = setTimeout(() => {
        if (pendingTargetKeyRef.current === key) {
          clearNavigationLock();
        }
      }, NAVIGATION_SETTLE_DELAY);
    },
    [clearNavigationLock, clearNavigationSettleTimer],
  );

  const startNavigationLock = useCallback(
    (key: string) => {
      clearNavigationLock();
      pendingTargetKeyRef.current = key;
      navigationTimeoutRef.current = setTimeout(() => {
        if (pendingTargetKeyRef.current === key) {
          clearNavigationLock();
          handleScrollRef.current();
        }
      }, NAVIGATION_LOCK_TIMEOUT);
    },
    [clearNavigationLock],
  );

  useEffect(() => clearNavigationLock, [clearNavigationLock]);

  const commitActiveKey = useCallback(
    (key: string, forceNotify = false) => {
      const changed = activeKeyRef.current !== key;
      activeKeyRef.current = key;
      setMergedActiveKey(key);
      if (changed || forceNotify) {
        onChange?.(key);
      }
    },
    [onChange],
  );

  // Auto-generate anchor list from DOM
  const generateAnchorList = useCallback(() => {
    if (!auto || !name) return;

    const list: Array<AnchorItemType> = [];
    // Escape `name` before interpolating into the attribute selector: a raw
    // value containing quotes / brackets / backslashes would either break the
    // selector (throwing) or open an injection vector.
    const elements = document.querySelectorAll(
      `[data-anchor-group="${CSS.escape(name)}"]`,
    );

    elements.forEach((element) => {
      const key = element.getAttribute('id') || '';
      const title = element.getAttribute('data-anchor-title') || '';
      const status = (element.getAttribute('data-anchor-status') ||
        undefined) as AnchorItemType['status'];

      if (key && title) {
        list.push({ key, title, status });
      }
    });

    setAnchorList(list);
  }, [auto, name]);

  useEffect(() => {
    if (auto) {
      generateAnchorList();
    }
  }, [auto, generateAnchorList]);

  const getTargetOffsetTop = useCallback((target: HTMLElement) => {
    const container = containerRef.current;
    const containerTop =
      container === window
        ? 0
        : (container as HTMLElement).getBoundingClientRect().top;
    const currentScroll =
      container === window
        ? window.scrollY
        : (container as HTMLElement).scrollTop;
    return currentScroll + (target.getBoundingClientRect().top - containerTop);
  }, []);

  const hasReachedTarget = useCallback(
    (key: string) => {
      const container = containerRef.current;
      const target = document.getElementById(key);
      if (!container || !target) return false;

      const currentScroll =
        container === window
          ? window.pageYOffset || document.documentElement.scrollTop
          : (container as HTMLElement).scrollTop;
      const maxScroll =
        container === window
          ? Math.max(
              document.documentElement.scrollHeight,
              document.body?.scrollHeight || 0,
            ) - window.innerHeight
          : (container as HTMLElement).scrollHeight -
            (container as HTMLElement).clientHeight;
      const targetScroll = Math.min(
        Math.max(getTargetOffsetTop(target) - offsetTop, 0),
        Math.max(maxScroll, 0),
      );

      return (
        Math.abs(currentScroll - targetScroll) <= TARGET_POSITION_TOLERANCE
      );
    },
    [getTargetOffsetTop, offsetTop],
  );

  // Handle scroll to update active key
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const pendingTargetKey = pendingTargetKeyRef.current;
    if (pendingTargetKey) {
      if (hasReachedTarget(pendingTargetKey)) {
        scheduleNavigationUnlock(pendingTargetKey);
      } else {
        clearNavigationSettleTimer();
      }
      return;
    }

    const scrollTop =
      container === window
        ? window.pageYOffset || document.documentElement.scrollTop
        : (container as HTMLElement).scrollTop;

    const currentItems = auto ? anchorList : items;

    // Empty array guard
    if (!currentItems || currentItems.length === 0) return;

    // Pick the last anchor whose top has crossed the activation line.
    let nextActiveKey: string | undefined;
    for (let i = currentItems.length - 1; i >= 0; i--) {
      const item = currentItems[i];
      const target = document.getElementById(item.key);

      if (target) {
        const targetTop = getTargetOffsetTop(target);
        if (scrollTop + offsetTop >= targetTop) {
          nextActiveKey = item.key;
          break;
        }
      }
    }

    // Scrolled above the first anchor — reset to the top item.
    if (nextActiveKey === undefined) {
      const first = currentItems.find((item) =>
        document.getElementById(item.key),
      );
      nextActiveKey = first?.key;
    }

    if (nextActiveKey) {
      commitActiveKey(nextActiveKey);
    }
  }, [
    auto,
    anchorList,
    items,
    offsetTop,
    getTargetOffsetTop,
    hasReachedTarget,
    scheduleNavigationUnlock,
    clearNavigationSettleTimer,
    clearNavigationLock,
    commitActiveKey,
  ]);

  useEffect(() => {
    handleScrollRef.current = handleScroll;
  }, [handleScroll]);

  useEffect(() => {
    // Resolve in a passive effect: parent-owned refs passed via `getContainer`
    // aren't attached until after child layout effects run.
    const container = getContainer ? getContainer() : window;
    containerRef.current = container;
    if (!container) return;

    // rAF throttle so the active key tracks scroll live.
    let rafId: ReturnType<typeof requestAnimationFrame> | null = null;
    const onScroll = () => {
      if (pendingTargetKeyRef.current) {
        clearNavigationSettleTimer();
      }
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        handleScroll();
      });
    };
    const onScrollEnd = () => {
      const pendingTargetKey = pendingTargetKeyRef.current;
      if (pendingTargetKey && hasReachedTarget(pendingTargetKey)) {
        scheduleNavigationUnlock(pendingTargetKey);
      }
    };
    const onUserInterrupt = (event: Event) => {
      if (event.type === 'pointerdown' && event.target instanceof Element) {
        const item = event.target.closest(
          `.${CSS.escape(`${prefixCls}-item`)}`,
        );
        const owner = item?.closest(`.${CSS.escape(prefixCls)}`);
        if (owner === anchorRootRef.current) {
          return;
        }
      }
      if (
        event.type === 'keydown' &&
        !SCROLL_KEYS.has((event as KeyboardEvent).key)
      ) {
        return;
      }
      clearNavigationLock();
    };

    container.addEventListener('scroll', onScroll as EventListener);
    container.addEventListener('scrollend', onScrollEnd as EventListener);
    container.addEventListener('wheel', onUserInterrupt as EventListener);
    container.addEventListener('touchstart', onUserInterrupt as EventListener);
    document.addEventListener('pointerdown', onUserInterrupt as EventListener);
    container.addEventListener('keydown', onUserInterrupt as EventListener);
    handleScroll();

    return () => {
      container.removeEventListener('scroll', onScroll as EventListener);
      container.removeEventListener('scrollend', onScrollEnd as EventListener);
      container.removeEventListener('wheel', onUserInterrupt as EventListener);
      container.removeEventListener(
        'touchstart',
        onUserInterrupt as EventListener,
      );
      document.removeEventListener(
        'pointerdown',
        onUserInterrupt as EventListener,
      );
      container.removeEventListener(
        'keydown',
        onUserInterrupt as EventListener,
      );
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [
    getContainer,
    handleScroll,
    hasReachedTarget,
    scheduleNavigationUnlock,
    clearNavigationSettleTimer,
    clearNavigationLock,
    prefixCls,
  ]);

  // Scroll to target when activeKey changes
  const scrollToAnchor = useCallback(
    (key: string) => {
      const target = document.getElementById(key);
      if (!target) return false;

      const container = containerRef.current;
      if (!container) return false;

      const targetTop = getTargetOffsetTop(target) - offsetTop;

      if (container === window) {
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      } else {
        (container as HTMLElement).scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      }
      return true;
    },
    [offsetTop, getTargetOffsetTop],
  );

  useEffect(() => {
    if (defaultActiveKey) {
      scrollToAnchor(defaultActiveKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultActiveKey]); // Only execute when defaultActiveKey changes

  const handleItemClick = useCallback(
    (key: string) => {
      startNavigationLock(key);
      commitActiveKey(key, true);

      if (!scrollToAnchor(key)) {
        clearNavigationLock();
        return;
      }

      // Handles instant scrolling and targets that are already in position.
      handleScroll();
    },
    [
      startNavigationLock,
      commitActiveKey,
      scrollToAnchor,
      clearNavigationLock,
      handleScroll,
    ],
  );

  const cls = clsx(
    prefixCls,
    {
      [`${prefixCls}-${direction}`]: direction,
      [`${prefixCls}-affix`]: affix,
      [`${prefixCls}-static`]: !affix,
      [`${prefixCls}-slide`]: slideIndicator,
    },
    className,
  );

  const currentItems = auto ? anchorList : items;

  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const prevActiveKeyRef = useRef<string | undefined>(undefined);
  const lastGeometryRef = useRef<{ top: number; height: number } | null>(
    null,
  );
  const placeThumbRef = useRef<() => void>(() => {});

  const placeThumb = useCallback(() => {
    if (!slideIndicator) return;
    const wrapper = contentWrapperRef.current;
    const thumb = thumbRef.current;
    if (!wrapper || !thumb) return;

    const item = wrapper.querySelector(`.${prefixCls}-item-active`);
    if (!(item instanceof HTMLElement)) {
      // Empty / not-yet-rendered list: hide the bar until an active item exists
      thumb.style.display = 'none';
      prevActiveKeyRef.current = undefined;
      lastGeometryRef.current = null;
      return;
    }
    thumb.style.display = '';

    const itemRect = item.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    // The bar covers the active item's text box, inset by one inter-item
    // margin (collapsed gap between siblings) wherever it meets a neighbour:
    // non-first items start `gap` below the text top, non-last items end
    // `gap` above the text bottom; first/last keep the outer edge flush.
    // Read from the rendered item so geometry follows the margin token.
    const first = item.matches(':first-child');
    const last = item.matches(':last-child');
    const gap = parseFloat(getComputedStyle(item).marginTop) || 0;
    const top = itemRect.top - wrapperRect.top + (first ? 0 : gap);
    const height = itemRect.height - (first ? 0 : gap) - (last ? 0 : gap);
    // Slide only when the active key moves within the same list; jump into
    // place on first render, list rebuilds and resize re-places. Items are
    // often inline literals, so key — not reference — identity decides.
    const prevKey = prevActiveKeyRef.current;
    const animate =
      lastGeometryRef.current !== null &&
      prevKey !== undefined &&
      prevKey !== mergedActiveKey &&
      currentItems.some((i) => i.key === prevKey);
    prevActiveKeyRef.current = mergedActiveKey;
    // Skip writes when the target hasn't moved: rewriting the same values
    // would set transition: 'none' and cut a slide that is still in flight
    // (placeThumb re-runs on every parent render for inline item literals).
    if (
      lastGeometryRef.current?.top === top &&
      lastGeometryRef.current?.height === height
    ) {
      return;
    }
    lastGeometryRef.current = { top, height };
    const slideTransition =
      'top 0.28s cubic-bezier(0.22, 0.61, 0.36, 1), height 0.28s cubic-bezier(0.22, 0.61, 0.36, 1)';
    thumb.style.transition = animate ? slideTransition : 'none';
    thumb.style.top = `${top}px`;
    thumb.style.height = `${height}px`;
  }, [slideIndicator, prefixCls, currentItems, mergedActiveKey]);

  // Latest ref so the ResizeObserver below stays subscribed for the
  // component's lifetime. Re-observing on every render fires an initial
  // ResizeObserver callback in the same frame as an animated placement —
  // after the layout effect but before paint — overwriting the slide
  // transition with a jump (the bar would teleport instead of sliding).
  useLayoutEffect(() => {
    placeThumbRef.current = placeThumb;
    placeThumb();
  }, [placeThumb]);

  // Re-position when the wrapper resizes (e.g. titles rewrapping)
  useEffect(() => {
    if (!slideIndicator || typeof ResizeObserver === 'undefined') return;
    const wrapper = contentWrapperRef.current;
    if (!wrapper) return;
    const observer = new ResizeObserver(() => placeThumbRef.current());
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [slideIndicator]);

  const contextValue: AnchorContextType = {
    prefixCls,
    activeKey: mergedActiveKey,
    onClick: handleItemClick,
    classNames,
    styles,
  };

  const renderNavArrow = () => {
    if (!affix || direction !== 'vertical') return null;

    return (
      <div className={`${prefixCls}-nav-arrow`}>
        <span className={`${prefixCls}-arrow-icon`}>
          <ChevronLeft size={18} />
        </span>
      </div>
    );
  };

  return (
    <div {...rest} className={cls} style={style} ref={setAnchorRootRef}>
      {renderNavArrow()}
      <AnchorContext.Provider value={contextValue}>
        <div
          className={`${prefixCls}-content-wrapper`}
          ref={contentWrapperRef}
        >
          <ul
            className={clsx(`${prefixCls}-content`, classNames?.content)}
            style={styles?.content}
          >
            {currentItems.map((item) => (
              <AnchorItem
                key={item.key}
                targetKey={item.key}
                title={item.title}
                status={item.status}
                className={classNames?.item}
                style={styles?.item}
              />
            ))}
            {children}
          </ul>
          {slideIndicator && (
            <div
              className={`${prefixCls}-thumb`}
              ref={thumbRef}
              aria-hidden="true"
            />
          )}
        </div>
      </AnchorContext.Provider>
    </div>
  );
});

Anchor.displayName = 'Anchor';

export default Anchor;
