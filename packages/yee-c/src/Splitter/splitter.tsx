import clsx from 'clsx';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import SplitterHandler from './splitter-handler';

import type { SplitterItemProps, SplitterProps } from './interface';
import './style/index.less';

type SplitterWrapperCtxType = {
  refs: { [key: string]: any };
};

type SplitterCtxType = {
  prefixCls: string;
  onResize?: (sizes: number[]) => void;
};

export const SplitterWrapperCtx = React.createContext<SplitterWrapperCtxType>({
  refs: {},
});

export const SplitterCtx = React.createContext<SplitterCtxType>({
  prefixCls: '',
});

export type PanelRect = {
  type: 'default' | 'percent' | 'auto';
  size: number;
  currentSize: number;
  min?: string | number;
  max?: string | number;
};

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
  const count = React.Children.count(children);

  let remainingSize = totalSize;
  let remainingItem = count;

  React.Children.forEach(children, (child) => {
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
        item.size = remainingSize / remainingItem;
        item.currentSize = item.size;
      }
    });
  }

  return panelsRect;
};

const Wrapper = ({ children, itemsSize, onClick, ...props }: any) => {
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
  const arr = React.Children.toArray(children);

  React.Children.forEach(children, (child, index) => {
    const n = index + 1;
    const { style } = child.props || {};
    let currentSize;
    let min = undefined;
    let max = undefined;
    if (itemsSize && itemsSize[index]) {
      ({ currentSize, min, max } = itemsSize[index]);
    }

    wrappered.push(
      React.cloneElement(child, {
        style: {
          ...style, // If there is a border or other size-related design, it may cause calculation issues
          flexBasis: currentSize,
        },
        min,
        max,
        index: n,
        key: n,
        ref: (el: HTMLDivElement) => {
          refs.current[`item${n}`] = {
            el: el,
            props: child.props,
            size: { min, max },
          };
        },
      }),
    );
    const next = arr[index + 1];

    if (!next || !React.isValidElement(next)) {
      return;
    }

    const { flexable, expandable } = child.props || {};
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
        key={`handler-${n}`}
      />,
    );
  });

  return (
    <SplitterWrapperCtx.Provider value={{ refs }}>
      {wrappered}
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
      ...rest
    } = props;

    const internalRef = useRef<HTMLDivElement>(null);

    const componentRef = (ref as any) || internalRef;

    const [records, setRecords] = useState<PanelRect[]>([]);

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

    React.useEffect(() => {
      if (totalSize) {
        const panelsSize = getPanelSize(children, {
          totalSize: totalSize,
          layout,
        });
        setRecords(panelsSize);
      }
    }, [children, totalSize, layout]);

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
