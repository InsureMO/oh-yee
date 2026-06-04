# 对象工具 (ObjectUtils)

对象操作相关的工具函数。

## 安装

```bash
npm install @oh/yee-tools
```

## 引入方式

### 方式一：命名空间导入（推荐）

适合需要使用多个对象工具函数：

```typescript
import { ObjectUtils } from '@oh/yee-tools';

ObjectUtils.clone({ a: 1, b: { c: 2 } });
ObjectUtils.pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);
```

### 方式二：按需引入

适合只需要使用单个函数：

```typescript
import { clone, pick, omit } from '@oh/yee-tools/object';

clone({ a: 1, b: { c: 2 } });
pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);
omit({ a: 1, b: 2, c: 3 }, ['b']);
```

## API

### clone

深拷贝对象或数组。

```typescript
function clone<T>(obj: T): T
```

**示例：**

```typescript
import { ObjectUtils } from '@oh/yee-tools';

const original = { a: 1, b: { c: 2 } };
const cloned = ObjectUtils.clone(original);

cloned.b.c = 3;
console.log(original.b.c); // 2 (原对象不受影响)

// 支持数组
const arr = [1, [2, 3]];
const arrClone = ObjectUtils.clone(arr);
arrClone[1][0] = 99;
console.log(arr[1][0]); // 2
```

---

### extend

将源对象的属性扩展到目标对象。

```typescript
function extend<T, S>(target: T, source: S, deep?: boolean): T & S
```

**参数：**
- `target`: 目标对象
- `source`: 源对象
- `deep`: 是否深度合并（默认：false）

**示例：**

```typescript
import { ObjectUtils } from '@oh/yee-tools';

// 浅合并
const target = { a: 1 };
const source = { b: 2 };
ObjectUtils.extend(target, source);
// => { a: 1, b: 2 }

// 深度合并
const target1 = { a: { x: 1 } };
const source1 = { a: { y: 2 } };
ObjectUtils.extend(target1, source1, true);
// => { a: { x: 1, y: 2 } }
```

---

### merge

合并多个对象为一个对象。

```typescript
function merge<T>(...objects: Partial<T>[]): Partial<T>
```

**示例：**

```typescript
import { ObjectUtils } from '@oh/yee-tools';

ObjectUtils.merge({ a: 1 }, { b: 2 }, { c: 3 });
// => { a: 1, b: 2, c: 3 }

const defaults = { theme: 'light', lang: 'zh' };
const userConfig = { theme: 'dark' };
ObjectUtils.merge(defaults, userConfig);
// => { theme: 'dark', lang: 'zh' }
```

---

### pick

从对象中选取指定的属性。

```typescript
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
```

**示例：**

```typescript
import { ObjectUtils } from '@oh/yee-tools';

const user = {
  id: 1,
  name: 'Alice',
  password: 'secret',
  email: 'alice@example.com'
};

// 只选取需要的属性
const publicUser = ObjectUtils.pick(user, ['id', 'name', 'email']);
// => { id: 1, name: 'Alice', email: 'alice@example.com' }
```

---

### omit

从对象中排除指定的属性。

```typescript
function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
```

**示例：**

```typescript
import { ObjectUtils } from '@oh/yee-tools';

const user = {
  id: 1,
  name: 'Alice',
  password: 'secret',
  email: 'alice@example.com'
};

// 排除敏感属性
const safeUser = ObjectUtils.omit(user, ['password']);
// => { id: 1, name: 'Alice', email: 'alice@example.com' }

// 排除多个属性
const minimalUser = ObjectUtils.omit(user, ['password', 'email']);
// => { id: 1, name: 'Alice' }
```

## 常见用例

```typescript
import { ObjectUtils } from '@oh/yee-tools';

// 配置合并
const defaultConfig = { theme: 'light', pageSize: 10 };
const userConfig = { theme: 'dark' };
const finalConfig = ObjectUtils.merge(defaultConfig, userConfig);

// 数据脱敏
const user = { id: 1, name: 'Alice', password: 'secret', token: 'xxx' };
const publicUser = ObjectUtils.omit(user, ['password', 'token']);

// 深拷贝避免修改原数据
const originalData = { items: [1, 2, 3] };
const workingCopy = ObjectUtils.clone(originalData);
workingCopy.items.push(4);
// originalData.items 仍然是 [1, 2, 3]
```
