import { useEffect } from 'react'
import useDelayState from './useDelayState'
import { pushFocus, popFocus } from '../utils/focusStack'

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
        }
    }, [ele, delayOpen]);
}
