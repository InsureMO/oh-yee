# Security Utils

Security utility functions for preventing XSS attacks and data encoding.

Follows OWASP (Open Web Application Security Project) guidelines for HTML, JavaScript, and CSS escaping and encoding.

## Installation

```bash
npm install @rainbow-oh/yee-tools
```

## Import Methods

### Method 1: Namespace Import (Recommended)

Best for scenarios where you need to use multiple security utility functions:

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.escapeHTML('<script>alert("XSS")</script>');
SecurityUtils.encodeJavaScriptString('user input');
```

### Method 2: Tree Shaking

Best for scenarios where you only need a single function:

```typescript
import { escapeHTML, encodeJavaScriptString } from '@rainbow-oh/yee-tools/security';

escapeHTML('<script>alert("XSS")</script>');
encodeJavaScriptString('user input');
```

## API

### escapeHTML

Escapes HTML special characters to prevent XSS attacks.

```typescript
function escapeHTML(text: string): string
```

**Example:**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

// Prevent script injection
SecurityUtils.escapeHTML('<script>alert("XSS")</script>');
// => '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'

// Escape special characters
SecurityUtils.escapeHTML('<div>Hello & welcome</div>');
// => '&lt;div&gt;Hello &amp; welcome&lt;/div&gt;'

// Use case: display user input
const userInput = '<img src=x onerror=alert(1)>';
const safeHTML = SecurityUtils.escapeHTML(userInput);
// => '&lt;img src=x onerror=alert(1)&gt;'
```

---

### unescapeHTML

Unescapes HTML entities.

```typescript
function unescapeHTML(text: string): string
```

**Example:**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.unescapeHTML('&lt;div&gt;');
// => '<div>'

SecurityUtils.unescapeHTML('Hello &amp; welcome');
// => 'Hello & welcome'
```

---

### escapeHTMLAttribute

Escapes special characters in HTML attribute values.

```typescript
function escapeHTMLAttribute(text: string): string
```

**Example:**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

// Prevent attribute injection
SecurityUtils.escapeHTMLAttribute('value="test"');
// => 'value&#x3D;&#x22;test&#x22;'

// Use case: dynamic attribute values
const attrValue = '"><script>alert(1)</script>';
const safeAttr = SecurityUtils.escapeHTMLAttribute(attrValue);
```

---

### encodeJavaScriptIdentifier

Encodes JavaScript identifiers by escaping all non-alphanumeric characters.

```typescript
function encodeJavaScriptIdentifier(text: string): string
```

**Example:**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.encodeJavaScriptIdentifier('alert("test")');
// => 'alert\\u0028\\u0022test\\u0022\\u0029'

// Use case: dynamic variable names
const userInput = 'user-name';
const safeIdentifier = SecurityUtils.encodeJavaScriptIdentifier(userInput);
// => 'user\\u002dname'
```

---

### encodeJavaScriptString

Encodes JavaScript string with quotes.

```typescript
function encodeJavaScriptString(text: string): string
```

**Example:**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.encodeJavaScriptString('test');
// => '"test"'

SecurityUtils.encodeJavaScriptString('Hello "World"');
// => '"Hello\\u0022World\\u0022"'
```

---

### encodeJavaScriptData

Safely encodes JavaScript data (objects).

```typescript
function encodeJavaScriptData(data: unknown): string
```

**Example:**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.encodeJavaScriptData({ name: 'test' });
// => '{"name":"test"}'

SecurityUtils.encodeJavaScriptData({ html: '<script>' });
// => '{"html":"\\u003cscript\\u003e"}'
```

---

### encodeCSSIdentifier

Encodes CSS identifiers.

```typescript
function encodeCSSIdentifier(text: string): string
```

**Example:**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.encodeCSSIdentifier('my-class');
// => 'my\\00002dclass'

// Use case: dynamic class names
const userInput = '.dangerous.class';
const safeClass = SecurityUtils.encodeCSSIdentifier(userInput);
```

---

### encodeCSSString

Encodes CSS string with quotes.

```typescript
function encodeCSSString(text: string): string
```

**Example:**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.encodeCSSString('my-class');
// => '"my\\00002dclass"'
```

## Common Use Cases

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

// 1. Prevent XSS attacks
function renderUserContent(content: string): string {
  return `<div>${SecurityUtils.escapeHTML(content)}</div>`;
}

// 2. Safe dynamic HTML attributes
function setAttribute(name: string, value: string): string {
  return `${name}="${SecurityUtils.escapeHTMLAttribute(value)}"`;
}

// 3. Safe JavaScript data passing
function sendDataToJS(data: object): string {
  const encoded = SecurityUtils.encodeJavaScriptData(data);
  return `<script>const data = ${encoded};</script>`;
}

// 4. Safe CSS class names
function sanitizeClassName(input: string): string {
  return SecurityUtils.encodeCSSIdentifier(input);
}

// 5. Handle user comments
function displayComment(comment: string): string {
  const safe = SecurityUtils.escapeHTML(comment);
  return `<p class="comment">${safe}</p>`;
}
```

## Security Best Practices

1. **Never trust user input**: Always escape data from users
2. **Use the correct escaping function**:
   - HTML content: `escapeHTML`
   - HTML attributes: `escapeHTMLAttribute`
   - JavaScript: `encodeJavaScriptString/Data`
   - CSS: `encodeCSSString`
3. **Content Security Policy (CSP)**: Combine with CSP for additional protection
4. **Input validation**: Validate input format before escaping
5. **HttpOnly Cookies**: Set HttpOnly flag for sensitive cookies
