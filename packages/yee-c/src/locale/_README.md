# Locale 本地化

yee-c 组件库的本地化解决方案，支持多语言切换和自动 fallback 机制。

## ✨ 新特性

- 🌍 **多语言支持**: 内置简体中文、英文、日语、繁体中文
- 🔧 **自动 Fallback**: 当翻译缺失时自动使用默认值（中文）
- 🎯 **类型安全**: 完整的 TypeScript 类型推导
- 📦 **工具函数**: 提供合并、规范化等实用工具
- ⚡ **按需加载**: 支持异步加载语言包

## 📦 安装

```bash
npm install @rainbow-oh/yee-c
```

## 🚀 快速开始

### 基础使用

```tsx
import { LocaleProvider, useLocale } from '@rainbow-oh/yee-c/locale';
import { DatePicker, Select } from '@rainbow-oh/yee-c';

function App() {
  return (
    <LocaleProvider defaultLocale="zh_CN">
      <MyComponent />
    </LocaleProvider>
  );
}

function MyComponent() {
  const { t, lang } = useLocale();
  return (
    <div>
      <DatePicker />
      <Select />
      <p>{t('datepicker.now')}</p> {/* 输出: "此刻" */}
    </div>
  );
}
```

### 切换语言

```tsx
import { LocaleProvider, useLocale } from '@rainbow-oh/yee-c/locale';
import { useState } from 'react';

function App() {
  const [locale, setLocale] = useState('zh_CN');

  return (
    <LocaleProvider defaultLocale={locale}>
      <LanguageSelector />
      <MyComponent />
    </LocaleProvider>
  );
}

function LanguageSelector() {
  const { setLocale } = useLocale();

  return (
    <div>
      <button onClick={() => setLocale('zh_CN')}>中文</button>
      <button onClick={() => setLocale('en_US')}>English</button>
    </div>
  );
}
```

### 自定义 / 部分覆盖语言包

传入一个带 `locale` 字段的（可以是**部分的**）对象，只需写要覆盖的 key，其余从对应内置语言包继承。对象会基于 `locale` 字段深度合并到内置包上，无需提供完整包。

```tsx
import { LocaleProvider } from '@rainbow-oh/yee-c/locale';

// 只覆盖 datepicker.now/confirm 和 select.noData，其余沿用 zh_CN 内置包
function App() {
  return (
    <LocaleProvider
      defaultLocale={{
        locale: 'zh_CN',
        datepicker: { now: '当前时间', confirm: '好的' },
        select: { noData: '空空如也' },
      }}
    >
      <MyComponent />
    </LocaleProvider>
  );
}
```

运行时切换语言也可传部分覆盖，同样合并到对应基础包：

```tsx
const { setLocale } = useLocale();

// 切到英文，同时把弹窗的 OK 文案改成 "Sure"
setLocale({ locale: 'en_US', modal: { okText: 'Sure' } });
```

> 注意：对象形式必须带 `locale` 字段，用来确定基于哪个内置包合并。也可以用 `deepMerge(LOCALE_CONFIGS.zh_CN, { ... })` 自行预先生成完整包再传入。

### 异步加载语言包

```tsx
import { LocaleProvider } from '@rainbow-oh/yee-c/locale';

async function loadLocale(lang: string) {
  const res = await fetch(`/locales/${lang}.json`);
  return res.json();
}

function App() {
  return (
    <LocaleProvider
      defaultLocale="en_US"
      loadLocale={loadLocale}
    >
      <MyComponent />
    </LocaleProvider>
  );
}
```

## 🔧 API

### LocaleProvider

全局配置组件的本地化。

```tsx
interface LocaleProviderProps {
  children: React.ReactNode;
  /** 初始语言包或语言代码 */
  defaultLocale?: Locale | string;
  /** 异步加载语言包的函数 */
  loadLocale?: (lang: string) => Promise<Locale>;
  /** 是否在缺失字段时自动使用默认值（默认 true） */
  fallbackToDefault?: boolean;
}
```

### useLocale

获取当前语言环境和翻译函数。

```tsx
interface LocaleContextType {
  locale: Locale;           // 当前语言包对象
  lang: string;             // 当前语言代码
  setLocale: (locale: Locale | string) => void;  // 设置语言
  t: TFunction;             // 翻译函数
}
```

### translate

翻译函数，支持自动 fallback。

```tsx
import { translate } from '@rainbow-oh/yee-c/locale';

// 基础用法
const text = translate(locale, 'datepicker.now');
// => "此刻"

// 支持参数插值
const text = translate(locale, 'pagination.total', { total: 100 });
// => "共 100 条"

// 自动 fallback 到默认语言
const text = translate(incompleteLocale, 'datepicker.now');
// => "此刻" (从默认语言包获取)
```

### normalizeLocale

确保语言包的完整性，缺失的字段使用默认值填充。

```tsx
import { normalizeLocale } from '@rainbow-oh/yee-c/locale';

const partialLocale = {
  locale: 'en_US',
  datepicker: {
    now: 'Now',
  },
};

const completeLocale = normalizeLocale(partialLocale);
// 所有缺失的字段都会被填充为默认值
```

### deepMerge

深度合并两个语言包对象。

```tsx
import { deepMerge } from '@rainbow-oh/yee-c/locale';

const base = {
  datepicker: {
    now: '此刻',
    confirm: '确定',
  },
};

const override = {
  datepicker: {
    now: '现在',
  },
};

const merged = deepMerge(base, override);
// { datepicker: { now: '现在', confirm: '确定' } }
```

### getLocaleLabel

获取语言代码的显示名称。

```tsx
import { getLocaleLabel } from '@rainbow-oh/yee-c/locale';

getLocaleLabel('zh_CN'); // => "简体中文"
getLocaleLabel('en_US'); // => "English"
```

## 📋 支持的组件

以下组件已支持本地化：

- ✅ DatePicker - 日期选择器
- ✅ RangePicker - 范围选择器
- ✅ Select - 选择器
- ✅ WeekPicker - 周选择器
- ✅ Table - 表格（新增）
- ✅ Pagination - 分页（新增）
- ✅ Upload - 上传（新增）
- ✅ Modal - 对话框（新增）
- ✅ Popconfirm - 气泡确认框（新增）
- ✅ Form - 表单（新增）

## 🌐 内置语言

| 语言代码 | 显示名称 |
|---------|---------|
| `zh_CN` | 简体中文 |
| `en_US` | English |
| `ja_JP` | 日本語 |
| `zh_TW` | 繁體中文 |

## 💡 最佳实践

### 1. 语言包组织

建议将语言包按模块组织：

```typescript
// locales/zh_CN.ts
export default {
  locale: 'zh_CN',
  datepicker: {
    now: '此刻',
    confirm: '确定',
  },
  table: {
    emptyText: '暂无数据',
  },
};
```

### 2. 使用常量

```typescript
import { DEFAULT_LOCALE } from '@rainbow-oh/yee-c/locale';

const DEFAULT_LANG = DEFAULT_LOCALE; // 'zh_CN'
```

### 3. 错误处理

```tsx
function MyComponent() {
  const { t } = useLocale();

  return (
    <div>
      {/* 缺失的 key 会显示警告并返回 key 本身 */}
      {t('nonexistent.key')} // => "nonexistent.key" + console.warn
    </div>
  );
}
```

### 4. 禁用 Fallback

如果需要严格模式，可以禁用自动 fallback：

```tsx
<LocaleProvider fallbackToDefault={false}>
  <MyComponent />
</LocaleProvider>
```

## 🔄 迁移指南

### 从旧版本迁移

如果你在旧版本中使用了 locale，只需要：

1. 更新导入路径：
```tsx
// 旧版本
import { LocaleProvider } from '@rainbow-oh/yee-c/locale/context';

// 新版本
import { LocaleProvider } from '@rainbow-oh/yee-c/locale';
```

2. 新的组件（Table、Pagination 等）会自动使用 locale，无需额外配置。

## 📝 类型定义

```typescript
// 翻译函数签名
type TFunction = <K extends LocaleKey>(
  key: K,
  params?: LocaleParams<K>
) => string;

// 所有合法的翻译 key 类型
type LocaleKey = 'datepicker.now' | 'table.emptyText' | ...;

// 参数类型（自动推导）
type LocaleParams<K> = { total: number } | ...;
```

## 🎯 完整示例

```tsx
import React, { useState } from 'react';
import { LocaleProvider, useLocale } from '@rainbow-oh/yee-c/locale';
import { DatePicker, Table, Pagination } from '@rainbow-oh/yee-c';

function App() {
  const [lang, setLang] = useState('zh_CN');

  return (
    <LocaleProvider defaultLocale={lang}>
      <LanguageSwitcher onLanguageChange={setLang} />
      <Content />
    </LocaleProvider>
  );
}

function LanguageSwitcher({ onLanguageChange }) {
  return (
    <div>
      <button onClick={() => onLanguageChange('zh_CN')}>中文</button>
      <button onClick={() => onLanguageChange('en_US')}>English</button>
    </div>
  );
}

function Content() {
  const { t, locale } = useLocale();

  return (
    <div>
      <h1>{t('datepicker.now')}</h1>
      <DatePicker />
      <Table locale={locale} />
      <Pagination total={100} locale={locale} />
    </div>
  );
}
```
