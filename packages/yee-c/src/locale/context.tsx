// locale/context.tsx
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    useEffect
} from 'react';
import type { Locale, TFunction } from './interface';
import { translate, isValidLocale } from './util';
import { DEFAULT_LOCALE, LOCALE_CONFIGS } from './constants';
import defaultLocaleData from './lang/en_US';

// ============ Default value (fallback when no Provider) ============

const createDefaultValue = (): LocaleContextType => {
    const t: TFunction = (key) => key as any; // Simply return the key
    return {
        locale: defaultLocaleData,
        lang: DEFAULT_LOCALE,
        setLocale: () => {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('[Locale] Cannot set locale outside of LocaleProvider');
            }
        },
        t,
    };
};

const defaultValue = createDefaultValue();

// ============ Context definition ============

interface LocaleContextType {
    locale: Locale;
    lang: string;              // Current language code 'zh_CN'
    setLocale: (locale: Locale | string) => void; // Supports object or language code
    t: TFunction;
}

export const LocaleContext = createContext<LocaleContextType>(defaultValue);

// ============ Provider component ============

interface LocaleProviderProps {
    children: React.ReactNode;
    /** Initial locale pack or language code */
    defaultLocale?: Locale | string;
    /** Async locale loader function */
    loadLocale?: (lang: string) => Promise<Locale>;
    /** Whether to auto-fallback to default for missing fields */
    fallbackToDefault?: boolean;
}

export function LocaleProvider({
    children,
    defaultLocale: initialLocale = DEFAULT_LOCALE,
    loadLocale,
    fallbackToDefault = true,
}: LocaleProviderProps) {
    // State management
    const [locale, setLocaleState] = useState<Locale>(() => {
        if (typeof initialLocale === 'string') {
            // Prefer sync lookup from static locale packs
            return LOCALE_CONFIGS[initialLocale] || defaultLocaleData;
        }
        return isValidLocale(initialLocale) ? initialLocale : defaultLocaleData;
    });

    const [lang, setLang] = useState<string>(
        typeof initialLocale === 'string' ? initialLocale : initialLocale.locale
    );

    // Async locale loading
    const loadAndSetLocale = useCallback(async (targetLang: string) => {
        if (targetLang === DEFAULT_LOCALE) {
            setLocaleState(defaultLocaleData);
            setLang(DEFAULT_LOCALE);
            return;
        }

        if (loadLocale) {
            try {
                const newLocale = await loadLocale(targetLang);
                if (isValidLocale(newLocale)) {
                    setLocaleState(newLocale);
                    setLang(targetLang);
                }
            } catch (err) {
                console.error(`[Locale] Failed to load ${targetLang}:`, err);
                // Fallback to default
                setLocaleState(defaultLocaleData);
                setLang(DEFAULT_LOCALE);
            }
        } else {
            console.warn(`[Locale] No loadLocale provided for ${targetLang}`);
        }
    }, [loadLocale]);

    // Initialize: if string is passed, try to load
    useEffect(() => {
        if (typeof initialLocale === 'string' && initialLocale !== DEFAULT_LOCALE) {
            loadAndSetLocale(initialLocale);
        }
    }, []);

    // Translation function (critical! use useCallback to ensure stability)
    const t = useCallback<TFunction>((key, params) => {
        if (fallbackToDefault) {
            // Use translate function with fallback
            return translate(locale, key as string, params);
        } else {
            // Legacy implementation, get directly from current locale
            const template = (locale as any)[key];
            if (typeof template !== 'string') {
                if (process.env.NODE_ENV !== 'production') {
                    console.warn(`[Locale] Missing key: "${String(key)}" in "${lang}"`);
                }
                return String(key); // Fallback returns key
            }
            return params ? translate(locale, key as string, params) : template;
        }
    }, [locale, lang, fallbackToDefault]);

    // Set locale method
    const setLocale = useCallback((target: Locale | string) => {
        if (typeof target === 'string') {
            // Prefer sync lookup from static locale packs
            const staticLocale = LOCALE_CONFIGS[target];
            if (staticLocale) {
                setLocaleState(staticLocale);
                setLang(target);
                return;
            }
            // Otherwise use async loading
            loadAndSetLocale(target);
        } else if (isValidLocale(target)) {
            setLocaleState(target);
            setLang(target.locale);
        }
    }, [loadAndSetLocale]);

    const value = useMemo(() => ({
        locale,
        lang,
        setLocale,
        t,
    }), [locale, lang, setLocale, t]);

    return (
        <LocaleContext.Provider value={value}>
            {children}
        </LocaleContext.Provider>
    );
}

// ============ Consumer Hook ============

export function useLocale(): LocaleContextType {
    return useContext(LocaleContext);
}
