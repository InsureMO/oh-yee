# 安全工具 (SecurityUtils)

安全相关的工具函数，用于防止 XSS 攻击和数据编码。

遵循 OWASP（开放网络应用安全项目）指南进行 HTML、JavaScript 和 CSS 的转义和编码。

## 安装

```bash
npm install @rainbow-oh/yee-tools
```

## 引入方式

### 方式一：命名空间导入（推荐）

适合需要使用多个安全工具函数：

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.escapeHTML('<script>alert("XSS")</script>');
SecurityUtils.encodeJavaScriptString('user input');
```

### 方式二：按需引入

适合只需要使用单个函数：

```typescript
import { escapeHTML, encodeJavaScriptString } from '@rainbow-oh/yee-tools/security';

escapeHTML('<script>alert("XSS")</script>');
encodeJavaScriptString('user input');
```

## API

### escapeHTML

转义 HTML 特殊字符，防止 XSS 攻击。

```typescript
function escapeHTML(text: string): string
```

**示例：**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

// 防止脚本注入
SecurityUtils.escapeHTML('<script>alert("XSS")</script>');
// => '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'

// 转义特殊字符
SecurityUtils.escapeHTML('<div>Hello & welcome</div>');
// => '&lt;div&gt;Hello &amp; welcome&lt;/div&gt;'

// 使用场景：显示用户输入
const userInput = '<img src=x onerror=alert(1)>';
const safeHTML = SecurityUtils.escapeHTML(userInput);
// => '&lt;img src=x onerror=alert(1)&gt;'
```

---

### unescapeHTML

反转义 HTML 实体。

```typescript
function unescapeHTML(text: string): string
```

**示例：**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.unescapeHTML('&lt;div&gt;');
// => '<div>'

SecurityUtils.unescapeHTML('Hello &amp; welcome');
// => 'Hello & welcome'
```

---

### escapeHTMLAttribute

转义 HTML 属性值中的特殊字符。

```typescript
function escapeHTMLAttribute(text: string): string
```

**示例：**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

// 防止属性注入
SecurityUtils.escapeHTMLAttribute('value="test"');
// => 'value&#x3D;&#x22;test&#x22;'

// 使用场景：动态属性值
const attrValue = '"><script>alert(1)</script>';
const safeAttr = SecurityUtils.escapeHTMLAttribute(attrValue);
```

---

### encodeJavaScriptIdentifier

编码 JavaScript 标识符，转义所有非字母数字字符。

```typescript
function encodeJavaScriptIdentifier(text: string): string
```

**示例：**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.encodeJavaScriptIdentifier('alert("test")');
// => 'alert\\u0028\\u0022test\\u0022\\u0029'

// 使用场景：动态变量名
const userInput = 'user-name';
const safeIdentifier = SecurityUtils.encodeJavaScriptIdentifier(userInput);
// => 'user\\u002dname'
```

---

### encodeJavaScriptString

编码 JavaScript 字符串，包含引号。

```typescript
function encodeJavaScriptString(text: string): string
```

**示例：**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.encodeJavaScriptString('test');
// => '"test"'

SecurityUtils.encodeJavaScriptString('Hello "World"');
// => '"Hello\\u0022World\\u0022"'
```

---

### encodeJavaScriptData

安全编码 JavaScript 数据（对象）。

```typescript
function encodeJavaScriptData(data: unknown): string
```

**示例：**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.encodeJavaScriptData({ name: 'test' });
// => '{"name":"test"}'

SecurityUtils.encodeJavaScriptData({ html: '<script>' });
// => '{"html":"\\u003cscript\\u003e"}'
```

---

### encodeCSSIdentifier

编码 CSS 标识符。

```typescript
function encodeCSSIdentifier(text: string): string
```

**示例：**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.encodeCSSIdentifier('my-class');
// => 'my\\00002dclass'

// 使用场景：动态类名
const userInput = '.dangerous.class';
const safeClass = SecurityUtils.encodeCSSIdentifier(userInput);
```

---

### encodeCSSString

编码 CSS 字符串，包含引号。

```typescript
function encodeCSSString(text: string): string
```

**示例：**

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

SecurityUtils.encodeCSSString('my-class');
// => '"my\\00002dclass"'
```

## 常见用例

```typescript
import { SecurityUtils } from '@rainbow-oh/yee-tools';

// 1. 防止 XSS 攻击
function renderUserContent(content: string): string {
  return `<div>${SecurityUtils.escapeHTML(content)}</div>`;
}

// 2. 安全的动态 HTML 属性
function setAttribute(name: string, value: string): string {
  return `${name}="${SecurityUtils.escapeHTMLAttribute(value)}"`;
}

// 3. 安全的 JavaScript 数据传递
function sendDataToJS(data: object): string {
  const encoded = SecurityUtils.encodeJavaScriptData(data);
  return `<script>const data = ${encoded};</script>`;
}

// 4. 安全的 CSS 类名
function sanitizeClassName(input: string): string {
  return SecurityUtils.encodeCSSIdentifier(input);
}

// 5. 处理用户评论
function displayComment(comment: string): string {
  const safe = SecurityUtils.escapeHTML(comment);
  return `<p class="comment">${safe}</p>`;
}
```

## 安全建议

1. **永远不要信任用户输入**：所有来自用户的数据都应该被转义
2. **使用正确的转义函数**：
   - HTML 内容使用 `escapeHTML`
   - HTML 属性使用 `escapeHTMLAttribute`
   - JavaScript 使用 `encodeJavaScriptString/Data`
   - CSS 使用 `encodeCSSString`
3. **Content Security Policy (CSP)**：结合 CSP 策略提供额外保护
4. **输入验证**：转义之前先验证输入格式
5. **HttpOnly Cookie**：敏感 Cookie 设置 HttpOnly 标志
