import clsx from 'clsx';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import SplitterHandler from './splitter-handler';

import type { PanelRect, SplitterItemProps, SplitterProps } from './interface';
import './style/index.less';

type SplitterWrapperCtxType = {
  refs: { [key: string]: any };
};

type SplitterCtxType = {
  prefixCls: string;
  onResize?: (sizes: PanelRect[]) => void;
};

export const SplitterWrapperCtx = React.createContext<SplitterWrapperCtxType>({
  refs: {},
});

export const SplitterCtx = React.createContext<SplitterCtxType>({
  prefixCls: '',
});

const getPanelSize = (
  children: React.ReactNode,
  {
    totalSize,
    layout,
  }: {
    totalSize: number;
    layout: 'horizontal' | 'vertical';
  },
) => {
  const panelsRect = [] as PanelRect[];
  // toArray 剔除 null/undefined/boolean（如 `{open ? <Item/> : null}` 条件面板）。
  // Children.count 会把 null 也计为一面板，导致 auto 面板被平分出错误尺寸。
  const items = React.Children.toArray(children);
  const count = items.length;

  let remainingSize = totalSize;
  let remainingItem = count;

  items.forEach((child) => {
    if (React.isValidElement(child)) {
      const { style, size, defaultSize, min, max } = child.props || ({} as any);

      const styleSize = style
        ? layout === 'horizontal'
          ? style.width
          : style.height
        : undefined;

      const mergedSize = size || defaultSize || styleSize;

      let item = {} as Omit<PanelRect, 'currentSize' | 'size'> & {
        size?: number;
      };

      if (typeof mergedSize === 'number') {
        item = {
          type: 'default',
          size: mergedSize,
        };
      } else if (typeof mergedSize === 'string') {
        if (mergedSize.endsWith('%')) {
          item = {
            type: 'percent',
            size: parseFloat(mergedSize) / 100,
          };
        } else {
          item = {
            type: 'default',
            size: parseFloat(mergedSize),
          };
        }
      } else {
        item = {
          type: 'auto',
        };
      }

      if (min) {
        if (typeof min === 'number') {
          item.min = min;
        } else if (typeof min === 'string') {
          const _min = parseFloat(min);
          if (min.endsWith('%')) {
            item.min = (_min / 100) * totalSize;
          } else {
            item.min = _min;
          }
        }
      }

      if (max) {
        if (typeof max === 'number') {
          item.max = max;
        } else if (typeof max === 'string') {
          const _max = parseFloat(max);
          if (max.endsWith('%')) {
            item.max = (_max / 100) * totalSize;
          } else {
            item.max = _max;
          }
        }
      }

      panelsRect.push(item as PanelRect);
    }
  });

  panelsRect.forEach((item) => {
    if (item.type === 'default') {
      // currentSize 缺失会导致 Wrapper 注入的 flexBasis 为空，defaultSize 失效（宽度由内容撑开）
      item.currentSize = item.size;
      remainingSize -= item.size || 0;
      remainingItem--;
    } else if (item.type === 'percent') {
      item.size = totalSize * (item.size || 1);
      item.currentSize = item.size;
      remainingSize -= item.size;
      remainingItem--;
    }
  });

  if (remainingItem > 0) {
    panelsRect.forEach((item) => {
      if (item.type === 'auto') {
        // 显式尺寸总和超出 totalSize 时 remainingSize 为负，负 flexBasis 会被浏览器丢弃导致面板回退内容尺寸
        item.size = Math.max(0, remainingSize / remainingItem);
        item.currentSize = item.size;
      }
    });
  }

  return panelsRect;
};

const Wrapper = ({
  children,
  itemsSize,
  itemTransition,
  animation,
  onDraggingChange,
  onClick,
  ...props
}: any) => {
  const wrappered = [] as React.ReactElement[];
  const refs = useRef<
    Record<
      string,
      {
        el: HTMLDivElement;
        props: SplitterItemProps;
        size: { min: number; max: number };
      }
    >
  >({});
  // 与 getPanelSize 同口径：toArray 剔除 null，index/handler 判断不受条件渲染干扰
  const arr = React.Children.toArray(children);

  arr.forEach((child, index) => {
    if (React.isValidElement(child)) {
      const n = index + 1;
      const { style } = child.props || ({} as any);
      let currentSize;
      let min = undefined;
      let max = undefined;
      if (itemsSize && itemsSize[index]) {
        ({ currentSize, min, max } = itemsSize[index]);
      }

      wrappered.push(
        React.cloneElement(child, {
          // @ts-ignore
          style: {
            ...style, // If there is a border or other size-related design, it may cause calculation issues
            flexBasis: currentSize,
            // animation 模式下受控尺寸变更走 flex-basis 过渡；拖拽期间为 undefined 保证跟手
            transition: itemTransition,
          },
          min,
          max,
          index: n,
          key: n,
          ref: (el: HTMLDivElement) => {
            refs.current[`item${n}`] = {
              el: el,
              props: child.props as SplitterItemProps,
              size: { min, max },
            };
          },
        }),
      );

      const next = arr[index + 1];

      if (!next || !React.isValidElement(next)) {
        return;
      }

      const { flexable, expandable } = child.props || ({} as any);
      const { expandable: nextExpandable } = next.props || ({} as any);

      const _expandable = { start: false, end: false };

      if (expandable) {
        _expandable.start = true;
      }

      if (nextExpandable) {
        _expandable.end = true;
      }

      wrappered.push(
        <SplitterHandler
          {...props}
          index={n}
          flexable={flexable}
          expandable={_expandable}
          onClick={onClick}
          onDraggingChange={onDraggingChange}
          key={`handler-${n}`}
        />,
      );
    }
  });

  // ── 出场动画：children 数量减少（条件渲染的面板卸载）时，保留上一次渲染的
  // 尾部面板克隆，flex-basis 过渡到 0 后再真正移除，避免右栏瞬间消失导致跳变。
  const prevCountRef = React.useRef(arr.length);
  const prevClonesRef = React.useRef<React.ReactElement[]>([]);
  const [exiting, setExiting] = React.useState<React.ReactElement<any>[]>([]);

  React.useEffect(() => {
    const prevCount = prevCountRef.current;
    prevCountRef.current = arr.length;
    if (!animation || arr.length >= prevCount) {
      return;
    }
    // 上一帧克隆里已带原 flex-basis（本帧 records 已不含被移除面板）
    const removed = prevClonesRef.current.slice(arr.length);
    if (!removed.length) {
      return;
    }
    setExiting(removed);
    // 第二阶段：下一帧 flex-basis 归 0，触发过渡
    const raf = requestAnimationFrame(() => {
      setExiting((list) =>
        list.map((el) => React.cloneElement(el, { style: { ...el.props.style, flexBasis: 0 } })),
      );
    });
    const timer = window.setTimeout(() => setExiting([]), 320);
    return () => {
      // 过渡期间面板重新打开：立即丢弃残留克隆
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      setExiting([]);
    };
  }, [arr.length, animation]);

  // 记录本帧克隆，供下一次渲染的移除检测读取（声明在其后：上方 effect 读到的是旧值）
  React.useEffect(() => {
    prevClonesRef.current = wrappered;
  });

  return (
    <SplitterWrapperCtx.Provider value={{ refs }}>
      {wrappered}
      {exiting}
    </SplitterWrapperCtx.Provider>
  );
};

const Splitter = React.forwardRef(
  (baseprops: SplitterProps, ref: React.Ref<HTMLDivElement>) => {
    const { splitter } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, splitter);
    const {
      prefixCls = 'yee-splitter',
      className,
      layout = 'horizontal',
      children,
      bordered,
      onResize,
      animation,
      ...rest
    } = props;

    const internalRef = useRef<HTMLDivElement>(null);

    const componentRef = (ref as any) || internalRef;

    const [records, setRecords] = useState<PanelRect[]>([]);

    // animation 模式：拖拽期间关掉面板的 flex-basis 过渡（onMove 直接写 DOM，过渡会导致跟不
    // 上鼠标）；其余程序性尺寸变更（受控 size、collapsible 收展、面板增减）都走过渡。
    const [dragging, setDragging] = React.useState(false);
    const itemTransition = animation
      ? dragging
        ? undefined
        : 'flex-basis 0.28s cubic-bezier(0.22, 0.61, 0.36, 1)'
      : undefined;

    const handleClick = (index: number, action: 'expand' | 'collapse') => {
      const c = index - 1;

      const newRecords = [...records];
      const prev = newRecords[c];
      const curr = newRecords[index];
      if (action === 'collapse') {
        const ps = prev.currentSize;
        prev.currentSize -= curr.currentSize ? ps : curr.size;
        curr.currentSize += curr.currentSize ? ps : curr.size;
      } else {
        const cs = curr.currentSize;
        curr.currentSize -= prev.currentSize ? cs : prev.size;
        prev.currentSize += prev.currentSize ? cs : prev.size;
      }
      setRecords(newRecords);
    };

    const cls = clsx(
      prefixCls,
      [`${prefixCls}-${layout}`],
      {
        [`${prefixCls}-bordered`]: bordered,
      },
      className,
    );

    const [totalSize, setTotalSize] = React.useState(0);

    const updateTotalSize = (ele: HTMLDivElement) => {
      if (layout === 'horizontal') {
        setTotalSize(ele.offsetWidth);
      } else {
        setTotalSize(ele.offsetHeight);
      }
    };

    useEffect(() => {
      if (componentRef.current) {
        const ele = componentRef.current;
        updateTotalSize(ele);

        const observe = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.target === ele) {
              updateTotalSize(ele);
            }
          });
        });

        observe.observe(ele);

        return () => {
          observe.disconnect();
        };
      }
    }, [layout]);

    const prevPanelCountRef = React.useRef(-1);

    React.useEffect(() => {
      if (totalSize) {
        const panelsSize = getPanelSize(children, {
          totalSize: totalSize,
          layout,
        });
        // animation 模式下面板新增（条件渲染的面板挂载）时先以 0 尺寸入库，下一帧再落到
        // 目标尺寸，配合 flex-basis 过渡播放入场动画；否则新面板瞬间撑开、旧面板瞬间收窄。
        const prevCount = prevPanelCountRef.current;
        prevPanelCountRef.current = panelsSize.length;
        if (animation && prevCount >= 0 && panelsSize.length > prevCount) {
          panelsSize.slice(prevCount).forEach((item) => {
            item.currentSize = 0;
          });
          setRecords(panelsSize);
          const raf = requestAnimationFrame(() => {
            setRecords(getPanelSize(children, { totalSize: totalSize, layout }));
          });
          return () => cancelAnimationFrame(raf);
        }
        setRecords(panelsSize);
      }
    }, [children, totalSize, layout, animation]);

    return (
      <div className={cls} {...rest} ref={componentRef}>
        <SplitterCtx.Provider value={{ prefixCls, onResize }}>
          <Wrapper
            layout={layout}
            records={records}
            setRecords={setRecords}
            totalSize={totalSize}
            itemsSize={records}
            onClick={handleClick}
            animation={animation}
            itemTransition={itemTransition}
            onDraggingChange={setDragging}
          >
            {children}
          </Wrapper>
        </SplitterCtx.Provider>
      </div>
    );
  },
);

Splitter.displayName = 'Splitter';

export default Splitter;
