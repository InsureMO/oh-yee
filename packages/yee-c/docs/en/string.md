# String Utils

String manipulation utility functions.

## Installation

```bash
npm install @oh/yee-tools
```

## Import Methods

### Method 1: Namespace Import (Recommended)

Best for scenarios where you need to use multiple string utility functions:

```typescript
import { StringUtils } from '@oh/yee-tools';

StringUtils.trim('  hello  ');
StringUtils.isEmpty('hello');
```

### Method 2: Tree Shaking

Best for scenarios where you only need a single function:

```typescript
import { trim, isEmpty } from '@oh/yee-tools/string';

trim('  hello  ');
isEmpty('hello');
```

## API

### trim

Removes whitespace from the beginning and end of a string.

```typescript
function trim(str: string): string
```

**Example:**

```typescript
import { trim } from '@oh/yee-tools/string';

trim('  hello  ');
// => 'hello'

trim('  foo bar  ');
// => 'foo bar'
```

---

### isEmpty

Checks if a string is empty (length equals 0).

```typescript
function isEmpty(str: string): boolean
```

**Example:**

```typescript
import { isEmpty } from '@oh/yee-tools/string';

isEmpty('');
// => true

isEmpty('hello');
// => false
```

---

### isNotEmpty

Checks if a string is not empty.

```typescript
function isNotEmpty(str: string): boolean
```

**Example:**

```typescript
import { isNotEmpty } from '@oh/yee-tools/string';

isNotEmpty('hello');
// => true

isNotEmpty('');
// => false
```

---

### isBlank

Checks if a string is blank (null, undefined, or only whitespace).

```typescript
function isBlank(str: string | null | undefined): boolean
```

**Example:**

```typescript
import { isBlank } from '@oh/yee-tools/string';

isBlank(null);
// => true

isBlank('   ');
// => true

isBlank('hello');
// => false
```

---

### isNotBlank

Checks if a string is not blank.

```typescript
function isNotBlank(str: string | null | undefined): boolean
```

**Example:**

```typescript
import { isNotBlank } from '@oh/yee-tools/string';

isNotBlank('hello');
// => true

isNotBlank('   ');
// => false
```

---

### mask

Masks portions of a string based on a mask pattern.

```typescript
function mask(value: string | null | undefined, maskPattern: string): string
```

**Parameters:**
- `value`: The string to mask
- `maskPattern`: Mask pattern (format: `"maskChar:(start,end)[,...]|[excludeChars]"`)

**Example:**

```typescript
import { mask } from '@oh/yee-tools/string';

// Mask first 3 characters
mask('1234567890', '*:(0,3)');
// => '***4567890'

// Mask last 4 characters
mask('1234567890', '*:(-4)');
// => '123456****'

// Phone number masking
mask('13812345678', '*:(3,7)');
// => '138****5678'
```

**Common Use Cases:**

```typescript
// Phone number masking
mask('13812345678', '*:(3,7)');
// => '138****5678'

// ID card masking
mask('110101199001011234', '*:(6,14)');
// => '110101********1234'

// Bank card masking
mask('6222021234567890123', '*:(6,16)');
// => '622202**********0123'
```
