import React, { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import useSpin from './use-spin';
import { spinManager } from './spin-manager';

interface SpinContextType {
    show: (id?: string) => void;
    hide: (id?: string) => void;
}

const SpinContext = createContext<SpinContextType | undefined>(undefined);

/**
 * Spin Provider - Use at the application root
 */
export function SpinProvider({ children }: { children: ReactNode }) {
    const { spin, spinHolder } = useSpin();

    // Register to global manager to support non-component calls
    useEffect(() => {
        spinManager.register(spin);
    }, [spin]);

    return (
        <SpinContext.Provider value={spin}>
            {children}
            {spinHolder}
        </SpinContext.Provider>
    );
}

/**
 * Hook for using global Spin (use within React components)
 *
 * @example
 * const spin = useGlobalSpin();
 * spin.show();
 * spin.hide();
 */
export function useGlobalSpin() {
    const context = useContext(SpinContext);
    if (context === undefined) {
        throw new Error('useGlobalSpin must be used within SpinProvider');
    }
    return context;
}
