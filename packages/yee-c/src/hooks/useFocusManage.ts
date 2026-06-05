import { useEffect } from 'react';
import { popFocus, pushFocus } from '../utils/focusStack';
import useDelayState from './useDelayState';

export default function useFocusManage(ele: HTMLElement, open: boolean) {
  const delayOpen = useDelayState(open);

  useEffect(() => {
    if (!ele) return;
    if (delayOpen) {
      pushFocus(ele);
    } else {
      popFocus();
    }

    return () => {
      popFocus();
    };
  }, [ele, delayOpen]);
}
