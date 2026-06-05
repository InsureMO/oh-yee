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
  activetab: React.RefObject<HTMLElement | null>;
  navList: React.RefObject<HTMLDivElement | null>;
  navContainer: React.RefObject<HTMLDivElement | null>;
  onMoved?: () => void;
}

export function useNavListMove({
  direction,
  activeKey,
  enabled,
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

    const [isVisible] = isInContainer(direction, tab, list, container);
    if (isVisible) return;

    if (direction === 'horizontal') {
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
    } else {
      const tabTop = tab.offsetTop;
      const tabHeight = tab.offsetHeight;
      const containerHeight = container.clientHeight;
      const scrollTop = container.scrollTop;

      // Tab overflows below
      if (tabTop + tabHeight - scrollTop >= containerHeight) {
        const overflow = tabTop + tabHeight - scrollTop - containerHeight;
        container.scrollTop = scrollTop + overflow;
      }
      // Tab overflows above
      else if (tabTop < scrollTop) {
        const overflow = scrollTop - tabTop;
        container.scrollTop = scrollTop - overflow;
      }
    }

    onMoved?.();
  }, [
    activeKey,
    enabled,
    direction,
    activetab,
    navList,
    navContainer,
    onMoved,
  ]);
}
