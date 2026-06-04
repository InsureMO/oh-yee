# 配置工具 (Config)

全局配置管理工具，用于统一管理应用配置。

## 安装

```bash
npm install @oh/yee-tools
```

## 引入方式

```typescript
import { configer } from '@oh/yee-tools';
```

## API

### setConfig

设置全局配置。

```typescript
function setConfig(config: YeeConfig): void
```

**配置接口：**

```typescript
interface YeeConfig {
  date?: {
    defaultSubmitFormat?: string;
    defaultViewFormat?: string;
    defaultTimeout?: number;
  };
  http?: {
    timeout?: number;
    baseUrl?: string;
    headers?: Record<string, string>;
  };
  i18n?: {
    defaultLocale?: string;
    storageKey?: string;
    configurationGroup?: string[];
  };
  cache?: {
    enableLocalCache?: boolean;
    cacheKeys?: string[];
  };
  UI_API_GATEWAY_PROXY_WITH_TENANT?: boolean;
  UI_API_GATEWAY_PROXY?: string;
  DEFAULT_CODETABLE_API?: string;
  DEFAULT_CODETABLE_KEYVALUE?: {
    KEY: string;
    VALUE: string;
  };
}
```

**示例：**

```typescript
import { configer } from '@oh/yee-tools';

configer.setConfig({
  date: {
    defaultSubmitFormat: 'YYYY-MM-DD HH:mm:ss',
    defaultViewFormat: 'YYYY-MM-DD',
  },
  http: {
    timeout: 5000,
    baseUrl: 'https://api.example.com',
  },
  i18n: {
    defaultLocale: 'zh_CN',
    storageKey: 'system_i18nKey',
    configurationGroup: ['common'],
  },
});
```

---

### get

获取配置值，支持深层路径访问。

```typescript
function get<T>(path: string, defaultValue?: T): T
```

**参数：**
- `path`: 配置路径（支持点号分隔的深层路径）
- `defaultValue`: 默认值（可选）

**示例：**

```typescript
import { configer } from '@oh/yee-tools';

// 获取顶层配置
const timeout = configer.get('http.timeout', 3000);
// => 5000

// 获取深层配置
const locale = configer.get('i18n.defaultLocale', 'en_US');
// => 'zh_CN'

// 获取不存在的配置（使用默认值）
const apiKey = configer.get('api.key', 'default-key');
// => 'default-key'
```

---

### getAll

获取所有配置值。

```typescript
function getAll(): YeeConfig
```

**示例：**

```typescript
import { configer } from '@oh/yee-tools';

const allConfig = configer.getAll();
console.log(allConfig);
// => { date: {...}, http: {...}, i18n: {...}, ... }
```

---

### isInitialized

检查是否已初始化配置。

```typescript
function isInitialized(): boolean
```

**示例：**

```typescript
import { configer } from '@oh/yee-tools';

if (!configer.isInitialized()) {
  configer.setConfig(defaultConfig);
}
```

---

### reset

重置所有配置（主要用于测试）。

```typescript
function reset(): void
```

**示例：**

```typescript
import { configer } from '@oh/yee-tools';

// 测试后重置
afterEach(() => {
  configer.reset();
});
```

## 常见用例

### 应用初始化

```typescript
import { configer } from '@oh/yee-tools';

// 应用启动时配置
function initApp() {
  configer.setConfig({
    date: {
      defaultSubmitFormat: 'YYYY-MM-DD HH:mm:ss',
      defaultViewFormat: 'YYYY-MM-DD',
    },
    http: {
      timeout: 10000,
      baseUrl: import.meta.env.VITE_API_BASE_URL,
    },
    i18n: {
      defaultLocale: 'zh_CN',
      configurationGroup: ['common', 'business'],
    },
  });
}
```

### 环境配置

```typescript
import { configer } from '@oh/yee-tools';

// 根据环境加载配置
function loadConfig() {
  const env = import.meta.env.MODE;

  if (env === 'production') {
    configer.setConfig({
      http: {
        baseUrl: 'https://api.production.com',
        timeout: 5000,
      },
    });
  } else {
    configer.setConfig({
      http: {
        baseUrl: 'https://api.dev.com',
        timeout: 10000,
      },
    });
  }
}
```

### 动态配置读取

```typescript
import { configer } from '@oh/yee-tools';

// 在代码中使用配置
function makeRequest(url: string) {
  const baseUrl = configer.get('http.baseUrl', '');
  const timeout = configer.get('http.timeout', 5000);

  return fetch(baseUrl + url, {
    signal: AbortSignal.timeout(timeout),
  });
}
```

### 配置更新

```typescript
import { configer } from '@oh/yee-tools';

// 用户更新偏好后更新配置
function updateLanguage(locale: string) {
  const currentConfig = configer.getAll();
  configer.setConfig({
    ...currentConfig,
    i18n: {
      ...currentConfig.i18n,
      defaultLocale: locale,
    },
  });
}
```

## 注意事项

1. **单例模式**：`configer` 是全局单例，整个应用共享同一配置
2. **类型安全**：配置对象支持完整的 TypeScript 类型定义
3. **默认值**：建议在使用 `get` 方法时提供默认值
4. **初始化时机**：建议在应用启动时尽早初始化配置
