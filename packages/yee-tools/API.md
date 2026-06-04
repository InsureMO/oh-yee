# @rainbow-oh/yee-tools API Reference

Complete utility function API reference

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [StringUtils - String Utilities](#stringutils---string-utilities)
- [NumberUtils - Number Utilities](#numberutils---number-utilities)
- [DateUtils - Date Utilities](#dateutils---date-utilities)
- [ArrayUtils - Array Utilities](#arrayutils---array-utilities)
- [ObjectUtils - Object Utilities](#objectutils---object-utilities)
- [SecurityUtils - Security Utilities](#securityutils---security-utilities)
- [CookieUtils - Cookie Utilities](#cookieutils---cookie-utilities)
- [TypeUtils - Type Utilities](#typeutils---type-utilities)
- [URLUtils - URL Utilities](#urlutils---url-utilities)
- [Cache - Cache Utilities](#cache---cache-utilities)
- [Config - Configuration Utilities](#config---configuration-utilities)

---

## Installation

```bash
npm install @rainbow-oh/yee-tools
```

## Usage

### Full Import

```typescript
import * as YeeTools from "@rainbow-oh/yee-tools";

YeeTools.StringUtils.trim("  hello  ");
```

### Sub-module Import (Recommended)

```typescript
import { trim, isBlank } from "@rainbow-oh/yee-tools/string";
import { add, multiply } from "@rainbow-oh/yee-tools/number";

trim("  hello  ");
add(0.1, 0.2);
```

### Namespace Import

```typescript
import * as StringUtils from "@rainbow-oh/yee-tools/string";
import * as NumberUtils from "@rainbow-oh/yee-tools/number";

StringUtils.trim("  hello  ");
NumberUtils.add(0.1, 0.2);
```

---

## StringUtils - String Utilities

Import: `import { ... } from '@rainbow-oh/yee-tools/string'`

### trim

Removes leading and trailing whitespace from a string

```typescript
trim(str: string): string
```

**Examples:**

```typescript
trim("  hello  "); // 'hello'
trim("  hello world  "); // 'hello world'
```

---

### isEmpty

Checks if the string length is 0

```typescript
isEmpty(str: string): boolean
```

**Examples:**

```typescript
isEmpty(""); // true
isEmpty("hello"); // false
```

---

### isNotEmpty

Checks if the string length is not 0

```typescript
isNotEmpty(str: string): boolean
```

**Examples:**

```typescript
isNotEmpty("hello"); // true
isNotEmpty(""); // false
```

---

### isBlank

Checks if a string is blank (null, undefined, or contains only whitespace)

```typescript
isBlank(str: string | null | undefined): boolean
```

**Examples:**

```typescript
isBlank(null); // true
isBlank("   "); // true
isBlank("hello"); // false
```

---

### isNotBlank

Checks if a string is not blank

```typescript
isNotBlank(str: string | null | undefined): boolean
```

**Examples:**

```typescript
isNotBlank("hello"); // true
isNotBlank("   "); // false
isNotBlank(null); // false
```

---

### mask

Masks part of a string based on a mask pattern

```typescript
mask(value: string | null | undefined, maskPattern: string): string
```

**Parameters:**

- `value` - The string to mask
- `maskPattern` - Mask pattern (format: `maskChar:(start,end)[,...]|[excludeChars]`)

**Examples:**

```typescript
mask("1234567890", "*:(0,3)"); // '***4567890'
mask("1234567890", "*:(-4)"); // '123456****'
mask("13800138000", "*:(3,7)"); // '138****8000'
```

---

## NumberUtils - Number Utilities

Import: `import { ... } from '@rainbow-oh/yee-tools/number'`

### add

Precise floating-point addition

```typescript
add(arg1: number, arg2: number): number
```

**Examples:**

```typescript
add(0.1, 0.2); // 0.3 (instead of 0.30000000000000004)
add(1.5, 2.3); // 3.8
```

---

### subtract

Precise floating-point subtraction

```typescript
subtract(arg1: number, arg2: number): string
```

**Examples:**

```typescript
subtract(0.3, 0.1); // '0.2' (instead of 0.19999999999999998)
subtract(5.5, 2.3); // '3.2'
```

---

### multiply

Precise floating-point multiplication

```typescript
multiply(arg1: number, arg2: number): number
```

**Examples:**

```typescript
multiply(0.1, 0.2); // 0.02 (instead of 0.020000000000000004)
multiply(3.5, 2); // 7
```

---

### divide

Precise floating-point division

```typescript
divide(arg1: number, arg2: number): number
```

**Examples:**

```typescript
divide(0.3, 0.1); // 3 (instead of 2.9999999999999996)
divide(10, 3); // 3.3333333333333335
```

---

### random

Generates a random integer within the specified range (inclusive)

```typescript
random(min: number, max: number): number
```

**Examples:**

```typescript
random(1, 10); // e.g. 7
random(0, 100); // e.g. 42
```

---

## DateUtils - Date Utilities

Import: `import { ... } from '@rainbow-oh/yee-tools/date'`

Built on [dayjs](https://day.js.org/)

### getCurrentDateTime

Returns the current date and time as a formatted string

```typescript
getCurrentDateTime(format?: string): string
```

**Parameters:**

- `format` - Optional, date format (default: `'YYYY-MM-DD HH:mm:ss'`)

**Examples:**

```typescript
getCurrentDateTime(); // '2024-01-15 14:30:00'
getCurrentDateTime("YYYY-MM-DD"); // '2024-01-15'
getCurrentDateTime("HH:mm:ss"); // '14:30:00'
```

---

### formatStringToDate

Formats a date string into a standard format

```typescript
formatStringToDate(date: string, inputFormat: string, outputFormat?: string): string
```

**Parameters:**

- `date` - Date string
- `inputFormat` - Format of the input date
- `outputFormat` - Optional, output format (default: `'YYYY-MM-DD HH:mm:ss'`)

**Examples:**

```typescript
formatStringToDate("15/01/2024", "DD/MM/YYYY"); // '2024-01-15 00:00:00'
formatStringToDate("2024-01-15", "YYYY-MM-DD", "MM/DD/YYYY"); // '01/15/2024'
```

---

### formatToSubmitFormat

Formats a Date object into the submission format

```typescript
formatToSubmitFormat(date: Date | null | undefined, format?: string): string | null
```

**Parameters:**

- `date` - Date object
- `format` - Optional, date format (default: `'YYYY-MM-DD HH:mm:ss'`)

**Examples:**

```typescript
formatToSubmitFormat(new Date()); // '2024-01-15 14:30:00'
formatToSubmitFormat(null); // null
```

---

### formatToViewFormat

Formats a Date object into a display format

```typescript
formatToViewFormat(date: Date | null | undefined, format?: string): string | null
```

**Parameters:**

- `date` - Date object
- `format` - Optional, date format (default: `'YYYY-MM-DD HH:mm:ss'`)

**Examples:**

```typescript
formatToViewFormat(new Date()); // '2024-01-15 14:30:00'
formatToViewFormat(new Date(), "YYYY年MM月DD日"); // '2024年01月15日'
```

---

### add

Adds time to a date

```typescript
add(date: string | Date, amount: number, unit: DateUnit, format?: string): string
```

**Parameters:**

- `date` - Date string or Date object
- `amount` - Amount to add
- `unit` - Time unit (`'year'`, `'month'`, `'day'`, `'hour'`, `'minute'`, `'second'`, etc.)
- `format` - Optional, output format (default: `'YYYY-MM-DD HH:mm:ss'`)

**Examples:**

```typescript
add("2024-01-15", 1, "day"); // '2024-01-16 00:00:00'
add("2024-01-15", 2, "months", "YYYY-MM-DD"); // '2024-03-15'
add(new Date(), 3, "hours"); // Current time + 3 hours
```

---

### subtract

Subtracts time from a date

```typescript
subtract(date: string | Date, amount: number, unit: DateUnit, format?: string): string
```

**Parameters:**

- `date` - Date string or Date object
- `amount` - Amount to subtract
- `unit` - Time unit
- `format` - Optional, output format (default: `'YYYY-MM-DD HH:mm:ss'`)

**Examples:**

```typescript
subtract("2024-01-15", 1, "day"); // '2024-01-14 00:00:00'
subtract("2024-01-15", 2, "months", "YYYY-MM-DD"); // '2023-11-15'
```

---

## ArrayUtils - Array Utilities

Import: `import { ... } from '@rainbow-oh/yee-tools/array'`

### trimArray

Trims leading and trailing whitespace from all string elements in an array

```typescript
trimArray(array: string[]): string[]
```

**Examples:**

```typescript
trimArray([" hello ", " world "]); // ['hello', 'world']
trimArray(["  test  ", "  data  "]); // ['test', 'data']
```

---

### isRepeat

Checks if an array contains duplicate elements

```typescript
isRepeat<T>(array: T[]): boolean
```

**Examples:**

```typescript
isRepeat([1, 2, 3, 2]); // true
isRepeat([1, 2, 3]); // false
isRepeat(["a", "b", "a"]); // true
```

---

### repeatElement

Finds the first duplicate element in an array

```typescript
repeatElement<T>(array: T[]): T | null
```

**Examples:**

```typescript
repeatElement([1, 2, 3, 2, 4]); // 2
repeatElement([1, 2, 3]); // null
repeatElement(["a", "b", "c", "b"]); // 'b'
```

---

### unique

Removes duplicate elements from an array

```typescript
unique<T>(array: T[]): T[]
```

**Examples:**

```typescript
unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]
unique(["a", "b", "a", "c"]); // ['a', 'b', 'c']
```

---

### chunk

Splits an array into chunks of the specified size

```typescript
chunk<T>(array: T[], size: number): T[][]
```

**Parameters:**

- `array` - The array to split
- `size` - Size of each chunk (must be greater than 0)

**Examples:**

```typescript
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
chunk(["a", "b", "c", "d"], 3); // [['a', 'b', 'c'], ['d']]
```

---

## ObjectUtils - Object Utilities

Import: `import { ... } from '@rainbow-oh/yee-tools/object'`

### clone

Deep clones an object or array

```typescript
clone<T>(obj: T): T
```

**Examples:**

```typescript
const original = { a: 1, b: { c: 2 } };
const cloned = clone(original);
cloned.b.c = 3;
console.log(original.b.c); // 2 (original object is not modified)
```

---

### extend

Extends the target object by copying properties from the source object

```typescript
extend<T, S>(target: T, source: S, deep?: boolean): T & S
```

**Parameters:**

- `target` - Target object
- `source` - Source object
- `deep` - Optional, whether to deep merge (default: `false`)

**Examples:**

```typescript
const target = { a: 1 };
const source = { b: 2 };
extend(target, source); // { a: 1, b: 2 }

// Deep merge
const t = { a: { x: 1 } };
const s = { a: { y: 2 } };
extend(t, s, true); // { a: { x: 1, y: 2 } }
```

---

### merge

Merges multiple objects into a new object

```typescript
merge<T>(...objects: Partial<T>[]): Partial<T>
```

**Examples:**

```typescript
merge({ a: 1 }, { b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
merge({ x: 1 }, { x: 2, y: 3 }); // { x: 2, y: 3 }
```

---

### pick

Picks specified properties from an object

```typescript
pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
```

**Examples:**

```typescript
pick({ a: 1, b: 2, c: 3 }, ["a", "c"]); // { a: 1, c: 3 }
pick({ name: "John", age: 30, city: "NY" }, ["name", "age"]); // { name: 'John', age: 30 }
```

---

### omit

Omits specified properties from an object

```typescript
omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
```

**Examples:**

```typescript
omit({ a: 1, b: 2, c: 3 }, ["b"]); // { a: 1, c: 3 }
omit({ name: "John", age: 30, city: "NY" }, ["age"]); // { name: 'John', city: 'NY' }
```

---

## SecurityUtils - Security Utilities

Import: `import { ... } from '@rainbow-oh/yee-tools/security'`

Implemented following OWASP security guidelines

### escapeHTML

Escapes HTML special characters to prevent XSS attacks

```typescript
escapeHTML(text: string): string
```

**Examples:**

```typescript
escapeHTML('<script>alert("XSS")</script>');
// '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'

escapeHTML('<div class="test">Hello</div>');
// '&lt;div class=&quot;test&quot;&gt;Hello&lt;&#x2F;div&gt;'
```

---

### unescapeHTML

Unescapes HTML entities

```typescript
unescapeHTML(text: string): string
```

**Examples:**

```typescript
unescapeHTML("&lt;div&gt;"); // '<div>'
unescapeHTML("&quot;Hello&quot;"); // '"Hello"'
```

---

### escapeHTMLAttribute

Escapes all non-alphanumeric characters in an HTML attribute

```typescript
escapeHTMLAttribute(text: string): string
```

**Examples:**

```typescript
escapeHTMLAttribute('value="test"'); // 'value&#x3D;&#x22;test&#x22;'
```

---

### encodeJavaScriptIdentifier

Encodes a JavaScript identifier, escaping all non-alphanumeric characters

```typescript
encodeJavaScriptIdentifier(text: string): string
```

**Examples:**

```typescript
encodeJavaScriptIdentifier('alert("test")');
// 'alert\\u0028\\u0022test\\u0022\\u0029'
```

---

### encodeJavaScriptString

Encodes a JavaScript string (with quotes)

```typescript
encodeJavaScriptString(text: string): string
```

**Examples:**

```typescript
encodeJavaScriptString("test"); // '"test"'
```

---

### encodeJavaScriptData

Safely encodes JavaScript data (objects)

```typescript
encodeJavaScriptData(data: unknown): string
```

**Examples:**

```typescript
encodeJavaScriptData({ name: "test" }); // '{"name":"test"}'
```

---

### encodeCSSIdentifier

Encodes a CSS identifier, escaping all non-alphanumeric characters

```typescript
encodeCSSIdentifier(text: string): string
```

**Examples:**

```typescript
encodeCSSIdentifier("my-class"); // 'my\\00002dclass'
```

---

### encodeCSSString

Encodes a CSS string (with quotes)

```typescript
encodeCSSString(text: string): string
```

**Examples:**

```typescript
encodeCSSString("my-class"); // '"my\\00002dclass"'
```

---

## CookieUtils - Cookie Utilities

Import: `import { ... } from '@rainbow-oh/yee-tools/cookie'`

### get

Gets a cookie value

```typescript
get(name: string, options?: CookieOptions | ((value: string) => unknown)): unknown
```

**Parameters:**

- `name` - Cookie name
- `options` - Optional, cookie options or converter function

**Examples:**

```typescript
get("username"); // 'john_doe'
get("data", { converter: JSON.parse }); // { id: 1, name: 'John' }
get("token", (value) => value.toUpperCase()); // 'ABC123'
```

---

### set

Sets a cookie

```typescript
set(name: string, value: unknown, options?: CookieOptions): string
```

**Parameters:**

- `name` - Cookie name
- `value` - Cookie value
- `options` - Optional, cookie options
  - `expires` - Expiration (number of days or Date object)
  - `domain` - Cookie domain
  - `path` - Cookie path
  - `secure` - HTTPS only
  - `raw` - Skip URI encoding

**Examples:**

```typescript
set("username", "john_doe");
set("token", "abc123", { expires: 7, path: "/" });
set("data", { id: 1 }, { expires: new Date("2024-12-31") });
```

---

### remove

Removes a cookie

```typescript
remove(name: string, options?: CookieOptions): string
```

**Parameters:**

- `name` - Cookie name
- `options` - Optional, cookie options (path and domain should match the original cookie)

**Examples:**

```typescript
remove("username");
remove("session", { path: "/", domain: ".example.com" });
```

---

### CookieOptions Interface

```typescript
interface CookieOptions {
  expires?: number | Date; // Expiration
  domain?: string; // Domain
  path?: string; // Path
  secure?: boolean; // HTTPS only
  raw?: boolean; // Skip encoding
  converter?: (value: string) => unknown; // Converter function
}
```

---

## TypeUtils - Type Utilities

Import: `import { ... } from '@rainbow-oh/yee-tools/type'`

### parseBool

Converts a value to a boolean

```typescript
parseBool(input: unknown): boolean
```

**Examples:**

```typescript
parseBool("true"); // true
parseBool("false"); // false
parseBool("0"); // false
parseBool("1"); // true
parseBool("y"); // true
parseBool("n"); // false
parseBool(""); // false
```

---

### isArray

Checks if a value is an array

```typescript
isArray(value: unknown): value is unknown[]
```

**Examples:**

```typescript
isArray([1, 2, 3]); // true
isArray("hello"); // false
```

---

### isString

Checks if a value is a string

```typescript
isString(value: unknown): value is string
```

**Examples:**

```typescript
isString("hello"); // true
isString(123); // false
```

---

### isNumber

Checks if a value is a number

```typescript
isNumber(value: unknown): value is number
```

**Examples:**

```typescript
isNumber(123); // true
isNumber("123"); // false
isNumber(NaN); // false
```

---

### isDate

Checks if a value is a valid Date object

```typescript
isDate(value: unknown): value is Date
```

**Examples:**

```typescript
isDate(new Date()); // true
isDate("2024-01-15"); // false
isDate(new Date("invalid")); // false
```

---

### isFunction

Checks if a value is a function

```typescript
isFunction(value: unknown): value is Function
```

**Examples:**

```typescript
isFunction(() => {}); // true
isFunction("hello"); // false
```

---

### isObject

Checks if a value is a plain object

```typescript
isObject(value: unknown): value is Record<string, unknown>
```

**Examples:**

```typescript
isObject({}); // true
isObject([]); // false
isObject(null); // false
```

---

### isNullOrUndefined

Checks if a value is null or undefined

```typescript
isNullOrUndefined(value: unknown): value is null | undefined
```

**Examples:**

```typescript
isNullOrUndefined(null); // true
isNullOrUndefined(undefined); // true
isNullOrUndefined(0); // false
isNullOrUndefined(""); // false
```

---

### isIE

Checks if the current browser is Internet Explorer

```typescript
isIE(): boolean
```

**Examples:**

```typescript
if (isIE()) {
  console.log("The current browser is IE");
}
```

---

## URLUtils - URL Utilities

Import: `import { ... } from '@rainbow-oh/yee-tools/url'`

### getUrlParam

Parses URL query parameters into an object

Supports regular URLs and hash-based routing URLs (e.g. `#/path?param=value`)

```typescript
getUrlParam(urlStr?: string): Record<string, string>
```

**Parameters:**

- `urlStr` - Optional, URL string to parse. If not provided, uses the current `location.search`

**Examples:**

```typescript
// Parse the current URL
getUrlParam(); // { id: '123', name: 'test' }

// Parse a specific URL
getUrlParam("http://example.com?id=123&name=test");
// { id: '123', name: 'test' }

// Parse a hash routing URL
getUrlParam("http://example.com?lang=en#/page?id=123");
// { lang: 'en', id: '123' }
```

---

### buildQueryString

Converts an object to a query string

```typescript
buildQueryString(params: Record<string, string | number | boolean>): string
```

**Examples:**

```typescript
buildQueryString({ id: "123", name: "test" });
// 'id=123&name=test'

buildQueryString({ page: 1, size: 20, active: true });
// 'page=1&size=20&active=true'
```

---

### updateUrlParams

Updates the query parameters of a URL

```typescript
updateUrlParams(
  url: string,
  params: Record<string, string | number | boolean>
): string
```

**Examples:**

```typescript
updateUrlParams("http://example.com", { id: "123" });
// 'http://example.com?id=123'

updateUrlParams("http://example.com?name=test", { id: "123" });
// 'http://example.com?name=test&id=123'

// Override an existing parameter
updateUrlParams("http://example.com?id=1", { id: "123" });
// 'http://example.com?id=123'
```

---

### removeUrlParams

Removes specified query parameters from a URL

```typescript
removeUrlParams(url: string, keysToRemove: string[]): string
```

**Examples:**

```typescript
removeUrlParams("http://example.com?id=123&name=test", ["id"]);
// 'http://example.com?name=test'

removeUrlParams("http://example.com?a=1&b=2&c=3", ["a", "c"]);
// 'http://example.com?b=2'
```

---

## Cache - Cache Utilities

Provides three levels of caching: Session, Local, and Page

### SessionContext - Session-level Cache

Import: `import { SessionContext } from '@rainbow-oh/yee-tools/cache/session'`

Implemented using `sessionStorage`, cleared when the browser is closed

#### put

Stores a value in session cache

```typescript
SessionContext.put<T>(key: string, value: T): T
```

**Examples:**

```typescript
SessionContext.put("token", "abc123");
SessionContext.put("user", { id: 1, name: "John" });
```

---

#### get

Gets a value from session cache

```typescript
SessionContext.get<T>(key: string, parse?: boolean): T | null
```

**Parameters:**

- `key` - Cache key
- `parse` - Optional, whether to parse JSON (default: `true`)

**Examples:**

```typescript
const token = SessionContext.get("token");
const user = SessionContext.get<User>("user");
```

---

#### remove

Removes a value from session cache

```typescript
SessionContext.remove(key: string): void
```

**Examples:**

```typescript
SessionContext.remove("token");
```

---

#### clear

Clears all session cache

```typescript
SessionContext.clear(): void
```

---

#### has

Checks if a key exists

```typescript
SessionContext.has(key: string): boolean
```

---

#### keys

Gets all cache keys

```typescript
SessionContext.keys(): string[]
```

---

#### checkSize

Checks the sessionStorage size

```typescript
SessionContext.checkSize(maxSizeKB: number): boolean
```

---

### LocalContext - Local-level Cache

Import: `import { LocalContext } from '@rainbow-oh/yee-tools/cache/local'`

Implemented using `localStorage`, persists until manually cleared

The API is the same as SessionContext:

```typescript
LocalContext.put(key, value)
LocalContext.get(key, parse?)
LocalContext.remove(key)
LocalContext.clear()
LocalContext.has(key)
LocalContext.keys()
LocalContext.checkSize(maxSizeKB)
```

**Examples:**

```typescript
LocalContext.put("preferences", { theme: "dark", lang: "zh" });
const prefs = LocalContext.get("preferences");
```

---

### PageContext - Page-level Cache

Import: `import { PageContext } from '@rainbow-oh/yee-tools/cache/page'`

Implemented using an in-memory Map, cleared on page refresh

#### put

Stores a value in page cache

```typescript
PageContext.put(key: string, value: unknown): void
```

---

#### get

Gets a value from page cache

```typescript
PageContext.get<T>(key: string): T | undefined
```

---

#### remove

Removes a value from page cache

```typescript
PageContext.remove(key: string): void
```

---

#### clear

Clears all page cache

```typescript
PageContext.clear(): void
```

---

#### has

Checks if a key exists

```typescript
PageContext.has(key: string): boolean
```

---

#### keys

Gets an iterator of all cache keys

```typescript
PageContext.keys(): IterableIterator<string>
```

---

#### values

Gets an iterator of all cache values

```typescript
PageContext.values(): IterableIterator<unknown>
```

---

#### entries

Gets an iterator of all key-value pairs

```typescript
PageContext.entries(): IterableIterator<[string, unknown]>
```

---

#### size

Gets the number of cache entries

```typescript
PageContext.size(): number
```

**Examples:**

```typescript
PageContext.put("tempData", { count: 10 });
const data = PageContext.get("tempData");
console.log(PageContext.size()); // 1
```

---

## Config - Configuration Utilities

### ConfigProvider - Configuration Provider

Import: `import { configProvider } from '@rainbow-oh/yee-tools/config/provider'`

Global configuration management singleton

#### setConfig

Sets the global configuration

```typescript
configProvider.setConfig(config: YeeToolsConfig): void
```

**Examples:**

```typescript
configProvider.setConfig({
  date: {
    defaultSubmitFormat: "YYYY-MM-DD HH:mm:ss",
    defaultViewFormat: "YYYY年MM月DD日",
  },
  http: {
    timeout: 10000,
    baseUrl: "https://api.example.com",
  },
});
```

---

#### get

Gets a configuration value (supports deep paths)

```typescript
configProvider.get<T>(path: string, defaultValue?: T): T
```

**Examples:**

```typescript
const timeout = configProvider.get("http.timeout", 5000);
const format = configProvider.get("date.defaultSubmitFormat");
```

---

#### isInitialized

Checks if the configuration has been initialized

```typescript
configProvider.isInitialized(): boolean
```

---

#### reset

Resets the configuration (primarily used for testing)

```typescript
configProvider.reset(): void
```

---

### Session Config - Session Configuration

Import: `import { ... } from '@rainbow-oh/yee-tools/config/session'`

Manages project configuration stored in sessionStorage

#### getProjectConfig

Gets the project configuration

```typescript
getProjectConfig(): ProjectConfig
```

**Examples:**

```typescript
const config = getProjectConfig();
console.log(config.DEFAULT_DATETIME_SUBMIT_FORMATER);
```

---

#### setProjectConfig

Sets the project configuration

```typescript
setProjectConfig(config: ProjectConfig): boolean
```

**Examples:**

```typescript
setProjectConfig({
  DEFAULT_DATETIME_SUBMIT_FORMATER: "YYYY-MM-DD HH:mm:ss",
  UI_TENANT_CODE: "tenant123",
});
```

---

#### updateProjectConfig

Updates partial project configuration

```typescript
updateProjectConfig(updates: Partial<ProjectConfig>): boolean
```

**Examples:**

```typescript
updateProjectConfig({
  DEFAULT_AX_TIMEOUT: 15000,
});
```

---

#### getProjectConfigValue

Gets a specific configuration value

```typescript
getProjectConfigValue<T>(key: keyof ProjectConfig, defaultValue?: T): T
```

**Examples:**

```typescript
const timeout = getProjectConfigValue("DEFAULT_AX_TIMEOUT", 5000);
```

---

#### clearProjectConfig

Clears the project configuration

```typescript
clearProjectConfig(): void
```

---

#### hasProjectConfig

Checks if the project configuration exists

```typescript
hasProjectConfig(): boolean
```

---

### ProjectConfig Interface

```typescript
interface ProjectConfig {
  // Date/time configuration
  DEFAULT_DATETIME_SUBMIT_FORMATER?: string;
  DEFAULT_DATETIME_FORMATER?: string;

  // Internationalization configuration
  DEFAULT_LOCALSTORAGE_I18NKEY?: string;
  DEFAULT_SYSTEM_I18N?: string;
  DEFAULT_I18N_CONFIGURATION_GROUP?: string[];
  DEFAULT_I18N_CACHE?: boolean;

  // HTTP configuration
  DEFAULT_AX_TIMEOUT?: number;

  // API gateway configuration
  UI_API_GATEWAY_PROXY?: string;
  UI_API_GATEWAY_PROXY_WITH_TENANT?: boolean | string;
  UI_TENANT_CODE?: string;

  // Cache configuration
  UI_LOCAL_CACHE_KEY?: string[];

  // Authentication configuration
  UI_CAS?: string;
  UI_CAS_SERVICE_URL?: string;

  // Other custom properties
  [key: string]: unknown;
}
```

---

## License

MIT

## Contributing

Issues and Pull Requests are welcome!

## Related Links

- [GitHub Repository](#)
- [Changelog](#)
- [Issue Tracker](#)
