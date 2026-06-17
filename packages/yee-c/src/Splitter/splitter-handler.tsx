import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useContext, useRef } from 'react';
import useMove from './hooks/useMove';
import type { PanelRect } from './interface';
import { SplitterCtx, SplitterWrapperCtx } from './splitter';

interface SplitterHandlerProps {
  layout: 'horizontal' | 'vertical';
  resizable?: boolean;
  collapsible?: boolean | { start?: boolean; end?: boolean };
  index: number;
  records: PanelRect[];
  setRecords: React.Dispatch<React.SetStateAction<PanelRect[]>>;
  onClick: (
    index: number,
    action: 'collapse' | 'expand',
    size: { startSize: number; endSize: number },
    eles: { start: HTMLDivElement; end: HTMLDivElement },
  ) => void;
}

const SplitterHandler = ({
  layout,
  resizable = true,
  collapsible,
  index,
  records,
  setRecords,
  onClick,
}: SplitterHandlerProps) => {
  // eslint-disable-line @typescript-eslint/no-unused-vars
  const { start, end } = collapsible
    ? typeof collapsible === 'boolean'
      ? { start: true, end: true }
      : collapsible
    : ({} as any);
  const cref = useRef<HTMLDivElement>(null);
  const handler = useRef<HTMLDivElement | null>(null);
  const { refs } = useContext(SplitterWrapperCtx);
  const { prefixCls, onResize } = useContext(SplitterCtx);

  const status = records[index - 1] || {};
  const next = records[index] || {};

  const onMove = (dis: number) => {
    const eles = refs.current;
    const { el: start, size: startSize } = eles[`item${index}`];
    const { el: end, size: endSize } = eles[`item${index + 1}`];

    const s_c =
      layout === 'horizontal' ? start.clientWidth : start.clientHeight;
    const e_c = layout === 'horizontal' ? end.clientWidth : end.clientHeight;

    let s = s_c + dis;
    let e = e_c - dis;
    const total = s + e;
    if (startSize.min && s < startSize.min) {
      s = startSize.min;
      e = total - s;
    }

    if (startSize.max && s > startSize.max) {
      s = startSize.max;
      e = total - s;
    }

    if (endSize.min && e < endSize.min) {
      e = endSize.min;
      s = total - e;
    }

    if (endSize.max && e > endSize.max) {
      e = endSize.max;
      s = total - e;
    }

    start.style.flexBasis = `${s}px`;
    end.style.flexBasis = `${e}px`;

    setRecords((state: PanelRect[]) => {
      const newState = [...state];
      newState[index - 1] = {
        ...newState[index - 1],
        size: s,
        currentSize: s,
      };
      newState[index] = { ...newState[index], size: e, currentSize: e };
      onResize?.(newState);
      return newState;
    });
  };

  useMove(handler, layout, onMove);

  const handleClick = (action: 'collapse' | 'expand') => {
    const eles = refs.current;
    const { el: start } = eles[`item${index}`];
    const { el: end } = eles[`item${index + 1}`];
    const startSize =
      layout === 'horizontal' ? start.clientWidth : start.clientHeight;
    const endSize =
      layout === 'horizontal' ? end.clientWidth : end.clientHeight;

    onClick(index, action, { startSize, endSize }, { start, end });
  };

  return (
    <div
      className={clsx(`${prefixCls}-handler`, {
        [`${prefixCls}-handler-resizable`]: resizable,
      })}
      data-index={index}
      ref={cref}
    >
      <div
        className={`${prefixCls}-handler-dragger`}
        ref={resizable ? handler : undefined}
      ></div>
      {start && status.currentSize ? (
        <div
          className={`${prefixCls}-expand-start`}
          data-index={index}
          onClick={() => handleClick('collapse')}
        >
          <ChevronLeft />
        </div>
      ) : null}
      {end && next.currentSize ? (
        <div
          className={`${prefixCls}-expand-end`}
          data-index={index}
          onClick={() => handleClick('expand')}
        >
          <ChevronRight />
        </div>
      ) : null}
    </div>
  );
};

export default SplitterHandler;
