// locale/lang/index.ts
export { default as zh_CN } from './zh_CN';
export { default as en_US } from './en_US';
export { default as ja_JP } from './ja_JP';
export { default as zh_TW } from './zh_TW';

// Language list
export const localeList = [
    { label: '简体中文', value: 'zh_CN' },
    { label: 'English', value: 'en_US' },
    { label: '日本語', value: 'ja_JP' },
    { label: '繁體中文', value: 'zh_TW' },
] as const;