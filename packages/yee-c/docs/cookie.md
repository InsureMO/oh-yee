# Cookie 工具 (CookieUtils)

Cookie 操作相关的工具函数。

## 安装

```bash
npm install @oh/yee-tools
```

## 引入方式

### 方式一：命名空间导入（推荐）

适合需要使用多个 Cookie 工具函数：

```typescript
import { CookieUtils } from '@oh/yee-tools';

CookieUtils.set('username', 'john_doe');
CookieUtils.get('username');
CookieUtils.remove('username');
```

### 方式二：按需引入

适合只需要使用单个函数：

```typescript
import { get, set, remove } from '@oh/yee-tools/cookie';

set('username', 'john_doe');
get('username');
remove('username');
```

## API

### get

获取 Cookie 值。

```typescript
function get(name: string, options?: CookieOptions | converter): unknown
```

**参数：**
- `name`: Cookie 名称
- `options`: 配置选项或转换函数

**示例：**

```typescript
import { CookieUtils } from '@oh/yee-tools';

// 获取字符串值
CookieUtils.get('username');
// => 'john_doe'

// 使用转换函数
CookieUtils.get('data', JSON.parse);
// => { id: 1, name: 'John' }

// 使用配置选项
CookieUtils.get('token', { converter: (value) => value.toUpperCase() });
// => 'ABC123'
```

---

### set

设置 Cookie。

```typescript
function set(name: string, value: unknown, options?: CookieOptions): string
```

**参数：**
- `name`: Cookie 名称
- `value`: Cookie 值
- `options`: 配置选项

**配置选项：**

```typescript
interface CookieOptions {
  expires?: number | Date;  // 过期时间（天数或 Date 对象）
  domain?: string;          // Cookie 域名
  path?: string;            // Cookie 路径
  secure?: boolean;         // 是否仅 HTTPS
  raw?: boolean;            // 是否跳过 URI 编码
  converter?: (value: string) => unknown;  // 转换函数
}
```

**示例：**

```typescript
import { CookieUtils } from '@oh/yee-tools';

// 设置基本 Cookie
CookieUtils.set('username', 'john_doe');

// 设置过期时间（7天）
CookieUtils.set('session', 'abc123', { expires: 7 });

// 设置路径
CookieUtils.set('preference', 'dark', { path: '/' });

// 设置安全 Cookie
CookieUtils.set('token', 'secret', { secure: true, expires: 1 });

// 设置对象（会自动转换为字符串）
CookieUtils.set('data', JSON.stringify({ id: 1, name: 'John' }));
```

---

### remove

删除 Cookie。

```typescript
function remove(name: string, options?: CookieOptions): string
```

**参数：**
- `name`: Cookie 名称
- `options`: 配置选项（path 和 domain 应与原始 Cookie 匹配）

**示例：**

```typescript
import { CookieUtils } from '@oh/yee-tools';

// 删除基本 Cookie
CookieUtils.remove('username');

// 删除带路径的 Cookie
CookieUtils.remove('session', { path: '/' });

// 删除带域名的 Cookie
CookieUtils.remove('token', { path: '/', domain: '.example.com' });
```

## 常见用例

```typescript
import { CookieUtils } from '@oh/yee-tools';

// 用户会话管理
function login(username: string, remember: boolean) {
  const expires = remember ? 30 : 1; // 30天或1天
  CookieUtils.set('username', username, { expires, path: '/' });
  CookieUtils.set('isLoggedIn', 'true', { expires, path: '/' });
}

function logout() {
  CookieUtils.remove('username', { path: '/' });
  CookieUtils.remove('isLoggedIn', { path: '/' });
}

// 用户偏好设置
function savePreference(theme: 'light' | 'dark') {
  CookieUtils.set('theme', theme, { expires: 365, path: '/' });
}

function getPreference(): 'light' | 'dark' {
  return CookieUtils.get('theme') || 'light';
}

// 购物车数据
function saveCart(items: CartItem[]) {
  CookieUtils.set('cart', JSON.stringify(items), { expires: 7 });
}

function getCart(): CartItem[] {
  const data = CookieUtils.get('cart');
  return data ? JSON.parse(data as string) : [];
}
```

## 注意事项

1. **删除 Cookie 时需要匹配选项**：删除 Cookie 时的 `path` 和 `domain` 必须与设置时一致
2. **存储大小限制**：Cookie 有大小限制（通常为 4KB）
3. **安全性**：敏感数据应使用 `secure: true` 并考虑使用 HttpOnly
4. **URI 编码**：默认会对值进行 URI 编码，如需禁用可设置 `raw: true`
