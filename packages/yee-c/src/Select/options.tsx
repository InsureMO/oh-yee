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
      columns = 1,
      looseMatch = false,
      onSelect,
      ...rest
    } = props;

    const multiColumn = columns > 1;

    const rootRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, []);

    // In multi-column virtual mode, each "row" contains `columns` options.
    // The virtual list tracks rows, not individual options.
    const rowCount = multiColumn
      ? Math.ceil(options.length / columns)
      : options.length;

    const {
      start,
      end,
      offsetY,
      totalHeight,
      viewportRef,
      onScroll,
      scrollToIndex,
    } = useVirtualList({
      itemCount: virtual ? rowCount : 0,
      itemHeight,
    });

    // Expose the virtual scroll API to the parent.
    // In multi-column mode, the parent passes a flat option index, so we
    // convert it to a row index before scrolling.
    useEffect(() => {
      if (!virtual || !virtualApiRef) return;
      virtualApiRef.current = {
        scrollToIndex: (flatIndex: number) => {
          const rowIndex = multiColumn
            ? Math.floor(flatIndex / columns)
            : flatIndex;
          scrollToIndex(rowIndex);
        },
      };
      return () => {
        if (virtualApiRef.current) {
          virtualApiRef.current = null;
        }
      };
    }, [virtual, virtualApiRef, scrollToIndex, multiColumn, columns]);

    // Reset scroll position when options change.
    useEffect(() => {
      if (virtual) {
        scrollToIndex(0);
      }
    }, [options, virtual, scrollToIndex]);

    // Bring the focused option into view.
    useEffect(() => {
      if (options.length === 0) return;
      if (focusedKey === '') return;
      const focusedIndex = options.findIndex((o) => o.value === focusedKey);
      if (focusedIndex < 0) return;

      if (virtual) {
        const rowIndex = multiColumn
          ? Math.floor(focusedIndex / columns)
          : focusedIndex;
        scrollToIndex(rowIndex);
        return;
      }

      const container = rootRef.current;
      if (!container) return;
      const optionElements = container.querySelectorAll('[role="option"]');
      const targetElement = optionElements[focusedIndex] as
        | HTMLElement
        | undefined;
      if (targetElement) {
        // Use manual scroll calculation instead of scrollIntoView to avoid
        // scrolling the entire page (the popup is rendered in a portal).
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        if (targetRect.bottom > containerRect.bottom) {
          container.scrollTop +=
            targetRect.bottom - containerRect.bottom;
        } else if (targetRect.top < containerRect.top) {
          container.scrollTop -= containerRect.top - targetRect.top;
        }
      }
    }, [focusedKey, virtual, options, scrollToIndex, rootRef, multiColumn, columns]);

    const isEmpty = options.length === 0;
    const ctxValue = {
      prefixCls,
      selectedKeys,
      focusedKey,
      multiple,
      looseMatch,
      onSelect,
    };

    // ----- Virtual + multi-column: render rows of N options -----
    if (virtual && multiColumn && !isEmpty) {
      const visibleRows = [];
      for (let rowIdx = start; rowIdx < end; rowIdx++) {
        const rowOptions = [];
        for (let col = 0; col < columns; col++) {
          const flatIdx = rowIdx * columns + col;
          if (flatIdx < options.length) {
            rowOptions.push({ option: options[flatIdx], flatIdx });
          }
        }
        visibleRows.push({ rowIdx, rowOptions });
      }

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
                {visibleRows.map(({ rowIdx, rowOptions }, ri) => (
                  <div
                    key={rowIdx}
                    className={`${prefixCls}-popup-grid-row`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: itemHeight,
                      transform: `translateY(${offsetY + ri * itemHeight}px)`,
                      display: 'grid',
                      gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    }}
                  >
                    {rowOptions.map(({ option, flatIdx }) => (
                      <Option
                        {...option}
                        key={option.value}
                        dataTestId={`${dataTestId}-${flatIdx}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </OptionsCtx.Provider>
        </div>
      );
    }

    // ----- Virtual single-column: render visible window -----
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

    // ----- Default mode (non-virtual) -----
    return (
      <div
        {...rest}
        className={clsx(
          `${prefixCls}-popup`,
          { [`${prefixCls}-popup-grid`]: multiColumn },
          popupClassName,
        )}
        style={{
          ...popupStyle,
          ...(multiColumn
            ? { '--yee-select-columns': columns } as React.CSSProperties
            : undefined),
        }}
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
