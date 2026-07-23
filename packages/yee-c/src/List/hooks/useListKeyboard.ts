import { useCallback, useEffect, useState } from 'react';
import type { ListItemProps } from '../interface';

interface UseListKeyboardParams {
  items: Array<ListItemProps>;
  /**
   * Number of columns in the grid layout.
   * Affects ArrowUp/Down (jump by columns) and ArrowLeft/Right behavior.
   * @default 1
   */
  columns?: number;
  /**
   * Controlled focused key from the parent.
   * When provided, the hook uses this value instead of internal state.
   */
  focusedKey?: string | number;
  /**
   * Callback when focused key changes.
   */
  onFocusChange?: (key: string | number) => void;
  /**
   * Callback when Enter is pressed on a focused item.
   */
  onClick?: (item: ListItemProps) => void;
}

export default function useListKeyboard({
  items,
  columns = 1,
  focusedKey: controlledFocusedKey,
  onFocusChange,
  onClick,
}: UseListKeyboardParams) {
  const [internalFocusedKey, setInternalFocusedKey] = useState<string | number>(
    '',
  );

  const isControlled = controlledFocusedKey !== undefined;
  const focusedKey = isControlled ? controlledFocusedKey : internalFocusedKey;

  const setFocusedKey = useCallback(
    (key: string | number) => {
      if (!isControlled) {
        setInternalFocusedKey(key);
      }
      onFocusChange?.(key);
    },
    [isControlled, onFocusChange],
  );

  // Reset internal focused key if it no longer exists in items
  useEffect(() => {
    if (
      !isControlled &&
      internalFocusedKey !== '' &&
      !items.some((item) => item.key === internalFocusedKey)
    ) {
      setInternalFocusedKey('');
    }
  }, [items, isControlled, internalFocusedKey]);

  const getFocusedIndex = (): number => {
    if (focusedKey === '' || focusedKey === undefined) return -1;
    return items.findIndex((item) => item.key === focusedKey);
  };

  const findNextEnabledIndex = (
    startIndex: number,
    direction: 1 | -1,
  ): number => {
    const count = items.length;
    if (count === 0) return -1;
    let next =
      direction === 1
        ? startIndex + 1 >= count
          ? 0
          : startIndex + 1
        : startIndex - 1 < 0
          ? count - 1
          : startIndex - 1;

    // Guard against infinite loop if all items are disabled
    let attempts = 0;
    while (items[next].disabled && attempts < count) {
      next =
        direction === 1
          ? next + 1 >= count
            ? 0
            : next + 1
          : next - 1 < 0
            ? count - 1
            : next - 1;
      attempts++;
    }
    return items[next].disabled ? -1 : next;
  };

  const handleArrowUp = () => {
    const focusedIndex = getFocusedIndex();
    let nextIndex: number;

    if (columns > 1) {
      if (focusedIndex === -1) {
        nextIndex = findNextEnabledIndex(items.length - 1, -1);
      } else {
        const target = focusedIndex - columns;
        if (target >= 0) {
          nextIndex = items[target].disabled
            ? findNextEnabledIndex(target, -1)
            : target;
        } else {
          // Wrap to last row, same column
          const lastRowStart =
            Math.floor((items.length - 1) / columns) * columns;
          const col = focusedIndex % columns;
          const wrapTarget = Math.min(lastRowStart + col, items.length - 1);
          nextIndex = items[wrapTarget]?.disabled
            ? findNextEnabledIndex(wrapTarget, -1)
            : wrapTarget;
        }
      }
    } else {
      if (focusedIndex === -1) {
        nextIndex = findNextEnabledIndex(items.length - 1, -1);
      } else {
        nextIndex = findNextEnabledIndex(focusedIndex, -1);
      }
    }

    if (nextIndex !== -1) {
      setFocusedKey(items[nextIndex].key);
    }
  };

  const handleArrowDown = () => {
    const focusedIndex = getFocusedIndex();
    let nextIndex: number;

    if (columns > 1) {
      if (focusedIndex === -1) {
        nextIndex = findNextEnabledIndex(-1, 1);
      } else {
        const target = focusedIndex + columns;
        if (target < items.length) {
          nextIndex = items[target].disabled
            ? findNextEnabledIndex(target, 1)
            : target;
        } else {
          // Wrap to first row, same column
          const col = focusedIndex % columns;
          const wrapTarget = col;
          nextIndex = items[wrapTarget]?.disabled
            ? findNextEnabledIndex(wrapTarget, 1)
            : wrapTarget;
        }
      }
    } else {
      if (focusedIndex === -1) {
        nextIndex = findNextEnabledIndex(-1, 1);
      } else {
        nextIndex = findNextEnabledIndex(focusedIndex, 1);
      }
    }

    if (nextIndex !== -1) {
      setFocusedKey(items[nextIndex].key);
    }
  };

  const handleArrowLeft = () => {
    const focusedIndex = getFocusedIndex();
    if (focusedIndex <= 0) return;
    const nextIndex = findNextEnabledIndex(focusedIndex, -1);
    if (nextIndex !== -1) {
      setFocusedKey(items[nextIndex].key);
    }
  };

  const handleArrowRight = () => {
    const focusedIndex = getFocusedIndex();
    if (focusedIndex >= items.length - 1 && focusedIndex !== -1) return;
    const nextIndex = findNextEnabledIndex(
      focusedIndex === -1 ? -1 : focusedIndex,
      1,
    );
    if (nextIndex !== -1) {
      setFocusedKey(items[nextIndex].key);
    }
  };

  const handleEnter = () => {
    if (focusedKey === '' || focusedKey === undefined) return;
    const item = items.find((i) => i.key === focusedKey);
    if (item && !item.disabled) {
      onClick?.(item);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!items || items.length === 0) return;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        handleArrowUp();
        break;
      case 'ArrowDown':
        event.preventDefault();
        handleArrowDown();
        break;
      case 'ArrowLeft':
        if (columns > 1) {
          event.preventDefault();
          handleArrowLeft();
        }
        break;
      case 'ArrowRight':
        if (columns > 1) {
          event.preventDefault();
          handleArrowRight();
        }
        break;
      case 'Enter':
        event.preventDefault();
        handleEnter();
        break;
      default:
    }
  };

  return {
    focusedKey,
    onKeyDown,
  };
}
