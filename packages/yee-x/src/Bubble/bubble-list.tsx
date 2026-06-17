import clsx from 'clsx';
import React, {
  createContext,
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import Bubble from './bubble';

import { BubbleListProps } from './interface';

let observer: MutationObserver;

export const BubbleListCtx = createContext({} as any);

const BubbleList: FC<BubbleListProps> = (props) => {
  const {
    items,
    prefixCls = 'yee-bubble-list',
    className,
    autoScroll = true,
    roles,
    parser,
    render,
    ...rest
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  //   Watch for scrollHeight changes on the element
  useLayoutEffect(() => {
    const ele = ref.current;
    if (ele && autoScroll) {
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'childList' ||
            mutation.type === 'characterData'
          ) {
            ele.scrollTop = ele.scrollHeight;
          }
        });
      });

      observer.observe(ele, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [ref.current]);

  useEffect(() => {
    let prevTop = 0;
    const ele = ref.current as HTMLDivElement;
    const scroll = () => {
      const currTop = ele.scrollTop;
      if (currTop < prevTop) {
        observer?.disconnect();
      }
      if (Math.ceil(currTop) >= ele.scrollHeight - ele.clientHeight) {
        observer.observe(ele, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      }
      prevTop = currTop;
    };
    if (ref.current) {
      ref.current.addEventListener('scroll', scroll);

      return () => {
        ref.current?.removeEventListener('scroll', scroll);
      };
    }
  }, []);

  return (
    <div {...rest} className={clsx(`${prefixCls}`, className)} ref={ref}>
      <BubbleListCtx.Provider value={{ parser }}>
        {items.map((item, index) => {
          const roleInfo = roles ? roles[item.role || ''] : {};
          const roleKeys = Object.keys(roles || {});
          const rendered = render?.(item);
          if (rendered) {
            return rendered;
          }
          if (roleKeys.includes(item?.role || '')) {
            return (
              <Bubble
                {...roleInfo}
                {...item}
                item={item}
                latest={index === items.length - 1}
                key={item.key || index}
              />
            );
          }
          return null;
        })}
      </BubbleListCtx.Provider>
    </div>
  );
};

export default BubbleList;
