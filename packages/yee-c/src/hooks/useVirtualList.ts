import React, { useEffect, useRef, useState } from 'react';
import useEvent from './useEvent';
import useResizeObserver from './useResizeObserver';

export interface UseVirtualListOptions {
  /**
   * Total number of items in the list.
   */
  itemCount: number;
  /**
   * Fixed height of every item in pixels.
   */
  itemHeight: number;
  /**
   * Extra items rendered above and below the visible window
   * to avoid white flashes while scrolling.
   * @default 4
   */
  overscan?: number;
}

export interface UseVirtualListResult {
  /**
   * Inclusive start index of the render window (already includes overscan).
   */
  start: number;
  /**
   * Exclusive end index of the render window (already includes overscan).
   */
  end: number;
  /**
   * Vertical offset to apply to the rendered block, equal to `start * itemHeight`.
   * Use it as `transform: translateY(offsetY)` or `top: offsetY`.
   */
  offsetY: number;
  /**
   * Total scrollable height, equal to `itemCount * itemHeight`.
   * Apply it to the inner spacer element so the scrollbar matches the full list.
   */
  totalHeight: number;
  /**
   * Ref to bind to the scroll container element.
   */
  viewportRef: React.RefObject<HTMLDivElement | null>;
  /**
   * Stable scroll handler (rAF-throttled). Bind to the viewport's `onScroll`.
   */
  onScroll: () => void;
  /**
   * Scroll the viewport so that the item at `index` is visible.
   * Used by keyboard navigation to replace `scrollIntoView`.
   */
  scrollToIndex: (index: number) => void;
}

/**
 * Fixed-height virtual scrolling hook.
 *
 * Renders only the items inside the visible window (plus an `overscan` buffer)
 * and keeps the DOM node count constant regardless of `itemCount`.
 *
 * Usage:
 *   const { start, end, offsetY, totalHeight, viewportRef, onScroll, scrollToIndex } =
 *     useVirtualList({ itemCount, itemHeight });
 *
 *   <div ref={viewportRef} onScroll={onScroll} style={{ maxHeight: 200, overflowY: 'auto' }}>
 *     <div style={{ height: totalHeight, position: 'relative' }}>
 *       {items.slice(start, end).map((it, i) => (
 *         <div key={it.key} style={{ position: 'absolute', height: itemHeight, transform: `translateY(${offsetY + i * itemHeight}px)` }}>
 *           {it.content}
 *         </div>
 *       ))}
 *     </div>
 *   </div>
 */
export default function useVirtualList({
  itemCount,
  itemHeight,
  overscan = 4,
}: UseVirtualListOptions): UseVirtualListResult {
  const [scrollTop, setScrollTop] = useState(0);
  const [visibleHeight, setVisibleHeight] = useState(0);
  const rafRef = useRef<number | null>(null);

  // useResizeObserver owns its ref; we reuse it as the viewport ref so the
  // scroll container and the measured element are the same node.
  const { ref: viewportRef } = useResizeObserver<HTMLDivElement>((entries) => {
    const entry = entries[0];
    if (!entry) return;
    const h = entry.contentRect.height;
    setVisibleHeight((prev) => (prev === h ? prev : h));
  });

  const totalHeight = itemCount * itemHeight;

  // Read the live scrollTop / clientHeight from the viewport node.
  const readViewport = useEvent(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const top = viewport.scrollTop;
    const h = viewport.clientHeight;
    setScrollTop((prev) => (prev === top ? prev : top));
    setVisibleHeight((prev) => (prev === h ? prev : h));
  });

  const onScroll = useEvent(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      readViewport();
    });
  });

  useEffect(
    () => () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    },
    [],
  );

  // Measure once on mount (ResizeObserver fires shortly after, this covers the first frame).
  useEffect(() => {
    readViewport();
  }, [readViewport]);

  // Keep scrollTop within bounds when the data shrinks (e.g. after filtering),
  // otherwise the viewport would sit at an offset with empty space below.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScroll = Math.max(0, totalHeight - viewport.clientHeight);
    if (viewport.scrollTop > maxScroll) {
      viewport.scrollTop = maxScroll;
      setScrollTop(maxScroll);
    }
  }, [totalHeight, viewportRef]);

  const scrollToIndex = useEvent((index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScroll = Math.max(0, totalHeight - viewport.clientHeight);
    const target = Math.min(Math.max(0, index * itemHeight), maxScroll);
    if (viewport.scrollTop !== target) {
      viewport.scrollTop = target;
    }
    readViewport();
  });

  // Fallback for the first paint before ResizeObserver reports a height,
  // so we still render at least one screen + buffer.
  const effectiveVisibleHeight = visibleHeight || itemHeight;
  const visibleCount = Math.ceil(effectiveVisibleHeight / itemHeight);

  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const end = Math.min(itemCount, start + visibleCount + overscan * 2);
  const offsetY = start * itemHeight;

  return {
    start,
    end,
    offsetY,
    totalHeight,
    viewportRef,
    onScroll,
    scrollToIndex,
  };
}
