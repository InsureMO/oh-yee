// locale/index.ts
export { LocaleProvider, useLocale, LocaleContext } from './context';
export type { Locale, LocaleKey, LocaleParams, TFunction } from './interface';
export { getPath, interpolate, deepMerge, normalizeLocale, translate, getLocaleLabel } from './util';
export { DEFAULT_LOCALE, DEFAULT_LOCALE_CONFIG, LOCALE_CONFIGS, SUPPORTED_LOCALES, LOCALE_LABELS } from './constants';
export * from './lang';

// Default export: Chinese locale pack
export { default } from './lang/zh_CN';