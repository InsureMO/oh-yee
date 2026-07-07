import clsx from 'clsx';
import React, {
  createContext,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import useVirtualList from '../hooks/useVirtualList';
import { useLocale } from '../locale';
import type { OptionsContextValue, OptionsProps } from './interface';
import Option from './option';

export const OptionsCtx = createContext<OptionsContextValue>(
  {} as OptionsContextValue,
);

const Options = forwardRef<HTMLDivElement, OptionsProps>(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const { locale } = useLocale();
    const { select } = locale;

    const {
      prefixCls,
      options,
      popupClassName,
      popupStyle,
      selectedKeys,
      focusedKey,
      dataTestId,
      multiple,
      virtual,
      itemHeight = 32,
      listHeight = 200,
      virtualApiRef,
      onSelect,
      ...rest
    } = props;

    const rootRef = useRef<HTMLDivElement | null>(null);
    // Forward the popup root element to the parent (Select uses it as the
    // keyboard-nav containerRef) while keeping a stable RefObject for the
    // effects below.
    useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, []);

    // Hook is always called (rules of hooks). When `virtual` is off the
    // returned viewportRef is never attached, so the observer stays idle.
    const {
      start,
      end,
      offsetY,
      totalHeight,
      viewportRef,
      onScroll,
      scrollToIndex,
    } = useVirtualList({
      itemCount: options.length,
      itemHeight,
    });

    // Expose the virtual scroll API to the parent so keyboard navigation
    // can drive the virtual viewport (replaces scrollIntoView).
    useEffect(() => {
      if (!virtual || !virtualApiRef) return;
      virtualApiRef.current = { scrollToIndex };
      return () => {
        if (virtualApiRef.current) {
          virtualApiRef.current = null;
        }
      };
    }, [virtual, virtualApiRef, scrollToIndex]);

    // Reset the scroll position whenever the option set changes (e.g. after
    // filtering via search), otherwise the viewport may sit at an offset
    // where none of the new results are visible.
    useEffect(() => {
      if (virtual) {
        scrollToIndex(0);
      }
    }, [options, virtual, scrollToIndex]);

    // Bring the focused option into view on open and whenever it changes.
    //   - virtual mode: drive the virtual viewport via scrollToIndex.
    //   - default mode: scrollIntoView on the option's DOM node.
    // Options owns this (rather than the keyboard hook) so it also covers the
    // initial open, where the keyboard effect can fire before the popup is
    // mounted / the virtual API ref is wired up.
    useEffect(() => {
      if (options.length === 0) return;
      if (focusedKey === '') return;
      const focusedIndex = options.findIndex((o) => o.value === focusedKey);
      if (focusedIndex < 0) return;

      if (virtual) {
        scrollToIndex(focusedIndex);
        return;
      }

      const container = rootRef.current;
      if (!container) return;
      const optionElements = container.querySelectorAll('[role="option"]');
      const targetElement = optionElements[focusedIndex] as
        | HTMLElement
        | undefined;
      if (targetElement) {
        targetElement.scrollIntoView({ block: 'nearest' });
      }
    }, [focusedKey, virtual, options, scrollToIndex, rootRef]);

    const isEmpty = options.length === 0;
    const ctxValue = {
      prefixCls,
      selectedKeys,
      focusedKey,
      multiple,
      onSelect,
    };

    // ----- Virtual mode: only render the visible window -----
    if (virtual && !isEmpty) {
      const visibleOptions = options.slice(start, end);
      return (
        <div
          {...rest}
          className={clsx(
            `${prefixCls}-popup`,
            `${prefixCls}-popup-virtual`,
            popupClassName,
          )}
          style={popupStyle}
          ref={rootRef}
          tabIndex={-1}
        >
          <OptionsCtx.Provider value={ctxValue}>
            <div
              className={`${prefixCls}-popup-viewport`}
              ref={viewportRef}
              onScroll={onScroll}
              style={{ maxHeight: listHeight, overflowY: 'auto' }}
            >
              <div style={{ height: totalHeight, position: 'relative' }}>
                {visibleOptions.map((option, i) => (
                  <Option
                    {...option}
                    key={option.value}
                    dataTestId={`${dataTestId}-${start + i}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: itemHeight,
                      transform: `translateY(${offsetY + i * itemHeight}px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </OptionsCtx.Provider>
        </div>
      );
    }

    // ----- Default mode: render every option (unchanged behavior) -----
    return (
      <div
        {...rest}
        className={clsx(`${prefixCls}-popup`, popupClassName)}
        style={popupStyle}
        ref={rootRef}
        tabIndex={-1}
      >
        {isEmpty ? (
          <div className={`${prefixCls}-empty`}>{select.noData}</div>
        ) : (
          <OptionsCtx.Provider value={ctxValue}>
            {options.map((option, index: number) => (
              <Option
                {...option}
                key={option.value}
                dataTestId={`${dataTestId}-${index}`}
              />
            ))}
          </OptionsCtx.Provider>
        )}
      </div>
    );
  },
);

export default Options;
