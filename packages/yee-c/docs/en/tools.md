# Tools

`@oh/yee-tools` is a collection of lightweight, zero-dependency JavaScript/TypeScript utility libraries for common development tasks.

## Installation

```bash
npm install @oh/yee-tools
# or
pnpm add @oh/yee-tools
```

## Import Methods

### Method 1: Namespace Import (Recommended)

Best for scenarios where you need to use multiple functions from a category:

```typescript
// String utilities
import { StringUtils } from '@oh/yee-tools';

// Date utilities
import { DateUtils } from '@oh/yee-tools';

// Array utilities
import { ArrayUtils } from '@oh/yee-tools';
```

### Method 2: Tree Shaking

Best for scenarios where you only need a single function, can further reduce bundle size:

```typescript
// String utilities
import { trim } from '@oh/yee-tools/string';

// Date utilities
import { formatDate } from '@oh/yee-tools/date';

// Array utilities
import { uniq } from '@oh/yee-tools/array';
```

## Categories

### [String](./string)
String manipulation utilities including formatting, truncation, conversion, etc.

### [Number](./number)
Number processing utilities including formatting, precision handling, etc.

### [Date](./date)
Date and time utilities based on dayjs.

### [Array](./array)
Array manipulation utilities including deduplication, sorting, searching, etc.

### [Object](./object)
Object manipulation utilities including deep clone, merge, path access, etc.

### [Security](./security)
Security-related utilities including encryption, encoding, etc.

### [Cookie](./cookie)
Cookie manipulation utilities.

### [Type](./type)
Type checking and conversion utilities.

### [URL](./url)
URL processing utilities.

### [Cache](./cache)
Cache management tools including Session, Local, and Page cache.

### [Config](./config)
Configuration management tools including config provider and session config.

### [Fetch](./fetch)
Fetch API wrapper with interceptors and cache optimization.

### [I18n](./i18n)
Internationalization utilities with multi-language support.

## Features

- 📦 **Lightweight**: Zero dependencies (except dayjs)
- 🎯 **Tree Shaking**: Support module-based imports
- 🔒 **TypeScript**: Full type definitions
- ✅ **Tested**: Comprehensive unit tests
- 🚀 **Performance**: High-performance implementation

## Quick Start

### Using Namespace Import

```typescript
import { StringUtils, DateUtils, ArrayUtils } from '@oh/yee-tools';

// String manipulation
const str = StringUtils.trim('  hello  ');
// => 'hello'

// Date formatting
const date = DateUtils.getCurrentDateTime();
// => '2026-03-02 14:30:00'

// Array deduplication
const arr = ArrayUtils.uniq([1, 2, 2, 3, 3, 3]);
// => [1, 2, 3]
```

### Using Tree Shaking

```typescript
import { trim } from '@oh/yee-tools/string';
import { getCurrentDateTime } from '@oh/yee-tools/date';
import { uniq } from '@oh/yee-tools/array';

// String manipulation
const str = trim('  hello  ');
// => 'hello'

// Date formatting
const date = getCurrentDateTime();
// => '2026-03-02 14:30:00'

// Array deduplication
const arr = uniq([1, 2, 2, 3, 3, 3]);
// => [1, 2, 3]
```
