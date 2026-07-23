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
  const activeKeyRef = useRef(mergedActiveKey);
  useEffect(() => {
    activeKeyRef.current = mergedActiveKey;
  }, [mergedActiveKey]);

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

  // Handle scroll to update active key
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

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

    if (nextActiveKey && activeKeyRef.current !== nextActiveKey) {
      setMergedActiveKey(nextActiveKey);
      onChange?.(nextActiveKey);
    }
  }, [auto, anchorList, items, offsetTop, onChange, getTargetOffsetTop]);

  useEffect(() => {
    // Resolve in a passive effect: parent-owned refs passed via `getContainer`
    // aren't attached until after child layout effects run.
    const container = getContainer ? getContainer() : window;
    containerRef.current = container;
    if (!container) return;

    // rAF throttle so the active key tracks scroll live.
    let rafId: ReturnType<typeof requestAnimationFrame> | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        handleScroll();
      });
    };
    container.addEventListener('scroll', onScroll as EventListener);
    handleScroll();

    return () => {
      container.removeEventListener('scroll', onScroll as EventListener);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [getContainer, handleScroll]);

  // Scroll to target when activeKey changes
  const scrollToAnchor = useCallback(
    (key: string) => {
      const target = document.getElementById(key);
      if (!target) return;

      const container = containerRef.current;
      if (!container) return;

      const targetTop = getTargetOffsetTop(target) - offsetTop;

      if (container === window) {
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      } else {
        (container as HTMLElement).scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      }
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
      setMergedActiveKey(key);
      scrollToAnchor(key);
      onChange?.(key);
    },
    [scrollToAnchor, onChange],
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
    <div {...rest} className={cls} style={style} ref={ref}>
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
