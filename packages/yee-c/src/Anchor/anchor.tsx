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
import debounce from '../utils/debounce';
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

  // Auto-generate anchor list from DOM
  const generateAnchorList = useCallback(() => {
    if (!auto || !name) return;

    const list: Array<AnchorItemType> = [];
    const elements = document.querySelectorAll(`[data-anchor-group="${name}"]`);

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

    for (let i = currentItems.length - 1; i >= 0; i--) {
      const item = currentItems[i];
      const target = document.getElementById(item.key);

      if (target) {
        const targetTop = target.offsetTop;
        if (scrollTop + offsetTop >= targetTop) {
          setMergedActiveKey(item.key);
          onChange?.(item.key);
          break;
        }
      }
    }
  }, [auto, anchorList, items, offsetTop, onChange]);

  useEffect(() => {
    const container = getContainer ? getContainer() : window;
    containerRef.current = container;

    if (container && typeof activeKey === 'undefined') {
      const debouncedScroll = debounce(handleScroll, 100);
      container.addEventListener('scroll', debouncedScroll as EventListener);
      handleScroll();

      return () => {
        container.removeEventListener(
          'scroll',
          debouncedScroll as EventListener,
        );
      };
    }
  }, [getContainer, handleScroll, activeKey]);

  // Scroll to target when activeKey changes
  const scrollToAnchor = useCallback(
    (key: string) => {
      const target = document.getElementById(key);
      if (!target) return;

      const container = containerRef.current;
      if (!container) return;

      const targetTop = target.offsetTop - offsetTop;

      if (container === window) {
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      } else {
        (container as HTMLElement).scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      }
    },
    [offsetTop],
  );

  useLayoutEffect(() => {
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
