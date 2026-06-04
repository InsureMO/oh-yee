import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import type { WheelColumn as WheelColumnType } from './interface';

export interface WheelColumnProps {
  column: WheelColumnType;
  selectedIndex: number;
  onChange?: (index: number) => void;
  itemHeight?: number;
  visibleItemCount?: number;
  prefixCls?: string;
}

const WheelColumn: FC<WheelColumnProps> = ({
  column,
  selectedIndex,
  onChange,
  itemHeight = 40,
  visibleItemCount = 5,
  prefixCls = 'yee-wheel-picker',
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scrolling, setScrolling] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isInternalRef = useRef(false);

  const paddingCount = Math.floor(visibleItemCount / 2);

  const scrollToIndex = useCallback(
    (index: number, smooth = true) => {
      const el = scrollerRef.current;
      if (!el) return;
      const top = (index + paddingCount) * itemHeight;
      el.scrollTo({ top, behavior: smooth ? 'smooth' : 'instant' });
    },
    [itemHeight, paddingCount],
  );

  // sync scroll position when selectedIndex changes from external source
  useEffect(() => {
    if (!scrolling && !isInternalRef.current) {
      // Delay one frame to ensure layout is complete (e.g. Drawer animation)
      requestAnimationFrame(() => {
        scrollToIndex(selectedIndex, false);
      });
    }
    isInternalRef.current = false;
  }, [selectedIndex, scrollToIndex, scrolling]);

  const paddingStyle = { height: paddingCount * itemHeight };

  // Calculate which item is at the viewport center
  const getIndexFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const rawIndex = Math.round(el.scrollTop / itemHeight) - paddingCount;
    return Math.max(0, Math.min(rawIndex, column.options.length - 1));
  }, [itemHeight, paddingCount, column.options.length]);

  const handleScroll = useCallback(() => {
    setScrolling(true);
    clearTimeout(scrollTimerRef.current);

    scrollTimerRef.current = setTimeout(() => {
      const index = getIndexFromScroll();
      console.log("index: ", index);
      setScrolling(false);
      isInternalRef.current = true;
      onChange?.(index);
    }, 150);
  }, [getIndexFromScroll, onChange]);

  return (
    <div
      ref={scrollerRef}
      className={`${prefixCls}-column`}
      onScroll={handleScroll}
    >
      <div style={paddingStyle} aria-hidden="true" />
      {column.options.map((opt, i) => (
        <div
          key={`${opt.value}-${i}`}
          className={`${prefixCls}-column-item`}
          style={{ height: itemHeight, lineHeight: `${itemHeight}px` }}
          onClick={() => {
            scrollToIndex(i);
            onChange?.(i);
          }}
        >
          {opt.label}
        </div>
      ))}
      <div style={paddingStyle} aria-hidden="true" />
    </div>
  );
};

export default WheelColumn;
