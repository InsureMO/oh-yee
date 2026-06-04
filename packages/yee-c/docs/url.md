# URL 工具 (UrlUtils)

URL 处理相关的工具函数。

## 安装

```bash
npm install @rainbow-oh/yee-tools
```

## 引入方式

### 方式一：命名空间导入（推荐）

适合需要使用多个 URL 工具函数：

```typescript
import { UrlUtils } from '@rainbow-oh/yee-tools';

UrlUtils.getUrlParam();
UrlUtils.buildQueryString({ id: '123' });
UrlUtils.updateUrlParams('http://example.com', { page: 1 });
```

### 方式二：按需引入

适合只需要使用单个函数：

```typescript
import { getUrlParam, buildQueryString, updateUrlParams } from '@rainbow-oh/yee-tools/url';

getUrlParam();
buildQueryString({ id: '123' });
updateUrlParams('http://example.com', { page: 1 });
```

## API

### getUrlParam

解析 URL 查询参数为对象。

支持常规 URL 和基于哈希路由的 URL（例如：`#/path?param=value`）。

```typescript
function getUrlParam(urlStr?: string): Record<string, string>
```

**参数：**
- `urlStr`: 可选的 URL 字符串，如果不提供则使用当前 `location.search`

**示例：**

```typescript
import { UrlUtils } from '@rainbow-oh/yee-tools';

// 解析当前 URL
// 当前 URL: http://example.com?id=123&name=test
UrlUtils.getUrlParam();
// => { id: '123', name: 'test' }

// 解析指定 URL
UrlUtils.getUrlParam('http://example.com?id=123&name=test');
// => { id: '123', name: 'test' }

// 解析哈希路由 URL
UrlUtils.getUrlParam('http://example.com?lang=en#/page?id=123');
// => { lang: 'en', id: '123' }
```

---

### buildQueryString

将对象转换为查询字符串。

```typescript
function buildQueryString(params: Record<string, string | number | boolean>): string
```

**参数：**
- `params`: 包含参数的对象

**返回：**
- 查询字符串（不包含前导 `?`）

**示例：**

```typescript
import { UrlUtils } from '@rainbow-oh/yee-tools';

UrlUtils.buildQueryString({ id: '123', name: 'test' });
// => 'id=123&name=test'

UrlUtils.buildQueryString({ page: 1, size: 20, active: true });
// => 'page=1&size=20&active=true'

// 空对象
UrlUtils.buildQueryString({});
// => ''
```

---

### updateUrlParams

更新 URL 的查询参数。

```typescript
function updateUrlParams(url: string, params: Record<string, string | number | boolean>): string
```

**参数：**
- `url`: 基础 URL
- `params`: 要添加/更新的参数

**示例：**

```typescript
import { UrlUtils } from '@rainbow-oh/yee-tools';

// 添加参数
UrlUtils.updateUrlParams('http://example.com', { id: '123' });
// => 'http://example.com?id=123'

// 更新现有参数
UrlUtils.updateUrlParams('http://example.com?name=test', { id: '123' });
// => 'http://example.com?name=test&id=123'

// 覆盖现有参数
UrlUtils.updateUrlParams('http://example.com?page=1', { page: 2 });
// => 'http://example.com?page=2'
```

---

### removeUrlParams

从 URL 中移除指定的查询参数。

```typescript
function removeUrlParams(url: string, keysToRemove: string[]): string
```

**参数：**
- `url`: 要修改的 URL
- `keysToRemove`: 要移除的参数键数组

**示例：**

```typescript
import { UrlUtils } from '@rainbow-oh/yee-tools';

// 移除单个参数
UrlUtils.removeUrlParams('http://example.com?id=123&name=test', ['id']);
// => 'http://example.com?name=test'

// 移除多个参数
UrlUtils.removeUrlParams('http://example.com?id=123&name=test&page=1', ['id', 'page']);
// => 'http://example.com?name=test'

// 移除所有参数
UrlUtils.removeUrlParams('http://example.com?id=123&name=test', ['id', 'name']);
// => 'http://example.com'
```

---

### normalizeURL

标准化 URL（内部使用）。

```typescript
function normalizeURL(url: string): string
```

## 常见用例

```typescript
import { UrlUtils } from '@rainbow-oh/yee-tools';

// 读取 URL 参数
function getProductId(): string {
  const params = UrlUtils.getUrlParam();
  return params.id || '';
}

// 构建分页链接
function buildPageUrl(page: number): string {
  const baseUrl = '/products';
  return UrlUtils.updateUrlParams(baseUrl, { page, size: 20 });
}

// 搜索过滤
function buildSearchUrl(filters: SearchFilters): string {
  return '/search?' + UrlUtils.buildQueryString(filters);
}

// 清理敏感参数
function sanitizeUrl(url: string): string {
  return UrlUtils.removeUrlParams(url, ['token', 'session']);
}

// SPA 路由处理
function handleRouteChange() {
  const params = UrlUtils.getUrlParam(window.location.href);
  const route = params.route;
  const id = params.id;
  // 处理路由...
}
```
