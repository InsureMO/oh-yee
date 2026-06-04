import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Indicator from './indicator';

const DEFAULT_ID = 'yee-FULL-SPIN-UNIQUE-ID';

export default function useSpin() {
    const [state, setState] = useState<Record<string, boolean>>({});

    const spinning = useMemo(() => Object.values(state).find(Boolean), [state]);

    const spinHolder = spinning
        ? createPortal(
            <div className='yee-full-spin-container'>
                <Indicator size='large' />
            </div>,
            document.body
        )
        : null;

    const show = (id?: string) => {
        if (id) {
            setState((prev) => ({ ...prev, [id]: true }));
        } else {
            setState((prev) => ({ ...prev, [DEFAULT_ID]: true }));
        }
    };

    const hide = (id?: string) => {
        setState((prev) => {
            const newState = { ...prev };
            delete newState[id || DEFAULT_ID];
            return newState;
        });
    };

    const spin = {
        show,
        hide
    };

    return { spin, spinHolder };
}
