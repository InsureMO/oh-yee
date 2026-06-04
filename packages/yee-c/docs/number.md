# 数字工具 (NumberUtils)

精确的浮点数运算工具函数，解决 JavaScript 浮点数精度问题。

## 安装

```bash
npm install @rainbow-oh/yee-tools
```

## 引入方式

### 方式一：命名空间导入（推荐）

适合需要使用多个数字工具函数：

```typescript
import { NumberUtils } from '@rainbow-oh/yee-tools';

NumberUtils.add(0.1, 0.2);
NumberUtils.multiply(0.1, 0.2);
```

### 方式二：按需引入

适合只需要使用单个函数：

```typescript
import { add, multiply, divide } from '@rainbow-oh/yee-tools/number';

add(0.1, 0.2);
multiply(0.1, 0.2);
divide(0.3, 0.1);
```

## 为什么需要精确计算？

JavaScript 中的浮点数运算存在精度问题：

```typescript
// JavaScript 原生运算
0.1 + 0.2;           // 0.30000000000000004 ❌
0.3 - 0.1;           // 0.19999999999999998 ❌
0.1 * 0.2;           // 0.020000000000000004 ❌
0.3 / 0.1;           // 2.9999999999999996   ❌

// 使用 NumberUtils
NumberUtils.add(0.1, 0.2);      // 0.3          ✅
NumberUtils.subtract(0.3, 0.1); // "0.2"        ✅
NumberUtils.multiply(0.1, 0.2); // 0.02         ✅
NumberUtils.divide(0.3, 0.1);   // 3            ✅
```

## API

### add

精确的浮点数加法。

```typescript
function add(arg1: number, arg2: number): number
```

**示例：**

```typescript
import { NumberUtils } from '@rainbow-oh/yee-tools';

NumberUtils.add(0.1, 0.2);
// => 0.3

NumberUtils.add(1.5, 2.3);
// => 3.8

NumberUtils.add(0.01, 0.02);
// => 0.03
```

---

### subtract

精确的浮点数减法。

```typescript
function subtract(arg1: number, arg2: number): string
```

**示例：**

```typescript
import { NumberUtils } from '@rainbow-oh/yee-tools';

NumberUtils.subtract(0.3, 0.1);
// => "0.2"

NumberUtils.subtract(2.5, 1.2);
// => "1.3"

NumberUtils.subtract(1, 0.9);
// => "0.1"
```

**注意：** 返回类型为字符串，确保精度不丢失。

---

### multiply

精确的浮点数乘法。

```typescript
function multiply(arg1: number, arg2: number): number
```

**示例：**

```typescript
import { NumberUtils } from '@rainbow-oh/yee-tools';

NumberUtils.multiply(0.1, 0.2);
// => 0.02

NumberUtils.multiply(1.5, 2);
// => 3

NumberUtils.multiply(0.07, 100);
// => 7
```

---

### divide

精确的浮点数除法。

```typescript
function divide(arg1: number, arg2: number): number
```

**示例：**

```typescript
import { NumberUtils } from '@rainbow-oh/yee-tools';

NumberUtils.divide(0.3, 0.1);
// => 3

NumberUtils.divide(1.5, 0.5);
// => 3

NumberUtils.divide(10, 3);
// => 3.3333333333333335
```

---

### random

生成指定范围内的随机整数（包含边界值）。

```typescript
function random(min: number, max: number): number
```

**示例：**

```typescript
import { NumberUtils } from '@rainbow-oh/yee-tools';

// 生成 1-10 之间的随机整数
NumberUtils.random(1, 10);
// => 7 (示例值)

// 生成 0-100 之间的随机整数
NumberUtils.random(0, 100);
// => 42 (示例值)

// 模拟掷骰子
NumberUtils.random(1, 6);
// => 4 (示例值)
```

## 常见用例

```typescript
import { NumberUtils } from '@rainbow-oh/yee-tools';

// 金融计算
const total = NumberUtils.add(0.1, 0.2);  // 0.3
const tax = NumberUtils.multiply(total, 0.1);  // 0.03
const final = NumberUtils.subtract(total, tax);  // "0.27"

// 价格计算
const price = NumberUtils.multiply(99.9, 0.8);  // 79.92
const discount = NumberUtils.subtract(100, 20);  // "80"

// 随机生成
const randomId = NumberUtils.random(1000, 9999);
const luckyDraw = NumberUtils.random(1, 100);
```

## 注意事项

1. **subtract 返回字符串类型**：为确保精度不丢失，`subtract` 返回字符串类型
2. **random 包含边界值**：`random(min, max)` 会返回 min 或 max 的值
3. **性能考虑**：精确计算比原生运算稍慢，请按需使用
