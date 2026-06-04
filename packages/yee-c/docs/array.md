# 数组工具 (ArrayUtils)

数组操作相关的工具函数。

## 安装

```bash
npm install @oh/yee-tools
```

## 引入方式

### 方式一：命名空间导入（推荐）

适合需要使用多个数组工具函数：

```typescript
import { ArrayUtils } from '@oh/yee-tools';

ArrayUtils.unique([1, 2, 2, 3]);
ArrayUtils.chunk([1, 2, 3, 4], 2);
```

### 方式二：按需引入

适合只需要使用单个函数：

```typescript
import { unique, chunk } from '@oh/yee-tools/array';

unique([1, 2, 2, 3]);
chunk([1, 2, 3, 4], 2);
```

## API

### trimArray

去除数组中所有字符串元素的首尾空格。

```typescript
function trimArray(array: string[]): string[]
```

**示例：**

```typescript
import { ArrayUtils } from '@oh/yee-tools';

ArrayUtils.trimArray([' hello ', ' world ', ' test ']);
// => ['hello', 'world', 'test']
```

---

### isRepeat

检查数组是否包含重复元素。

```typescript
function isRepeat<T>(array: T[]): boolean
```

**示例：**

```typescript
import { ArrayUtils } from '@oh/yee-tools';

ArrayUtils.isRepeat([1, 2, 3, 2]);
// => true

ArrayUtils.isRepeat([1, 2, 3]);
// => false
```

---

### repeatElement

查找数组中第一个重复的元素。

```typescript
function repeatElement<T>(array: T[]): T | null
```

**示例：**

```typescript
import { ArrayUtils } from '@oh/yee-tools';

ArrayUtils.repeatElement([1, 2, 3, 2, 4]);
// => 2

ArrayUtils.repeatElement([1, 2, 3]);
// => null
```

---

### unique

去除数组中的重复元素。

```typescript
function unique<T>(array: T[]): T[]
```

**示例：**

```typescript
import { ArrayUtils } from '@oh/yee-tools';

ArrayUtils.unique([1, 2, 2, 3, 3, 4]);
// => [1, 2, 3, 4]

ArrayUtils.unique(['a', 'b', 'a', 'c']);
// => ['a', 'b', 'c']
```

---

### chunk

将数组分割成指定大小的较小数组。

```typescript
function chunk<T>(array: T[], size: number): T[][]
```

**参数：**
- `array`: 要分割的数组
- `size`: 每个块的大小（必须大于 0）

**示例：**

```typescript
import { ArrayUtils } from '@oh/yee-tools';

ArrayUtils.chunk([1, 2, 3, 4, 5], 2);
// => [[1, 2], [3, 4], [5]]

ArrayUtils.chunk([1, 2, 3, 4, 5, 6], 3);
// => [[1, 2, 3], [4, 5, 6]]

ArrayUtils.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
```

**常见用例：**

```typescript
import { ArrayUtils } from '@oh/yee-tools';

// 分页处理
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pageSize = 3;
const pages = ArrayUtils.chunk(items, pageSize);
// => [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]

// 批量处理
const users = await ArrayUtils.chunk(userIds, 100).map(async (batch) => {
  return await fetchUsers(batch);
});
```
