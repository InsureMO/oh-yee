# Config

Global configuration management tool for unified application configuration.

## Installation

```bash
npm install @rainbow-oh/yee-tools
```

## Import

```typescript
import { configer } from '@rainbow-oh/yee-tools';
```

## API

### setConfig

Sets global configuration.

```typescript
function setConfig(config: YeeConfig): void
```

**Configuration Interface:**

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

**Example:**

```typescript
import { configer } from '@rainbow-oh/yee-tools';

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
    defaultLocale: 'en_US',
    storageKey: 'system_i18nKey',
    configurationGroup: ['common'],
  },
});
```

---

### get

Gets configuration value, supports deep path access.

```typescript
function get<T>(path: string, defaultValue?: T): T
```

**Parameters:**
- `path`: Configuration path (supports dot-separated deep paths)
- `defaultValue`: Default value (optional)

**Example:**

```typescript
import { configer } from '@rainbow-oh/yee-tools';

// Get top-level config
const timeout = configer.get('http.timeout', 3000);
// => 5000

// Get deep config
const locale = configer.get('i18n.defaultLocale', 'en_US');
// => 'zh_CN'

// Get non-existent config (with default value)
const apiKey = configer.get('api.key', 'default-key');
// => 'default-key'
```

---

### getAll

Gets all configuration values.

```typescript
function getAll(): YeeConfig
```

**Example:**

```typescript
import { configer } from '@rainbow-oh/yee-tools';

const allConfig = configer.getAll();
console.log(allConfig);
// => { date: {...}, http: {...}, i18n: {...}, ... }
```

---

### isInitialized

Checks if configuration has been initialized.

```typescript
function isInitialized(): boolean
```

**Example:**

```typescript
import { configer } from '@rainbow-oh/yee-tools';

if (!configer.isInitialized()) {
  configer.setConfig(defaultConfig);
}
```

---

### reset

Resets all configuration (mainly for testing).

```typescript
function reset(): void
```

**Example:**

```typescript
import { configer } from '@rainbow-oh/yee-tools';

// Reset after tests
afterEach(() => {
  configer.reset();
});
```

## Common Use Cases

### Application Initialization

```typescript
import { configer } from '@rainbow-oh/yee-tools';

// Configure on app startup
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
      defaultLocale: 'en_US',
      configurationGroup: ['common', 'business'],
    },
  });
}
```

### Environment Configuration

```typescript
import { configer } from '@rainbow-oh/yee-tools';

// Load config based on environment
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

### Dynamic Configuration Reading

```typescript
import { configer } from '@rainbow-oh/yee-tools';

// Use configuration in code
function makeRequest(url: string) {
  const baseUrl = configer.get('http.baseUrl', '');
  const timeout = configer.get('http.timeout', 5000);

  return fetch(baseUrl + url, {
    signal: AbortSignal.timeout(timeout),
  });
}
```

### Configuration Update

```typescript
import { configer } from '@rainbow-oh/yee-tools';

// Update config after user preference change
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

## Notes

1. **Singleton pattern**: `configer` is a global singleton shared across the application
2. **Type-safe**: Configuration object supports full TypeScript type definitions
3. **Default values**: Recommended to provide default values when using `get` method
4. **Initialization timing**: Initialize configuration as early as possible during app startup
