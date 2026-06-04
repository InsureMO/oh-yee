import type { Locale } from './interface';
import zh_CN from './lang/zh_CN';
import en_US from './lang/en_US';
import ja_JP from './lang/ja_JP';
import zh_TW from './lang/zh_TW';

/**
 * Default locale configuration
 */
export const DEFAULT_LOCALE = 'en_US' as const;

/**
 * Supported locales list
 */
export const SUPPORTED_LOCALES = ['zh_CN', 'en_US', 'ja_JP', 'zh_TW'] as const;

/**
 * All locale configurations
 */
export const LOCALE_CONFIGS: Record<string, Locale> = {
    zh_CN,
    en_US,
    ja_JP,
    zh_TW,
};

/**
 * Default locale config (Chinese)
 * Used as fallback when a field is missing from the locale pack
 */
export const DEFAULT_LOCALE_CONFIG: Locale = LOCALE_CONFIGS[DEFAULT_LOCALE];

/**
 * Display names for locale codes
 */
export const LOCALE_LABELS: Record<string, string> = {
    zh_CN: '简体中文',
    en_US: 'English',
    ja_JP: '日本語',
    zh_TW: '繁體中文',
};
