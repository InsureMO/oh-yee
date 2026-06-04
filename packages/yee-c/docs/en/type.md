# Type Utils

Type checking and conversion utility functions.

## Installation

```bash
npm install @rainbow-oh/yee-tools
```

## Import Methods

### Method 1: Namespace Import (Recommended)

Best for scenarios where you need to use multiple type utility functions:

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.isArray([1, 2, 3]);
TypeUtils.isString('hello');
TypeUtils.parseBool('true');
```

### Method 2: Tree Shaking

Best for scenarios where you only need a single function:

```typescript
import { isString, isNumber, parseBool } from '@rainbow-oh/yee-tools/type';

isString('hello');
isNumber(123);
parseBool('true');
```

## API

### parseBool

Converts a value to a boolean.

```typescript
function parseBool(input: unknown): boolean
```

**Example:**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.parseBool('true');
// => true

TypeUtils.parseBool('false');
// => false

TypeUtils.parseBool('1');
// => true

TypeUtils.parseBool('0');
// => false

TypeUtils.parseBool('y');
// => true

TypeUtils.parseBool('n');
// => false
```

**Values recognized as false:** `'false'`, `'0'`, `'null'`, `'undefined'`, `'n'`

---

### isArray

Checks if a value is an array.

```typescript
function isArray(value: unknown): value is unknown[]
```

**Example:**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.isArray([1, 2, 3]);
// => true

TypeUtils.isArray('hello');
// => false

TypeUtils.isArray(null);
// => false
```

---

### isString

Checks if a value is a string.

```typescript
function isString(value: unknown): value is string
```

**Example:**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.isString('hello');
// => true

TypeUtils.isString(123);
// => false
```

---

### isNumber

Checks if a value is a number.

```typescript
function isNumber(value: unknown): value is number
```

**Example:**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.isNumber(123);
// => true

TypeUtils.isNumber('123');
// => false

TypeUtils.isNumber(NaN);
// => false
```

---

### isDate

Checks if a value is a Date object.

```typescript
function isDate(value: unknown): value is Date
```

**Example:**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.isDate(new Date());
// => true

TypeUtils.isDate('2024-01-15');
// => false
```

---

### isFunction

Checks if a value is a function.

```typescript
function isFunction(value: unknown): value is Function
```

**Example:**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.isFunction(() => {});
// => true

TypeUtils.isFunction('hello');
// => false
```

---

### isObject

Checks if a value is a plain object.

```typescript
function isObject(value: unknown): value is Record<string, unknown>
```

**Example:**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.isObject({});
// => true

TypeUtils.isObject([]);
// => false (arrays are not plain objects)

TypeUtils.isObject(null);
// => false
```

---

### isNullOrUndefined

Checks if a value is null or undefined.

```typescript
function isNullOrUndefined(value: unknown): value is null | undefined
```

**Example:**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.isNullOrUndefined(null);
// => true

TypeUtils.isNullOrUndefined(undefined);
// => true

TypeUtils.isNullOrUndefined(0);
// => false

TypeUtils.isNullOrUndefined('');
// => false
```

---

### isIE

Checks if the current browser is Internet Explorer.

```typescript
function isIE(): boolean
```

**Example:**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

if (TypeUtils.isIE()) {
  console.log('Running in IE browser');
}
```

## Common Use Cases

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

// Data validation
function processValue(value: unknown) {
  if (TypeUtils.isString(value)) {
    return value.toUpperCase();
  } else if (TypeUtils.isNumber(value)) {
    return value.toFixed(2);
  }
  return value;
}

// Environment variable parsing
const debugMode = TypeUtils.parseBool(process.env.DEBUG);

// Type guards
if (TypeUtils.isArray(data)) {
  data.forEach(item => console.log(item));
}

// Null check
if (!TypeUtils.isNullOrUndefined(value)) {
  // Safe to use value
  console.log(value.toString());
}
```
