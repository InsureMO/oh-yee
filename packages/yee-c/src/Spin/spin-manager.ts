/**
 * Global Spin Manager (Singleton pattern)
 * Supports calling from non-React components
 */

type SpinCallback = {
    show: (id?: string) => void;
    hide: (id?: string) => void;
};

class SpinManager {
    private static instance: SpinManager;
    private spinCallback: SpinCallback | null = null;

    private constructor() { }

    static getInstance(): SpinManager {
        if (!SpinManager.instance) {
            SpinManager.instance = new SpinManager();
        }
        return SpinManager.instance;
    }

    /**
     * Register spin callback (called by SpinProvider)
     */
    register(callback: SpinCallback) {
        this.spinCallback = callback;
    }

    /**
     * Show loading
     */
    show(id?: string) {
        if (this.spinCallback) {
            this.spinCallback.show(id);
        } else {
            console.warn('SpinManager: spin callback not registered');
        }
    }

    /**
     * Hide loading
     */
    hide(id?: string) {
        if (this.spinCallback) {
            this.spinCallback.hide(id);
        } else {
            console.warn('SpinManager: spin callback not registered');
        }
    }
}

// Export singleton instance
export const spinManager = SpinManager.getInstance();
