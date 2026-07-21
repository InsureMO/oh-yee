import { DEFAULT_LOCALE_CONFIG } from './constants';
import type { DeepPartial, Locale } from './interface';

/**
 * Deep get object value
 * get(obj, 'a.b.c') => obj.a.b.c
 */
export function getPath<T>(obj: T, path: string): string | undefined {
  return path.split('.').reduce<any>((o, k) => o?.[k], obj);
}

/**
 * Simple interpolation: "Total {total} items" + {total: 100} => "Total 100 items"
 */
export function interpolate(
  template: string,
  params: Record<string, any>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : `{${key}}`;
  });
}

/**
 * Check if it is a valid locale pack
 */
export function isValidLocale(obj: any): obj is Locale {
  return (
    obj &&
    typeof obj.locale === 'string' &&
    typeof obj.global === 'object' &&
    typeof obj.button === 'object' &&
    typeof obj.card === 'object' &&
    typeof obj.datepicker === 'object' &&
    typeof obj.rangepicker === 'object' &&
    typeof obj.select === 'object' &&
    typeof obj.weekpicker === 'object'
  );
}

/**
 * Deep merge two objects
 * Used to merge custom config with default config
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: DeepPartial<NoInfer<T>>,
): T {
  const result: Record<string, any> = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else {
        result[key] = sourceValue;
      }
    }
  }

  return result as T;
}

/**
 * Ensure locale pack completeness, fill missing fields with default values
 */
export function normalizeLocale(locale: DeepPartial<Locale>): Locale {
  return deepMerge(DEFAULT_LOCALE_CONFIG, locale);
}

/**
 * Get translation text from locale, supports fallback
 * @param locale Current locale pack
 * @param key Translation key (supports dot path, e.g. 'datepicker.now')
 * @param params Interpolation parameters
 * @returns Translated text
 */
export function translate(
  locale: Locale,
  key: string,
  params?: Record<string, any>,
): string {
  // Try to get from current locale pack
  let template = getPath(locale, key);

  // If current locale pack doesn't have it, try default locale pack
  if (template === undefined) {
    template = getPath(DEFAULT_LOCALE_CONFIG, key);
  }

  // If still not found, return key itself
  if (template === undefined) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Locale] Missing translation key: "${key}"`);
    }
    return key;
  }

  // Support interpolation
  return params ? interpolate(template, params) : template;
}

/**
 * Get display name for locale code
 */
export function getLocaleLabel(localeCode: string): string {
  const labels: Record<string, string> = {
    zh_CN: '简体中文',
    en_US: 'English',
    ja_JP: '日本語',
    zh_TW: '繁體中文',
  };
  return labels[localeCode] || localeCode;
}
