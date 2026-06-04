# 类型工具 (TypeUtils)

类型判断和转换相关的工具函数。

## 安装

```bash
npm install @rainbow-oh/yee-tools
```

## 引入方式

### 方式一：命名空间导入（推荐）

适合需要使用多个类型工具函数：

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.isArray([1, 2, 3]);
TypeUtils.isString('hello');
TypeUtils.parseBool('true');
```

### 方式二：按需引入

适合只需要使用单个函数：

```typescript
import { isString, isNumber, parseBool } from '@rainbow-oh/yee-tools/type';

isString('hello');
isNumber(123);
parseBool('true');
```

## API

### parseBool

将值转换为布尔值。

```typescript
function parseBool(input: unknown): boolean
```

**示例：**

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

**识别为 false 的值：** `'false'`, `'0'`, `'null'`, `'undefined'`, `'n'`

---

### isArray

检查值是否为数组。

```typescript
function isArray(value: unknown): value is unknown[]
```

**示例：**

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

检查值是否为字符串。

```typescript
function isString(value: unknown): value is string
```

**示例：**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.isString('hello');
// => true

TypeUtils.isString(123);
// => false
```

---

### isNumber

检查值是否为数字。

```typescript
function isNumber(value: unknown): value is number
```

**示例：**

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

检查值是否为 Date 对象。

```typescript
function isDate(value: unknown): value is Date
```

**示例：**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.isDate(new Date());
// => true

TypeUtils.isDate('2024-01-15');
// => false
```

---

### isFunction

检查值是否为函数。

```typescript
function isFunction(value: unknown): value is Function
```

**示例：**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.isFunction(() => {});
// => true

TypeUtils.isFunction('hello');
// => false
```

---

### isObject

检查值是否为普通对象。

```typescript
function isObject(value: unknown): value is Record<string, unknown>
```

**示例：**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

TypeUtils.isObject({});
// => true

TypeUtils.isObject([]);
// => false (数组不是普通对象)

TypeUtils.isObject(null);
// => false
```

---

### isNullOrUndefined

检查值是否为 null 或 undefined。

```typescript
function isNullOrUndefined(value: unknown): value is null | undefined
```

**示例：**

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

检查当前浏览器是否为 Internet Explorer。

```typescript
function isIE(): boolean
```

**示例：**

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

if (TypeUtils.isIE()) {
  console.log('Running in IE browser');
}
```

## 常见用例

```typescript
import { TypeUtils } from '@rainbow-oh/yee-tools';

// 数据验证
function processValue(value: unknown) {
  if (TypeUtils.isString(value)) {
    return value.toUpperCase();
  } else if (TypeUtils.isNumber(value)) {
    return value.toFixed(2);
  }
  return value;
}

// 环境变量解析
const debugMode = TypeUtils.parseBool(process.env.DEBUG);

// 类型守卫
if (TypeUtils.isArray(data)) {
  data.forEach(item => console.log(item));
}

// 空值检查
if (!TypeUtils.isNullOrUndefined(value)) {
  // 安全使用 value
  console.log(value.toString());
}
```
