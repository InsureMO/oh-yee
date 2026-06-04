# 字符串工具 (StringUtils)

字符串处理相关的工具函数。

## 安装

```bash
npm install @rainbow-oh/yee-tools
```

## 引入方式

### 方式一：命名空间导入（推荐）

适合需要使用多个字符串工具函数：

```typescript
import { StringUtils } from '@rainbow-oh/yee-tools';

StringUtils.trim('  hello  ');
StringUtils.isEmpty('hello');
```

### 方式二：按需引入

适合只需要使用单个函数：

```typescript
import { trim, isEmpty } from '@rainbow-oh/yee-tools/string';

trim('  hello  ');
isEmpty('hello');
```

## API

### trim

去除字符串首尾空格。

```typescript
function trim(str: string): string
```

**示例：**

```typescript
import { trim } from '@rainbow-oh/yee-tools/string';

trim('  hello  ');
// => 'hello'

trim('  foo bar  ');
// => 'foo bar'
```

---

### isEmpty

检查字符串是否为空（长度为 0）。

```typescript
function isEmpty(str: string): boolean
```

**示例：**

```typescript
import { isEmpty } from '@rainbow-oh/yee-tools/string';

isEmpty('');
// => true

isEmpty('hello');
// => false
```

---

### isNotEmpty

检查字符串是否不为空。

```typescript
function isNotEmpty(str: string): boolean
```

**示例：**

```typescript
import { isNotEmpty } from '@rainbow-oh/yee-tools/string';

isNotEmpty('hello');
// => true

isNotEmpty('');
// => false
```

---

### isBlank

检查字符串是否为空或仅包含空格。

```typescript
function isBlank(str: string | null | undefined): boolean
```

**示例：**

```typescript
import { isBlank } from '@rainbow-oh/yee-tools/string';

isBlank(null);
// => true

isBlank('   ');
// => true

isBlank('hello');
// => false
```

---

### isNotBlank

检查字符串是否不为空且不仅包含空格。

```typescript
function isNotBlank(str: string | null | undefined): boolean
```

**示例：**

```typescript
import { isNotBlank } from '@rainbow-oh/yee-tools/string';

isNotBlank('hello');
// => true

isNotBlank('   ');
// => false
```

---

### mask

根据掩码模式遮蔽字符串的部分内容。

```typescript
function mask(value: string | null | undefined, maskPattern: string): string
```

**参数：**
- `value`: 要遮蔽的字符串
- `maskPattern`: 掩码模式（格式：`"maskChar:(start,end)[,...]|[excludeChars]"`）

**示例：**

```typescript
import { mask } from '@rainbow-oh/yee-tools/string';

// 遮蔽前 3 位
mask('1234567890', '*:(0,3)');
// => '***4567890'

// 遮蔽后 4 位
mask('1234567890', '*:(-4)');
// => '123456****'

// 手机号遮蔽
mask('13812345678', '*:(3,7)');
// => '138****5678'
```

**常见用例：**

```typescript
// 手机号脱敏
mask('13812345678', '*:(3,7)');
// => '138****5678'

// 身份证脱敏
mask('110101199001011234', '*:(6,14)');
// => '110101********1234'

// 银行卡脱敏
mask('6222021234567890123', '*:(6,16)');
// => '622202**********0123'
```
