# @rainbow-oh/yee-tools

[![npm](https://img.shields.io/npm/v/@rainbow-oh/yee-tools.svg)](https://www.npmjs.com/package/@rainbow-oh/yee-tools) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

A modern, type-safe TypeScript utility library. Part of the [Yee](https://github.com/InsureMO/oh-yee) component library.

## Features

- **100% TypeScript** with strict mode enabled
- **Zero `any` types** — fully type-safe across all modules
- **Tree-shakeable** — modular ESM / CJS / UMD exports for optimal bundle size
- **Comprehensive tests** — 173 passing tests covering edge cases and real-world usage
- **JSDoc documentation** — complete API documentation with inline examples
- **Zero dependencies** — no runtime dependencies (optional `dayjs` peer dependency for date utils)

## Installation

```bash
pnpm add @rainbow-oh/yee-tools
```

## Usage

```typescript
import { StringUtils, NumberUtils, DateUtils, SessionContext } from '@rainbow-oh/yee-tools';

// String utilities
const cleaned = StringUtils.trim('  hello  '); // 'hello'
const empty = StringUtils.isBlank('   '); // true

// Precise floating-point arithmetic
const sum = NumberUtils.add(0.1, 0.2); // 0.3
const product = NumberUtils.multiply(0.1, 0.2); // 0.02

// Date utilities (requires dayjs peer dependency)
const formatted = DateUtils.getCurrentDateTime('YYYY-MM-DD HH:mm:ss');
```

Import specific modules for tree-shaking:

```typescript
import { StringUtils } from '@rainbow-oh/yee-tools/string';
import { NumberUtils } from '@rainbow-oh/yee-tools/number';
import { DateUtils } from '@rainbow-oh/yee-tools/date';
```

## Modules

### StringUtils

`trim`, `isEmpty`, `isNotEmpty`, `isBlank`, `isNotBlank`, `mask`

```typescript
StringUtils.mask('4111111111111111', 4, 4); // '4111********1111'
```

### NumberUtils

`add`, `subtract`, `multiply`, `divide`, `random`

```typescript
NumberUtils.add(0.1, 0.2);   // 0.3 (not 0.30000000000000004)
NumberUtils.divide(1, 3, 2); // 0.33
```

### DateUtils

`getCurrentDateTime`, `formatStringToDate`, `formatToSubmitFormat`, `formatToViewFormat`, `add`, `subtract`

> Requires `dayjs >= 1.11.11` as a peer dependency.

### ArrayUtils

`trimArray`, `isRepeat`, `repeatElement`, `unique`, `chunk`

```typescript
ArrayUtils.chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

### ObjectUtils

`clone`, `extend`, `merge`, `pick`, `omit`

```typescript
ObjectUtils.pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
```

### SecurityUtils

`escapeHTML`, `unescapeHTML`, `escapeHTMLAttribute`, `encodeJavaScriptIdentifier`, `encodeJavaScriptString`, `encodeCSSIdentifier`, `encodeCSSString`

```typescript
SecurityUtils.escapeHTML('<script>alert("xss")</script>');
// '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

### CookieUtils

`get`, `set`, `remove`

```typescript
CookieUtils.set('theme', 'dark', { expires: 7 });
const theme = CookieUtils.get('theme'); // 'dark'
```

### TypeUtils

`parseBool`, `isArray`, `isString`, `isNumber`, `isDate`, `isFunction`, `isObject`, `isNullOrUndefined`

### Cache

Four storage strategies with the same `get`/`set`/`remove`/`clear` API:

| Module | Storage | Lifecycle |
|---|---|---|
| `SessionContext` | `sessionStorage` | Cleared on browser close |
| `LocalContext` | `localStorage` | Persists until cleared |
| `PageContext` | In-memory | Cleared on page navigation |
| `StoreContext` | IndexedDB | Persists across sessions |

```typescript
import { SessionContext, LocalContext, PageContext, StoreContext } from '@rainbow-oh/yee-tools/cache';
```

### HTTP Client

Lightweight HTTP client with interceptor support:

```typescript
import { ax } from '@rainbow-oh/yee-tools/fetch';

// Add auth header via interceptor
ax.interceptors.request.use(({ config }) => {
  const token = sessionStorage.getItem('Authorization');
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
});

// Make requests
const users = await ax.get('/api/users');
const result = await ax.post('/api/users', { name: 'John' });
```

### i18n

Internationalization utilities for multi-language support:

```typescript
import { I18nUtils } from '@rainbow-oh/yee-tools/i18n';
```

### Platform-dependent Modules

The following modules depend on specific backend services and are designed for use within the Yee platform:

- **codetable** (`@rainbow-oh/yee-tools/codetable`) — Requires Yee backend API endpoints for code table data
- **url** (`@rainbow-oh/yee-tools/url`) — `normalizeURL` uses platform-specific routing logic (tenant-aware URL prefixes)

These modules can still be imported but will not function correctly without the matching backend services.

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build
pnpm build

# Build with type definitions
pnpm build:all
```

## Contributing

See the root [Contributing Guide](https://github.com/InsureMO/oh-yee/blob/main/CONTRIBUTING.md).

## License

[MIT](./LICENSE) © [InsureMO](https://github.com/InsureMO)
