# yee-c I18n 使用文档

yee-c 的国际化（I18n）解决方案，提供多语言支持和消息格式化功能。

## 📦 目录

- [简介](#简介)
- [快速开始](#快速开始)
- [核心概念](#核心概念)
- [API 文档](#api-文档)
- [使用示例](#使用示例)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)

---

## 简介

yee-c I18n 是一个轻量级、类型安全的国际化解决方案，专为 React 应用设计。

### 特性

- ✅ **类型安全**：完整的 TypeScript 类型支持
- ✅ **简单易用**：简洁的 API 设计
- ✅ **性能优化**：使用 useCallback 避免不必要的重渲染
- ✅ **支持插值**：动态参数替换
- ✅ **Fallback 机制**：自动回退到备用语言
- ✅ **内存安全**：支持取消订阅，避免内存泄漏

---

## 快速开始

### 安装

```bash
npm install @oh/yee-c
```

### 基础用法

```tsx
import { i18n, useTranslation } from '@oh/yee-c/i18n';

// 1. 初始化 i18n
i18n.initialization({
  lng: 'zh_CN',           // 当前语言
  fallbackLng: 'en_US',   // 备用语言
  resources: {
    zh_CN: {
      welcome: '欢迎',
      goodbye: '再见',
      hello: '你好 {name}',
    },
    en_US: {
      welcome: 'Welcome',
      goodbye: 'Goodbye',
      hello: 'Hello {name}',
    },
  },
});

// 2. 在组件中使用
function MyComponent() {
  const { t, i18n, lng, changeLanguage } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>       {/* 欢迎 */}
      <p>{t('hello', { name: 'John' })}</p>  {/* 你好 John */}
      <button onClick={() => changeLanguage('en_US')}>
        切换到英文
      </button>
      <p>当前语言: {lng}</p>
    </div>
  );
}
```

---

## 核心概念

### 1. 初始化（Initialization）

在使用 i18n 之前，必须先初始化：

```typescript
i18n.initialization({
  lng: 'zh_CN',           // 当前语言代码
  fallbackLng: 'en_US',   // 备用语言代码
  resources: {            // 翻译资源
    zh_CN: { translation },
    en_US: { translation },
  }
});
```

### 2. 语言代码

支持任意格式，推荐使用以下标准：

| 语言 | 代码 |
|------|------|
| 简体中文 | `zh_CN` |
| 英语（美国） | `en_US` |
| 日语 | `ja_JP` |
| 繁体中文 | `zh_TW` |

### 3. 翻译资源

翻译资源是一个对象，键为翻译 key，值为翻译文本：

```typescript
{
  zh_CN: {
    // 简单翻译
    'title': '标题',

    // 支持插值
    'greeting': '欢迎 {name}',

    // 嵌套对象
    'common': {
      'submit': '提交',
      'cancel': '取消',
    }
  }
}
```

---

## API 文档

### i18n 管理器

#### `initialization(params: InitParams): MI18n`

初始化 i18n 系统。

```typescript
i18n.initialization({
  lng: 'zh_CN',
  fallbackLng: 'en_US',
  resources: {
    zh_CN: { title: '标题' },
    en_US: { title: 'Title' },
  },
});
```

**参数：**
- `lng`: 当前语言代码
- `fallbackLng`: 备用语言代码
- `resources`: 翻译资源对象

---

#### `getTranslation(key: string): string | undefined`

获取单个翻译文本，支持 fallback 机制。

```typescript
const text = i18n.getTranslation('welcome');
// 如果 zh_CN 中有 'welcome'，返回中文
// 如果没有，尝试从 fallbackLng (en_US) 获取
// 如果都没有，返回 undefined
```

---

#### `t(key: string, params?: Record<string, any>): string`

翻译函数，支持参数插值。

```typescript
// 简单翻译
i18n.t('welcome');  // '欢迎'

// 带参数插值
i18n.t('hello', { name: 'John' });  // '你好 John'

// 多个参数
i18n.t('greeting', { name: 'John', time: '晚上' });  // '晚上好 John'
```

---

#### `setLanguage(key: string, value: Record<string, string>): void`

动态添加新语言。

```typescript
i18n.setLanguage('fr', {
  welcome: 'Bienvenue',
  goodbye: 'Au revoir',
});
```

---

#### `getLng(): string`

获取当前语言代码。

```typescript
const currentLang = i18n.getLng(); // 'zh_CN'
```

---

#### `setLng(key: string): void`

设置当前语言。

```typescript
i18n.setLng('en_US'); // 切换到英文
// 会触发 'lng' 事件，通知所有订阅者
```

---

#### `getLanguage(): Record<string, string>`

获取当前语言的翻译对象。

```typescript
const translations = i18n.getLanguage();
// { welcome: '欢迎', goodbye: '再见' }
```

---

#### `subscriber(key: string, cb: Function): () => void`

订阅事件，返回取消订阅函数。

```typescript
const unsubscribe = i18n.subscriber('lng', ({ value }) => {
  console.log('语言切换到:', value);
});

// 取消订阅
unsubscribe();
```

**支持的事件：**
- `'state'`: 初始化状态变化
- `'lng'`: 语言切换

---

### useTranslation Hook

#### 返回值

```typescript
interface TranslationResult {
  t: (key: string, params?: Record<string, any>) => string;  // 翻译函数
  i18n: Record<string, string> | null;                           // 翻译对象
  lng: string;                                                  // 当前语言
  changeLanguage: (lng: string) => void;                        // 切换语言
}
```

#### 使用示例

```tsx
function MyComponent() {
  const { t, i18n, lng, changeLanguage } = useTranslation();

  // 简单翻译
  const title = t('welcome');

  // 带插值
  const message = t('hello', { name: 'World' });

  // 切换语言
  const handleSwitchLanguage = () => {
    changeLanguage('en_US');
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
      <button onClick={handleSwitchLanguage}>
        Switch to English
      </button>
    </div>
  );
}
```

---

## 使用示例

### 示例 1：简单多语言应用

```tsx
import React, { useEffect } from 'react';
import { i18n, useTranslation } from '@oh/yee-c/i18n';

// 在应用入口初始化
i18n.initialization({
  lng: 'zh_CN',
  fallbackLng: 'en_US',
  resources: {
    zh_CN: {
      appTitle: '我的应用',
      home: '首页',
      about: '关于',
      contact: '联系',
    },
    en_US: {
      appTitle: 'My App',
      home: 'Home',
      about: 'About',
      contact: 'Contact',
    },
  },
});

function App() {
  const { t } = useTranslation();

  return (
    <nav>
      <a href="/home">{t('home')}</a>
      <a href="/about">{t('about')}</a>
      <a href="/contact">{t('contact')}</a>
    </nav>
  );
}
```

---

### 示例 2：动态参数插值

```tsx
import { useTranslation } from '@oh/yee-c/i18n';

// 初始化
i18n.initialization({
  lng: 'zh_CN',
  fallbackLng: 'en_US',
  resources: {
    zh_CN: {
      welcome: '欢迎 {name}，您有 {count} 条新消息',
      loginSuccess: '登录成功！欢迎回来 {name}',
    },
    en_US: {
      welcome: 'Welcome {name}, you have {count} new messages',
      loginSuccess: 'Login successful! Welcome back {name}',
    },
  },
});

function UserGreeting({ name, messageCount }: { name: string; messageCount: number }) {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome', { name, count: messageCount })}</h1>
      <p>{t('loginSuccess', { name })}</p>
    </div>
  );
}
```

---

### 示例 3：语言切换器

```tsx
import { useTranslation } from '@oh/yee-c/i18n';

function LanguageSwitcher() {
  const { lng, changeLanguage } = useTranslation();

  const languages = [
    { code: 'zh_CN', label: '简体中文' },
    { code: 'en_US', label: 'English' },
    { code: 'ja_JP', label: '日本語' },
  ];

  return (
    <div>
      <select
        value={lng}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
```

---

### 礿例 4：监听语言变化

```tsx
import { useEffect, useState } from 'react';
import { i18n, useTranslation } from '@oh/yee-c/i18n';

function LanguageAwareComponent() {
  const { lng } = useTranslation();
  const [previousLang, setPreviousLang] = useState(lng);

  useEffect(() => {
    // 订阅语言变化事件
    const unsubscribe = i18n.subscriber('lng', ({ value }) => {
      console.log('语言从', previousLang, '切换到', value);
      setPreviousLang(value);

      // 可以在这里执行语言切换后的逻辑
      // 例如：重新加载数据、更新日期格式等
    });

    return () => {
      unsubscribe(); // 组件卸载时取消订阅
    };
  }, [previousLang]);

  return (
    <div>
      <p>当前语言: {lng}</p>
      <p>上一次语言: {previousLang}</p>
    </div>
  );
}
```

---

### 示例 5：嵌套翻译资源

```tsx
import { i18n, useTranslation } from '@oh/yee-c/i18n';

i18n.initialization({
  lng: 'zh_CN',
  fallbackLng: 'en_US',
  resources: {
    zh_CN: {
      common: {
        submit: '提交',
        cancel: '取消',
        save: '保存',
      },
      form: {
        required: '此字段为必填项',
        invalid: '格式不正确',
      },
      user: {
        profile: '用户资料',
        settings: '设置',
      },
    },
    en_US: {
      common: {
        submit: 'Submit',
        cancel: 'Cancel',
        save: 'Save',
      },
      form: {
        required: 'This field is required',
        invalid: 'Invalid format',
      },
      user: {
        profile: 'User Profile',
        settings: 'Settings',
      },
    },
  },
});

function UserSettings() {
  const { i18n } = useTranslation();

  return (
    <div>
      <button>{i18n.common?.submit}</button>
      <button>{i18n.user?.settings}</button>
    </div>
  );
}
```

---

## 最佳实践

### 1. 初始化时机

在应用的入口文件或根组件中初始化 i18n：

```tsx
// main.tsx 或 App.tsx
import { i18n } from '@oh/yee-c/i18n';

i18n.initialization({
  lng: 'zh_CN',
  fallbackLng: 'en_US',
  resources: translations,
});

function App() {
  return <MyApp />;
}
```

---

### 2. 翻译 Key 命名规范

```typescript
// ✅ 推荐：使用点号分隔的命名空间
'common.submit'
'form.required'
'user.profile.title'

// ✅ 推荐：使用有意义的 key
'welcomeMessage'  // 而不是 'msg1'

// ❌ 避免：使用特殊字符或中文作为 key
'提交按钮'
'message-1'
```

---

### 3. 组织翻译资源

```typescript
// ✅ 推荐：按模块组织
const translations = {
  common: {
    submit: '提交',
    cancel: '取消',
  },
  form: {
    required: '必填项',
    invalid: '格式错误',
  },
  user: {
    login: '登录',
    logout: '登出',
  },
};

// ✅ 推荐：按功能模块拆分文件
// translations/common.ts
// translations/form.ts
// translations/user.ts
```

---

### 4. 处理缺失翻译

```typescript
// 方式 1：使用 key 作为默认文本
const text = t('some.key');  // 如果找不到翻译，返回 'some.key'

// 方式 2：使用 fallback 机制
i18n.initialization({
  lng: 'zh_CN',
  fallbackLng: 'en_US',  // 自动回退到英文
  resources: translations,
});

// 方式 3：提供默认值
const text = t('some.key') || '默认文本';
```

---

### 5. 性能优化

```tsx
// ✅ 使用 useCallback 缓存翻译函数
const { t } = useTranslation();

const memoizedComponent = React.memo(({ name }) => {
  // t 函数已经被 useCallback 优化，不会每次渲染都创建新函数
  return <div>{t('hello', { name })}</div>;
});
```

---

### 6. 类型安全

```typescript
// ✅ 定义翻译 key 类型
type TranslationKeys = 'welcome' | 'goodbye' | 'hello';

// 使用泛型增强类型安全
function translate<T extends string>(key: T): string {
  return i18n.getTranslation(key) || key;
}

const text = translate('welcome'); // ✅ 类型安全
// const text = translate('invalid'); // ❌ 类型错误
```

---

## 常见问题

### Q1: 如何处理动态加载语言包？

使用 `loadLocale` 结合异步加载：

```pure_tsx
async function loadLanguage(lang: string) {
  const translations = await import(`./locales/${lang}.ts`);
  i18n.setLanguage(lang, translations.default);
  i18n.setLng(lang);
}

// 使用
await loadLanguage('fr');
```

---

### Q2: 如何在组件外部使用翻译？

直接使用 `i18n` 实例：

```typescript
import { i18n } from '@oh/yee-c/i18n';

// 在工具函数中使用
function showNotification(message: string) {
  const text = i18n.t(message);
  console.log(text);
}

showNotification('welcome');  // '欢迎'
```

---

### Q3: 如何支持复数形式？

使用不同的 key：

```typescript
resources: {
  zh_CN: {
    'item': '项目',
    'items': '项目',
    'item_count': '{count} 个项目',
  },
  en_US: {
    'item': 'item',
    'items': 'items',
    'item_count': '{count} items',
  },
}

// 使用
const text = count === 1 ? t('item') : t('item_count', { count });
```

---

### Q4: 如何与 locale 模块配合使用？

yee-c 提供了两个国际化方案：

- **`@oh/yee-c/i18n`**：用于业务文案的多语言翻译
- **`@oh/yee-c/locale`**：用于组件内置文案的本地化

两者可以同时使用：

```tsx
import { LocaleProvider } from '@oh/yee-c/locale';
import { useTranslation } from '@oh/yee-c/i18n';

function App() {
  return (
    <LocaleProvider defaultLocale="zh_CN">
      <MyComponent />
    </LocaleProvider>
  );
}

function MyComponent() {
  const { t: localeT } = useLocale();  // 组件文案
  const { t: i18nT } = useTranslation(); // 业务文案

  return (
    <div>
      <Button>{localeT('modal.okText')}</Button>
      <p>{i18nT('welcome')}</p>
    </div>
  );
}
```

---

### Q5: 如何持久化语言设置？

结合 sessionStorage 使用：

```tsx
import { useEffect } from 'react';
import { i18n, useTranslation } from '@oh/yee-c/i18n';

function App() {
  const { changeLanguage } = useTranslation();

  useEffect(() => {
    // 从 localStorage 读取保存的语言
    const savedLang = localStorage.getItem('app-language');
    if (savedLang) {
      i18n.setLng(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  return <LanguageSwitcher onChange={handleLanguageChange} />;
}
```

---

### Q6: 如何处理翻译缺失的情况？

```tsx
// ✅ 方式 1：使用默认值
const text = t('some.key') || '默认文本';

// ✅ 方式 2：使用 fallback 语言
i18n.initialization({
  lng: 'zh_CN',
  fallbackLng: 'en_US',  // 自动回退
  resources: translations,
});

// ✅ 方式 3：检查翻译是否存在
function getTranslation(key: string) {
  const text = i18n.getTranslation(key);
  return text || key;  // 返回翻译或 key 本身
}
```

---

## 完整示例

```tsx
import { useEffect, useState } from 'react';
import { i18n, useTranslation } from '@oh/yee-c/i18n';

// 1. 初始化
i18n.initialization({
  lng: 'zh_CN',
  fallbackLng: 'en_US',
  resources: {
    zh_CN: {
      appTitle: '我的应用',
      welcome: '欢迎',
      hello: '你好 {name}',
      submit: '提交',
      cancel: '取消',
      messages: '您有 {count} 条消息',
    },
    en_US: {
      appTitle: 'My App',
      welcome: 'Welcome',
      hello: 'Hello {name}',
      submit: 'Submit',
      cancel: 'Cancel',
      messages: 'You have {count} messages',
    },
  },
});

function App() {
  const { t, i18n, lng, changeLanguage } = useTranslation();
  const [userName] = useState('World');
  const [messageCount] = useState(5);

  return (
    <div>
      <h1>{t('appTitle')}</h1>

      {/* 语言切换器 */}
      <select value={lng} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="zh_CN">简体中文</option>
        <option value="en_US">English</option>
      </select>

      {/* 翻译示例 */}
      <h2>{t('welcome')}</h2>
      <p>{t('hello', { name: userName })}</p>
      <p>{t('messages', { count: messageCount })}</p>

      {/* 按钮 */}
      <div>
        <button>{t('submit')}</button>
        <button>{t('cancel')}</button>
      </div>
    </div>
  );
}

export default App;
```

---

## 迁移指南

如果你使用的是旧版本的 i18n，请注意以下变更：

### 新增功能

1. **`t()` 方法**：支持插值的翻译函数
2. **`getTranslation()` 方法**：获取单个翻译，支持 fallback
3. **取消订阅**：`subscriber()` 现在返回取消订阅函数
4. **订阅系统修复**：修复了订阅者被清空的问题

### 不再推荐使用

```typescript
// ❌ 旧方法：translate()
const translations = i18n.translate();

// ✅ 新方法：getLanguage()
const translations = i18n.getLanguage();
```

---

## 参考资源

- [Locale 文档](../locale/README.md) - 组件本地化
- [迁移指南](../i18n/CHANGELOG.md) - 优化更新日志
