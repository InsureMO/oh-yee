# URL Utils

URL processing utility functions.

## Installation

```bash
npm install @rainbow-oh/yee-tools
```

## Import Methods

### Method 1: Namespace Import (Recommended)

Best for scenarios where you need to use multiple URL utility functions:

```typescript
import { UrlUtils } from '@rainbow-oh/yee-tools';

UrlUtils.getUrlParam();
UrlUtils.buildQueryString({ id: '123' });
UrlUtils.updateUrlParams('http://example.com', { page: 1 });
```

### Method 2: Tree Shaking

Best for scenarios where you only need a single function:

```typescript
import { getUrlParam, buildQueryString, updateUrlParams } from '@rainbow-oh/yee-tools/url';

getUrlParam();
buildQueryString({ id: '123' });
updateUrlParams('http://example.com', { page: 1 });
```

## API

### getUrlParam

Parses URL query parameters into an object.

Supports both regular URLs and hash-based routing URLs (e.g., `#/path?param=value`).

```typescript
function getUrlParam(urlStr?: string): Record<string, string>
```

**Parameters:**
- `urlStr`: Optional URL string. If not provided, uses current `location.search`

**Example:**

```typescript
import { UrlUtils } from '@rainbow-oh/yee-tools';

// Parse current URL
// Current URL: http://example.com?id=123&name=test
UrlUtils.getUrlParam();
// => { id: '123', name: 'test' }

// Parse specific URL
UrlUtils.getUrlParam('http://example.com?id=123&name=test');
// => { id: '123', name: 'test' }

// Parse hash routing URL
UrlUtils.getUrlParam('http://example.com?lang=en#/page?id=123');
// => { lang: 'en', id: '123' }
```

---

### buildQueryString

Converts an object to a query string.

```typescript
function buildQueryString(params: Record<string, string | number | boolean>): string
```

**Parameters:**
- `params`: Object containing parameters

**Returns:**
- Query string (without leading `?`)

**Example:**

```typescript
import { UrlUtils } from '@rainbow-oh/yee-tools';

UrlUtils.buildQueryString({ id: '123', name: 'test' });
// => 'id=123&name=test'

UrlUtils.buildQueryString({ page: 1, size: 20, active: true });
// => 'page=1&size=20&active=true'

// Empty object
UrlUtils.buildQueryString({});
// => ''
```

---

### updateUrlParams

Updates URL query parameters.

```typescript
function updateUrlParams(url: string, params: Record<string, string | number | boolean>): string
```

**Parameters:**
- `url`: Base URL
- `params`: Parameters to add/update

**Example:**

```typescript
import { UrlUtils } from '@rainbow-oh/yee-tools';

// Add parameters
UrlUtils.updateUrlParams('http://example.com', { id: '123' });
// => 'http://example.com?id=123'

// Update existing parameters
UrlUtils.updateUrlParams('http://example.com?name=test', { id: '123' });
// => 'http://example.com?name=test&id=123'

// Override existing parameters
UrlUtils.updateUrlParams('http://example.com?page=1', { page: 2 });
// => 'http://example.com?page=2'
```

---

### removeUrlParams

Removes specific query parameters from URL.

```typescript
function removeUrlParams(url: string, keysToRemove: string[]): string
```

**Parameters:**
- `url`: URL to modify
- `keysToRemove`: Array of parameter keys to remove

**Example:**

```typescript
import { UrlUtils } from '@rainbow-oh/yee-tools';

// Remove single parameter
UrlUtils.removeUrlParams('http://example.com?id=123&name=test', ['id']);
// => 'http://example.com?name=test'

// Remove multiple parameters
UrlUtils.removeUrlParams('http://example.com?id=123&name=test&page=1', ['id', 'page']);
// => 'http://example.com?name=test'

// Remove all parameters
UrlUtils.removeUrlParams('http://example.com?id=123&name=test', ['id', 'name']);
// => 'http://example.com'
```

---

### normalizeURL

Normalizes a URL (internal use).

```typescript
function normalizeURL(url: string): string
```

## Common Use Cases

```typescript
import { UrlUtils } from '@rainbow-oh/yee-tools';

// Read URL parameters
function getProductId(): string {
  const params = UrlUtils.getUrlParam();
  return params.id || '';
}

// Build pagination links
function buildPageUrl(page: number): string {
  const baseUrl = '/products';
  return UrlUtils.updateUrlParams(baseUrl, { page, size: 20 });
}

// Search filters
function buildSearchUrl(filters: SearchFilters): string {
  return '/search?' + UrlUtils.buildQueryString(filters);
}

// Sanitize URL
function sanitizeUrl(url: string): string {
  return UrlUtils.removeUrlParams(url, ['token', 'session']);
}

// SPA routing
function handleRouteChange() {
  const params = UrlUtils.getUrlParam(window.location.href);
  const route = params.route;
  const id = params.id;
  // Handle route...
}
```
