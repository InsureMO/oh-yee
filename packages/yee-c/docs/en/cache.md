# Cache

Cache management tools providing three different lifecycle strategies.

## Installation

```bash
npm install @rainbow-oh/yee-tools
```

## Import Methods

### Method 1: Namespace Import (Recommended)

```typescript
import { SessionContext, LocalContext, PageContext } from '@rainbow-oh/yee-tools/cache';

// Or import directly
import { SessionContext } from '@rainbow-oh/yee-tools';
import { LocalContext } from '@rainbow-oh/yee-tools';
import { PageContext } from '@rainbow-oh/yee-tools';
```

### Method 2: Tree Shaking

```typescript
import { SessionContext } from '@rainbow-oh/yee-tools/cache/session';
import { LocalContext } from '@rainbow-oh/yee-tools/cache/local';
import { PageContext } from '@rainbow-oh/yee-tools/cache/page';
```

## Cache Type Comparison

| Type | Storage | Lifecycle | Use Cases |
|------|---------|-----------|-----------|
| **SessionContext** | sessionStorage | Cleared on browser close | User session data, temporary state |
| **LocalContext** | localStorage | Persistent (until manually cleared) | User preferences, persistent data |
| **PageContext** | Memory (Map) | Cleared on page refresh | Page-level temporary data, component sharing |

---

## SessionContext

Session-level cache using `sessionStorage`, automatically cleared when browser closes.

### API

```typescript
// Store data
SessionContext.put<T>(key: string, value: T): T

// Deep merge storage (supports paths like 'person.sport.like')
SessionContext.set<T>(key: string, value: T): unknown

// Get data
SessionContext.get<T>(key: string, parse?: boolean): T | null

// Remove data
SessionContext.remove(key: string): void

// Clear all data
SessionContext.clear(): void

// Get all keys
SessionContext.keys(): string[]

// Check if key exists
SessionContext.has(key: string): boolean

// Check storage space
SessionContext.checkSize(maxSizeKB: number): boolean
```

### Example

```typescript
import { SessionContext } from '@rainbow-oh/yee-tools';

// Store user token
SessionContext.put('Authorization', 'Bearer token123');

// Store user info
SessionContext.put('userInfo', { id: 1, name: 'John' });

// Deep merge storage
SessionContext.set('user.profile.theme', 'dark');

// Get data
const token = SessionContext.get('Authorization');
const user = SessionContext.get('userInfo');

// Check if exists
if (SessionContext.has('userInfo')) {
  console.log('User is logged in');
}

// Clear specific data
SessionContext.remove('userInfo');

// Clear all on logout
SessionContext.clear();
```

---

## LocalContext

Local cache using `localStorage`, data persists permanently.

### API

```typescript
// Store data
LocalContext.put<T>(key: string, value: T): T

// Get data
LocalContext.get<T>(key: string, parse?: boolean): T | null

// Remove data
LocalContext.remove(key: string): void

// Clear all data
LocalContext.clear(): void

// Get all keys
LocalContext.keys(): string[]

// Check if key exists
LocalContext.has(key: string): boolean

// Check storage space
LocalContext.checkSize(maxSizeKB: number): boolean
```

### Example

```typescript
import { LocalContext } from '@rainbow-oh/yee-tools';

// Store user preferences
LocalContext.put('preferences', {
  theme: 'dark',
  language: 'en',
  fontSize: 14
});

// Get preferences
const prefs = LocalContext.get('preferences');
if (prefs) {
  applyTheme(prefs.theme);
}

// Check storage space
if (!LocalContext.checkSize(5000)) {
  console.warn('Storage space is low');
}

// Clear old data
LocalContext.remove('oldCache');
```

---

## PageContext

Page-level cache using in-memory Map, automatically cleared on page refresh.

### API

```typescript
// Store data
PageContext.put(key: string, value: unknown): void

// Get data
PageContext.get<T>(key: string): T | undefined

// Remove data
PageContext.remove(key: string): void

// Clear all data
PageContext.clear(): void

// Get all keys
PageContext.keys(): IterableIterator<string>

// Get all values
PageContext.values(): IterableIterator<unknown>

// Get all entries
PageContext.entries(): IterableIterator<[string, unknown]>

// Check if key exists
PageContext.has(key: string): boolean

// Get item count
PageContext.size(): number
```

### Example

```typescript
import { PageContext } from '@rainbow-oh/yee-tools';

// Store page data
PageContext.put('formData', { name: 'John', email: 'john@example.com' });

// Get data
const form = PageContext.get('formData');

// Iterate all data
for (const [key, value] of PageContext.entries()) {
  console.log(key, value);
}

// Get item count
console.log(`Cached items: ${PageContext.size()}`);

// Clear on route change
function onRouteChange() {
  PageContext.clear();
}
```

## Common Use Cases

### User Authentication State

```typescript
import { SessionContext } from '@rainbow-oh/yee-tools';

// Login
function login(token: string, user: User) {
  SessionContext.put('Authorization', token);
  SessionContext.put('userInfo', user);
}

// Check login status
function isLoggedIn(): boolean {
  return SessionContext.has('Authorization');
}

// Logout
function logout() {
  SessionContext.clear();
}
```

### User Preferences

```typescript
import { LocalContext } from '@rainbow-oh/yee-tools';

// Save preferences
function savePreferences(prefs: Preferences) {
  LocalContext.put('preferences', prefs);
}

// Load preferences
function loadPreferences(): Preferences {
  return LocalContext.get('preferences') || defaultPreferences;
}

// Update theme
function updateTheme(theme: string) {
  const prefs = loadPreferences();
  prefs.theme = theme;
  LocalContext.put('preferences', prefs);
}
```

### Form Data Draft

```typescript
import { PageContext } from '@rainbow-oh/yee-tools';

// Save form draft
function saveDraft(formData: FormData) {
  PageContext.put('draftForm', formData);
}

// Restore form
function restoreDraft(): FormData | undefined {
  return PageContext.get('draftForm');
}

// Clear after submit
function onSubmit() {
  submitForm(PageContext.get('draftForm'));
  PageContext.remove('draftForm');
}
```

### Mixed Strategy

```typescript
import { SessionContext, LocalContext, PageContext } from '@rainbow-oh/yee-tools';

// 1. Sensitive data in SessionContext (auto-clear on session end)
SessionContext.put('token', authToken);
SessionContext.put('temporaryState', tempData);

// 2. User preferences in LocalContext (persistent)
LocalContext.put('userPreferences', preferences);
LocalContext.put('recentSearches', searches);

// 3. Page temporary data in PageContext (clear on refresh)
PageContext.put('currentPageData', pageData);
PageContext.put('formDraft', formData);
```

## Notes

1. **Storage limits**: localStorage/sessionStorage typically limited to 5-10MB
2. **Sensitive data**: Avoid storing sensitive information in LocalContext
3. **JSON serialization**: Complex objects are automatically serialized/deserialized
4. **Synchronous operations**: All operations are synchronous, large data may block
5. **Page refresh**: PageContext data is lost after refresh
