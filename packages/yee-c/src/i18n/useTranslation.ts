/**
 * yee-c useTranslation Hook - Optimized version
 *
 * Key improvements:
 * 1. Fix useEffect dependency issue
 * 2. Use useCallback to optimize t function
 * 3. Correctly handle i18n being null
 * 4. Add unsubscribe
 * 5. Support parameter interpolation
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import i18n from './i18n-manager';

interface TranslationResult {
  t: (key: string, params?: Record<string, any>) => string;
  i18n: Record<string, string> | null;
  lng: string;
  changeLanguage: (lng: string) => void;
}

export default function useTranslation(): TranslationResult {
  const mi18nRef = useRef(i18n);
  const lng = mi18nRef.current.getLng();

  // Current language state
  const [current, setCurrent] = useState(lng || 'zh_CN');
  const [state, setState] = useState(mi18nRef.current.getState());

  // Translation data
  const translations = useMemo(() => {
    const target = mi18nRef.current.getLanguage();
    if (!target) return null;
    return target;
  }, [current, state]);

  /**
   * Translation function - supports interpolation
   */
  const t = useCallback(
    (key: string, params?: Record<string, any>): string => {
      if (!translations) return key;

      const message = translations[key];

      // If translation not found
      if (!message) {
        // @ts-ignore
        if (import.meta?.env?.NODE_ENV !== 'production') {
          console.warn(`[useTranslation] Missing translation key: "${key}"`);
        }
        return key;
      }

      // Support interpolation
      if (params) {
        return message.replace(/\{(\w+)\}/g, (_, paramKey) => {
          return params[paramKey] !== undefined
            ? String(params[paramKey])
            : `{${paramKey}}`;
        });
      }

      return message;
    },
    [translations],
  );

  /**
   * Switch language
   */
  const changeLanguage = useCallback((lng: string) => {
    mi18nRef.current.setLng(lng);
  }, []);

  // Listen for initialization state
  useEffect(() => {
    const currentState = mi18nRef.current.getState();
    if (currentState === 'uninitialized') {
      const unsubscribe = mi18nRef.current.subscriber('state', () => {
        setState('initialized');
      });
      return unsubscribe;
    }
  }, []);

  // Listen for language changes
  useEffect(() => {
    const unsubscribe = mi18nRef.current.subscriber('lng', ({ value }: any) => {
      setCurrent(value);
    });
    return unsubscribe;
  }, []);

  return {
    t,
    i18n: translations,
    lng: current,
    changeLanguage,
  };
}
