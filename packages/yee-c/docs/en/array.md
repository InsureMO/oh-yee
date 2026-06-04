# Array Utils

Array manipulation utility functions.

## Installation

```bash
npm install @rainbow-oh/yee-tools
```

## Import Methods

### Method 1: Namespace Import (Recommended)

Best for scenarios where you need to use multiple array utility functions:

```typescript
import { ArrayUtils } from '@rainbow-oh/yee-tools';

ArrayUtils.unique([1, 2, 2, 3]);
ArrayUtils.chunk([1, 2, 3, 4], 2);
```

### Method 2: Tree Shaking

Best for scenarios where you only need a single function:

```typescript
import { unique, chunk } from '@rainbow-oh/yee-tools/array';

unique([1, 2, 2, 3]);
chunk([1, 2, 3, 4], 2);
```

## API

### trimArray

Removes whitespace from all string elements in an array.

```typescript
function trimArray(array: string[]): string[]
```

**Example:**

```typescript
import { ArrayUtils } from '@rainbow-oh/yee-tools';

ArrayUtils.trimArray([' hello ', ' world ', ' test ']);
// => ['hello', 'world', 'test']
```

---

### isRepeat

Checks if an array contains duplicate elements.

```typescript
function isRepeat<T>(array: T[]): boolean
```

**Example:**

```typescript
import { ArrayUtils } from '@rainbow-oh/yee-tools';

ArrayUtils.isRepeat([1, 2, 3, 2]);
// => true

ArrayUtils.isRepeat([1, 2, 3]);
// => false
```

---

### repeatElement

Finds the first duplicate element in an array.

```typescript
function repeatElement<T>(array: T[]): T | null
```

**Example:**

```typescript
import { ArrayUtils } from '@rainbow-oh/yee-tools';

ArrayUtils.repeatElement([1, 2, 3, 2, 4]);
// => 2

ArrayUtils.repeatElement([1, 2, 3]);
// => null
```

---

### unique

Removes duplicate elements from an array.

```typescript
function unique<T>(array: T[]): T[]
```

**Example:**

```typescript
import { ArrayUtils } from '@rainbow-oh/yee-tools';

ArrayUtils.unique([1, 2, 2, 3, 3, 4]);
// => [1, 2, 3, 4]

ArrayUtils.unique(['a', 'b', 'a', 'c']);
// => ['a', 'b', 'c']
```

---

### chunk

Chunks an array into smaller arrays of a specified size.

```typescript
function chunk<T>(array: T[], size: number): T[][]
```

**Parameters:**
- `array`: The array to chunk
- `size`: The size of each chunk (must be greater than 0)

**Example:**

```typescript
import { ArrayUtils } from '@rainbow-oh/yee-tools';

ArrayUtils.chunk([1, 2, 3, 4, 5], 2);
// => [[1, 2], [3, 4], [5]]

ArrayUtils.chunk([1, 2, 3, 4, 5, 6], 3);
// => [[1, 2, 3], [4, 5, 6]]

ArrayUtils.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
```

**Common Use Cases:**

```typescript
import { ArrayUtils } from '@rainbow-oh/yee-tools';

// Pagination
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pageSize = 3;
const pages = ArrayUtils.chunk(items, pageSize);
// => [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]

// Batch processing
const users = await ArrayUtils.chunk(userIds, 100).map(async (batch) => {
  return await fetchUsers(batch);
});
```
