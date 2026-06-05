// locale/index.ts
export {
  DEFAULT_LOCALE,
  DEFAULT_LOCALE_CONFIG,
  LOCALE_CONFIGS,
  LOCALE_LABELS,
  SUPPORTED_LOCALES,
} from './constants';
export { LocaleContext, LocaleProvider, useLocale } from './context';
export type { Locale, LocaleKey, LocaleParams, TFunction } from './interface';
export * from './lang';
export {
  deepMerge,
  getLocaleLabel,
  getPath,
  interpolate,
  normalizeLocale,
  translate,
} from './util';

// Default export: Chinese locale pack
export { default } from './lang/zh_CN';
