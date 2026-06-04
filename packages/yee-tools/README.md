# @oh/yee-tools

A modern, type-safe TypeScript utility library.

## Features

- **100% TypeScript** with strict mode enabled
- **Zero `any` types** - fully type-safe
- **Comprehensive test coverage** - 173 passing tests
- **Modern ES6+ syntax** - arrow functions, optional chaining, destructuring
- **Defensive programming** - handles null/undefined and edge cases
- **JSDoc documentation** - complete API documentation with examples
- **Tree-shakeable** - modular exports for optimal bundle size

## Installation

```bash
npm install @oh/yee-tools
```

## Usage

```typescript
import { StringUtils, NumberUtils, SessionContext } from "@oh/yee-tools";

// String utilities
const cleaned = StringUtils.trim("  hello  "); // 'hello'
const empty = StringUtils.isBlank("   "); // true

// Precise floating-point arithmetic
const sum = NumberUtils.add(0.1, 0.2); // 0.3 (not 0.30000000000000004)
const product = NumberUtils.multiply(0.1, 0.2); // 0.02

// Session storage
SessionContext.put("token", "abc123");
const token = SessionContext.get("token");
```

### HTTP Client

The `fetch` module provides a lightweight HTTP client with interceptor support. Authentication and custom headers are injected via request interceptors:

```typescript
import { ax } from "@oh/yee-tools/fetch";

// Add auth header via interceptor
ax.interceptors.request.use(({ config }) => {
  const token = sessionStorage.getItem("Authorization");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// Make requests
const users = await ax.get("/api/users");
const result = await ax.post("/api/users", { name: "John" });
```

## Modules

### String Utilities

- `trim` - Trim whitespace
- `isEmpty` / `isNotEmpty` - Check if string is empty
- `isBlank` / `isNotBlank` - Check if string is null/undefined/whitespace
- `mask` - Mask portions of strings (e.g., credit cards)

### Number Utilities

- `add` - Precise floating-point addition
- `subtract` - Precise floating-point subtraction
- `multiply` - Precise floating-point multiplication
- `divide` - Precise floating-point division
- `random` - Generate random integers

### Date Utilities

- `getCurrentDateTime` - Get current date/time formatted
- `formatStringToDate` - Parse and format date strings
- `formatToSubmitFormat` / `formatToViewFormat` - Format dates
- `add` / `subtract` - Add/subtract time from dates

### Array Utilities

- `trimArray` - Trim all strings in array
- `isRepeat` - Check for duplicates
- `repeatElement` - Find first duplicate
- `unique` - Remove duplicates
- `chunk` - Split array into chunks

### Object Utilities

- `clone` - Deep clone objects/arrays
- `extend` - Extend objects (shallow/deep)
- `merge` - Merge multiple objects
- `pick` - Pick specific properties
- `omit` - Omit specific properties

### Security Utilities

- `escapeHTML` / `unescapeHTML` - HTML escaping
- `escapeHTMLAttribute` - Escape HTML attributes
- `encodeJavaScriptIdentifier` / `encodeJavaScriptString` - JS encoding
- `encodeCSSIdentifier` / `encodeCSSString` - CSS encoding

### Cookie Utilities

- `get` - Get cookie value
- `set` - Set cookie with options
- `remove` - Remove cookie

### Type Utilities

- `parseBool` - Convert values to boolean
- `isArray` / `isString` / `isNumber` / `isDate` / `isFunction` / `isObject` - Type checking
- `isNullOrUndefined` - Check for null/undefined
- `isIE` - Detect Internet Explorer

### Cache Utilities

- `SessionContext` - Session storage (cleared on browser close)
- `LocalContext` - Local storage (persists until cleared)
- `PageContext` - In-memory storage (cleared on page navigation)

### Platform-dependent Modules

The following modules depend on specific backend services and are designed for use within the Yee platform:

- **codetable** (`@oh/yee-tools/codetable`) - Requires Yee backend API endpoints for code table data. Hardcoded API paths include `/dd/public/codetable/v1/...`.
- **url** (`@oh/yee-tools/url`) - `normalizeURL` uses platform-specific routing logic (tenant-aware URL prefixes).

These modules can still be imported but will not function correctly without the matching backend services.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build
npm run build

# Build with type definitions
npm run build:all
```

## Testing

The library has comprehensive test coverage with 173 passing tests covering:

- Edge cases and boundary conditions
- Null/undefined handling
- Type safety
- Error conditions
- Real-world usage scenarios

## License

MIT
