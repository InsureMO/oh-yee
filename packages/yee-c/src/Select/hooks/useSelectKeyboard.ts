import { useEffect, useState } from 'react';
import useLatest from '../../hooks/useLatest';

interface UseSelectKeyboardParams {
  options: Array<{
    value: string | number;
    disabled?: boolean;
    [key: string]: any;
  }>;
  open: boolean;
  selectedKeys: Array<string | number>;
  onSelect: (value: string | number) => void;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  containerRef?: React.RefObject<HTMLElement>;
  /**
   * Virtual-mode scroll hook. When provided, keyboard navigation drives the
   * virtual viewport through this callback instead of calling scrollIntoView
   * (the focused option may not be in the DOM while virtualized).
   */
  scrollToIndex?: (index: number) => void;
}

export default function useSelectKeyboard({
  options,
  open,
  selectedKeys,
  onSelect,
  onClose,
  onOpenChange,
  containerRef,
  scrollToIndex,
}: UseSelectKeyboardParams) {
  const [focusedKey, setFocusedKey] = useState<string | number>('');
  const latestFocusedKey = useLatest(focusedKey);

  // Find the index of the current focused key
  const getFocusedIndex = () => {
    return options?.findIndex((opt) => opt.value === latestFocusedKey.current);
  };

  // Find the next enabled option index (wrapping around)
  const findNextEnabledIndex = (
    startIndex: number,
    direction: 1 | -1,
  ): number => {
    const count = options.length;
    if (direction === 1) {
      const next = startIndex + 1 >= count ? 0 : startIndex + 1;
      const option = options[next];
      if (option.disabled) {
        return findNextEnabledIndex(next, direction);
      } else {
        return next;
      }
    } else {
      const next = startIndex - 1 < 0 ? count - 1 : startIndex - 1;
      const option = options[next];
      if (option.disabled) {
        return findNextEnabledIndex(next, direction);
      } else {
        return next;
      }
    }
  };

  // Scroll the focused option into view
  const scrollOptionIntoView = (index: number) => {
    // Virtual mode: drive the virtual viewport directly, since the option
    // element may not be mounted when it lies outside the render window.
    if (scrollToIndex) {
      scrollToIndex(index);
      return;
    }

    const container = containerRef?.current;
    if (!container) return;

    const optionElements = container.querySelectorAll('[role="option"]');
    const targetElement = optionElements[index] as HTMLElement;
    if (targetElement) {
      targetElement.scrollIntoView({
        block: 'nearest',
      });
    }
  };

  // Handle ArrowUp key
  const handleArrowUp = () => {
    const focusedIndex = getFocusedIndex();
    let nextIndex: number;

    if (focusedIndex === -1) {
      // No focus yet, focus the last enabled option
      nextIndex = findNextEnabledIndex(options.length - 1, -1);
    } else {
      // Find the previous enabled option
      nextIndex = findNextEnabledIndex(focusedIndex, -1);
    }

    if (nextIndex !== -1) {
      const nextValue = options[nextIndex].value;
      setFocusedKey(nextValue);
      scrollOptionIntoView(nextIndex);
    }
  };

  // Handle ArrowDown key
  const handleArrowDown = () => {
    const focusedIndex = getFocusedIndex();
    let nextIndex: number;

    if (focusedIndex === -1) {
      // No focus yet, focus the first enabled option
      nextIndex = findNextEnabledIndex(0, 1);
    } else {
      // Find the next enabled option
      nextIndex = findNextEnabledIndex(focusedIndex, 1);
    }
    if (nextIndex !== -1) {
      const nextValue = options[nextIndex].value;
      setFocusedKey(nextValue);
      scrollOptionIntoView(nextIndex);
    }
  };

  // Handle Enter key
  const handleEnter = () => {
    const currentFocusedKey = latestFocusedKey.current;
    if (!currentFocusedKey) return;

    const option = options.find((opt) => opt.value === currentFocusedKey);
    if (option && !option.disabled) {
      onSelect(option.value);
    }
  };

  // Handle Escape key
  const handleEscape = () => {
    onClose?.();
  };

  // Main keyboard handler - returns the onKeyDown function to use with Input
  const onKeyDown = (event: React.KeyboardEvent) => {
    // When dropdown is closed, handle Enter to open it
    if (!open) {
      if (event.key === 'Enter') {
        event.preventDefault();
        onOpenChange?.(true);
        return;
      }
    }

    // When dropdown is open, handle navigation and selection
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        handleArrowUp();
        break;
      case 'ArrowDown':
        event.preventDefault();
        handleArrowDown();
        break;
      case 'Enter':
        event.preventDefault();
        handleEnter();
        break;
      case 'Escape':
        event.preventDefault();
        handleEscape();
        break;
      default:
    }
  };

  // Initialize focused key when opening
  useEffect(() => {
    if (open) {
      // Focus the first selected option, or the first enabled option
      let focusedValue: string | number = '';
      if (selectedKeys?.length > 0) {
        const firstSelected = options?.find(
          (opt) => opt.value === selectedKeys[0],
        );
        if (firstSelected && !firstSelected.disabled) {
          focusedValue = firstSelected.value;
        }
      }
      if (!focusedValue) {
        // Find the first enabled option
        const firstEnabled = options?.find((opt) => !opt.disabled);
        if (firstEnabled) {
          focusedValue = firstEnabled.value;
        }
      }

      if (focusedValue) {
        setFocusedKey(focusedValue);
      }
      // Scrolling the focused option into view in virtual mode is handled by
      // <Options> itself (it owns the viewport + virtual list), which avoids
      // the first-open timing issue where this effect runs before the virtual
      // API ref is wired up.
    } else {
      // Clear focused key when closing
      setFocusedKey('');
    }
  }, [open, options, selectedKeys]);

  return {
    focusedKey,
    onKeyDown,
  };
}
