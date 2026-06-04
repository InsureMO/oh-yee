# Cookie Utils

Cookie manipulation utility functions.

## Installation

```bash
npm install @rainbow-oh/yee-tools
```

## Import Methods

### Method 1: Namespace Import (Recommended)

Best for scenarios where you need to use multiple cookie utility functions:

```typescript
import { CookieUtils } from '@rainbow-oh/yee-tools';

CookieUtils.set('username', 'john_doe');
CookieUtils.get('username');
CookieUtils.remove('username');
```

### Method 2: Tree Shaking

Best for scenarios where you only need a single function:

```typescript
import { get, set, remove } from '@rainbow-oh/yee-tools/cookie';

set('username', 'john_doe');
get('username');
remove('username');
```

## API

### get

Gets a cookie value by name.

```typescript
function get(name: string, options?: CookieOptions | converter): unknown
```

**Parameters:**
- `name`: The name of the cookie
- `options`: Configuration options or a converter function

**Example:**

```typescript
import { CookieUtils } from '@rainbow-oh/yee-tools';

// Get string value
CookieUtils.get('username');
// => 'john_doe'

// With converter function
CookieUtils.get('data', JSON.parse);
// => { id: 1, name: 'John' }

// With options
CookieUtils.get('token', { converter: (value) => value.toUpperCase() });
// => 'ABC123'
```

---

### set

Sets a cookie.

```typescript
function set(name: string, value: unknown, options?: CookieOptions): string
```

**Parameters:**
- `name`: The name of the cookie
- `value`: The value to set
- `options`: Configuration options

**Options:**

```typescript
interface CookieOptions {
  expires?: number | Date;  // Expiration in days or as a Date object
  domain?: string;          // Cookie domain
  path?: string;            // Cookie path
  secure?: boolean;         // HTTPS only
  raw?: boolean;            // Skip URI encoding
  converter?: (value: string) => unknown;  // Converter function
}
```

**Example:**

```typescript
import { CookieUtils } from '@rainbow-oh/yee-tools';

// Basic cookie
CookieUtils.set('username', 'john_doe');

// With expiration (7 days)
CookieUtils.set('session', 'abc123', { expires: 7 });

// With path
CookieUtils.set('preference', 'dark', { path: '/' });

// Secure cookie
CookieUtils.set('token', 'secret', { secure: true, expires: 1 });

// Store object
CookieUtils.set('data', JSON.stringify({ id: 1, name: 'John' }));
```

---

### remove

Removes a cookie.

```typescript
function remove(name: string, options?: CookieOptions): string
```

**Parameters:**
- `name`: The name of the cookie to remove
- `options`: Configuration options (path and domain should match the original cookie)

**Example:**

```typescript
import { CookieUtils } from '@rainbow-oh/yee-tools';

// Remove basic cookie
CookieUtils.remove('username');

// Remove with path
CookieUtils.remove('session', { path: '/' });

// Remove with domain
CookieUtils.remove('token', { path: '/', domain: '.example.com' });
```

## Common Use Cases

```typescript
import { CookieUtils } from '@rainbow-oh/yee-tools';

// User session management
function login(username: string, remember: boolean) {
  const expires = remember ? 30 : 1; // 30 or 1 days
  CookieUtils.set('username', username, { expires, path: '/' });
  CookieUtils.set('isLoggedIn', 'true', { expires, path: '/' });
}

function logout() {
  CookieUtils.remove('username', { path: '/' });
  CookieUtils.remove('isLoggedIn', { path: '/' });
}

// User preferences
function savePreference(theme: 'light' | 'dark') {
  CookieUtils.set('theme', theme, { expires: 365, path: '/' });
}

function getPreference(): 'light' | 'dark' {
  return CookieUtils.get('theme') || 'light';
}

// Shopping cart
function saveCart(items: CartItem[]) {
  CookieUtils.set('cart', JSON.stringify(items), { expires: 7 });
}

function getCart(): CartItem[] {
  const data = CookieUtils.get('cart');
  return data ? JSON.parse(data as string) : [];
}
```

## Notes

1. **Match options when removing**: The `path` and `domain` must match when removing a cookie
2. **Size limit**: Cookies have size limitations (typically 4KB)
3. **Security**: Sensitive data should use `secure: true` and consider HttpOnly
4. **URI encoding**: Values are URI-encoded by default, set `raw: true` to disable
