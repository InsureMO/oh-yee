import clsx from 'clsx';
import { ChevronLeft } from 'lucide-react';
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
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
    offsetTop = 0,
    getContainer,
    onChange,
    ...rest
  } = props;

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
  const navigationSettleTimeoutRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

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
      container.removeEventListener('keydown', onUserInterrupt as EventListener);
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
    }, [
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
    },
    className,
  );

  const currentItems = auto ? anchorList : items;

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
        <div className={`${prefixCls}-content-wrapper`}>
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
        </div>
      </AnchorContext.Provider>
    </div>
  );
});

Anchor.displayName = 'Anchor';

export default Anchor;
