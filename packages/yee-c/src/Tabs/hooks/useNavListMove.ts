import { useEffect } from 'react';
import {
  getEleTranslate,
  isInContainer,
  setEleTranslate,
} from '../utils/tab-utils';

interface UseNavListMoveOptions {
  direction: 'horizontal' | 'vertical';
  activeKey: string | number;
  enabled: boolean;
  align?: 'auto' | 'center';
  activetab: React.RefObject<HTMLElement | null>;
  navList: React.RefObject<HTMLDivElement | null>;
  navContainer: React.RefObject<HTMLDivElement | null>;
  onMoved?: () => void;
}

export function useNavListMove({
  direction,
  activeKey,
  enabled,
  align = 'auto',
  activetab,
  navList,
  navContainer,
  onMoved,
}: UseNavListMoveOptions) {
  useEffect(() => {
    const tab = activetab.current;
    const list = navList.current;
    const container = navContainer.current;

    if (!enabled || !tab || !list || !container) {
      return;
    }

    // 'auto': keep as-is when the active tab is already fully visible.
    // 'center': always re-center, even for tabs already visible on the header.
    if (align !== 'center') {
      const [isVisible] = isInContainer(direction, tab, list, container);
      if (isVisible) return;
    }

    let moved = false;

    if (direction === 'horizontal') {
      if (align === 'center') {
        const containerWidth = container.clientWidth;
        const maxOffset = list.scrollWidth - containerWidth;
        const tabCenter = tab.offsetLeft + tab.offsetWidth / 2;

        let newX = Math.round(containerWidth / 2 - tabCenter);
        newX = Math.max(-maxOffset, Math.min(0, newX));

        const [x] = getEleTranslate(list);
        if (Math.abs(newX - x) > 0.5) {
          setEleTranslate(list, newX);
          moved = true;
        }
      } else {
        const [x] = getEleTranslate(list);
        const tabLeft = tab.offsetLeft;
        const tabWidth = tab.offsetWidth;
        const containerWidth = container.clientWidth;

        let newX = x;

        // Tab overflows on the right side
        if (tabLeft + tabWidth - Math.abs(x) > containerWidth) {
          const overflow = tabLeft + tabWidth - Math.abs(x) - containerWidth;
          newX = x - overflow;
        }
        // Tab overflows on the left side
        else if (tabLeft < Math.abs(x)) {
          const overflow = Math.abs(x) - tabLeft;
          newX = x + overflow;
        }

        setEleTranslate(list, newX);
        moved = true;
      }
    } else if (align === 'center') {
      const containerHeight = container.clientHeight;
      const maxOffset = container.scrollHeight - containerHeight;
      const tabCenter = tab.offsetTop + tab.offsetHeight / 2;

      const newScrollTop = Math.max(
        0,
        Math.min(maxOffset, Math.round(tabCenter - containerHeight / 2)),
      );
      if (Math.abs(newScrollTop - container.scrollTop) > 0.5) {
        container.scrollTop = newScrollTop;
        moved = true;
      }
    } else {
      const tabTop = tab.offsetTop;
      const tabHeight = tab.offsetHeight;
      const containerHeight = container.clientHeight;
      const scrollTop = container.scrollTop;

      // Tab overflows below
      if (tabTop + tabHeight - scrollTop >= containerHeight) {
        const overflow = tabTop + tabHeight - scrollTop - containerHeight;
        container.scrollTop = scrollTop + overflow;
        moved = true;
      }
      // Tab overflows above
      else if (tabTop < scrollTop) {
        const overflow = scrollTop - tabTop;
        container.scrollTop = scrollTop - overflow;
        moved = true;
      }
    }

    if (moved) {
      onMoved?.();
    }
  }, [
    activeKey,
    enabled,
    direction,
    align,
    activetab,
    navList,
    navContainer,
    onMoved,
  ]);
}
