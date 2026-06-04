import { useEffect } from 'react'
import { pushFocus, popFocus } from '../utils/focusStack'

export default function useFocusManage(ele: HTMLElement, open: boolean) {
    useEffect(() => {
        if (!ele) return;
        if (open) {
            pushFocus(ele);
        } else {
            popFocus();
        }

        return () => {
            popFocus();
        }
    }, [ele, open]);
}