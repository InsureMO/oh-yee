# Object Utils

Object manipulation utility functions.

## Installation

```bash
npm install @oh/yee-tools
```

## Import Methods

### Method 1: Namespace Import (Recommended)

Best for scenarios where you need to use multiple object utility functions:

```typescript
import { ObjectUtils } from '@oh/yee-tools';

ObjectUtils.clone({ a: 1, b: { c: 2 } });
ObjectUtils.pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);
```

### Method 2: Tree Shaking

Best for scenarios where you only need a single function:

```typescript
import { clone, pick, omit } from '@oh/yee-tools/object';

clone({ a: 1, b: { c: 2 } });
pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);
omit({ a: 1, b: 2, c: 3 }, ['b']);
```

## API

### clone

Deep clones an object or array.

```typescript
function clone<T>(obj: T): T
```

**Example:**

```typescript
import { ObjectUtils } from '@oh/yee-tools';

const original = { a: 1, b: { c: 2 } };
const cloned = ObjectUtils.clone(original);

cloned.b.c = 3;
console.log(original.b.c); // 2 (original is unaffected)

// Supports arrays
const arr = [1, [2, 3]];
const arrClone = ObjectUtils.clone(arr);
arrClone[1][0] = 99;
console.log(arr[1][0]); // 2
```

---

### extend

Extends a target object with properties from a source object.

```typescript
function extend<T, S>(target: T, source: S, deep?: boolean): T & S
```

**Parameters:**
- `target`: The target object to extend
- `source`: The source object to copy properties from
- `deep`: Whether to perform a deep merge (default: false)

**Example:**

```typescript
import { ObjectUtils } from '@oh/yee-tools';

// Shallow merge
const target = { a: 1 };
const source = { b: 2 };
ObjectUtils.extend(target, source);
// => { a: 1, b: 2 }

// Deep merge
const target1 = { a: { x: 1 } };
const source1 = { a: { y: 2 } };
ObjectUtils.extend(target1, source1, true);
// => { a: { x: 1, y: 2 } }
```

---

### merge

Merges multiple objects into a single object.

```typescript
function merge<T>(...objects: Partial<T>[]): Partial<T>
```

**Example:**

```typescript
import { ObjectUtils } from '@oh/yee-tools';

ObjectUtils.merge({ a: 1 }, { b: 2 }, { c: 3 });
// => { a: 1, b: 2, c: 3 }

const defaults = { theme: 'light', lang: 'en' };
const userConfig = { theme: 'dark' };
ObjectUtils.merge(defaults, userConfig);
// => { theme: 'dark', lang: 'en' }
```

---

### pick

Picks specified properties from an object.

```typescript
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
```

**Example:**

```typescript
import { ObjectUtils } from '@oh/yee-tools';

const user = {
  id: 1,
  name: 'Alice',
  password: 'secret',
  email: 'alice@example.com'
};

// Pick only needed properties
const publicUser = ObjectUtils.pick(user, ['id', 'name', 'email']);
// => { id: 1, name: 'Alice', email: 'alice@example.com' }
```

---

### omit

Omits specified properties from an object.

```typescript
function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
```

**Example:**

```typescript
import { ObjectUtils } from '@oh/yee-tools';

const user = {
  id: 1,
  name: 'Alice',
  password: 'secret',
  email: 'alice@example.com'
};

// Remove sensitive properties
const safeUser = ObjectUtils.omit(user, ['password']);
// => { id: 1, name: 'Alice', email: 'alice@example.com' }

// Remove multiple properties
const minimalUser = ObjectUtils.omit(user, ['password', 'email']);
// => { id: 1, name: 'Alice' }
```

## Common Use Cases

```typescript
import { ObjectUtils } from '@oh/yee-tools';

// Config merging
const defaultConfig = { theme: 'light', pageSize: 10 };
const userConfig = { theme: 'dark' };
const finalConfig = ObjectUtils.merge(defaultConfig, userConfig);

// Data sanitization
const user = { id: 1, name: 'Alice', password: 'secret', token: 'xxx' };
const publicUser = ObjectUtils.omit(user, ['password', 'token']);

// Deep copy to avoid mutating original data
const originalData = { items: [1, 2, 3] };
const workingCopy = ObjectUtils.clone(originalData);
workingCopy.items.push(4);
// originalData.items is still [1, 2, 3]
```
