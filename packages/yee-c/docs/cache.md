# 缓存工具 (Cache)

缓存管理工具，提供三种不同生命周期的缓存策略。

## 安装

```bash
npm install @oh/yee-tools
```

## 引入方式

### 方式一：命名空间导入（推荐）

```typescript
import { SessionContext, LocalContext, PageContext } from '@oh/yee-tools/cache';

// 或直接引入
import { SessionContext } from '@oh/yee-tools';
import { LocalContext } from '@oh/yee-tools';
import { PageContext } from '@oh/yee-tools';
```

### 方式二：按需引入

```typescript
import { SessionContext } from '@oh/yee-tools/cache/session';
import { LocalContext } from '@oh/yee-tools/cache/local';
import { PageContext } from '@oh/yee-tools/cache/page';
```

## 缓存类型对比

| 类型 | 存储位置 | 生命周期 | 使用场景 |
|------|---------|---------|---------|
| **SessionContext** | sessionStorage | 浏览器关闭后清除 | 用户会话数据、临时状态 |
| **LocalContext** | localStorage | 永久保存（除非手动清除） | 用户偏好设置、持久化数据 |
| **PageContext** | 内存（Map） | 页面刷新后清除 | 页面级临时数据、组件间共享 |

---

## SessionContext

会话级缓存，使用 `sessionStorage`，浏览器关闭后自动清除。

### API

```typescript
// 存储数据
SessionContext.put<T>(key: string, value: T): T

// 深度合并存储（支持路径如 'person.sport.like'）
SessionContext.set<T>(key: string, value: T): unknown

// 获取数据
SessionContext.get<T>(key: string, parse?: boolean): T | null

// 删除数据
SessionContext.remove(key: string): void

// 清空所有数据
SessionContext.clear(): void

// 获取所有键
SessionContext.keys(): string[]

// 检查键是否存在
SessionContext.has(key: string): boolean

// 检查存储空间
SessionContext.checkSize(maxSizeKB: number): boolean
```

### 示例

```typescript
import { SessionContext } from '@oh/yee-tools';

// 存储用户令牌
SessionContext.put('Authorization', 'Bearer token123');

// 存储用户信息
SessionContext.put('userInfo', { id: 1, name: 'John' });

// 深度合并存储
SessionContext.set('user.profile.theme', 'dark');

// 获取数据
const token = SessionContext.get('Authorization');
const user = SessionContext.get('userInfo');

// 检查是否存在
if (SessionContext.has('userInfo')) {
  console.log('User is logged in');
}

// 清除特定数据
SessionContext.remove('userInfo');

// 登出时清空所有数据
SessionContext.clear();
```

---

## LocalContext

本地缓存，使用 `localStorage`，数据永久保存。

### API

```typescript
// 存储数据
LocalContext.put<T>(key: string, value: T): T

// 获取数据
LocalContext.get<T>(key: string, parse?: boolean): T | null

// 删除数据
LocalContext.remove(key: string): void

// 清空所有数据
LocalContext.clear(): void

// 获取所有键
LocalContext.keys(): string[]

// 检查键是否存在
LocalContext.has(key: string): boolean

// 检查存储空间
LocalContext.checkSize(maxSizeKB: number): boolean
```

### 示例

```typescript
import { LocalContext } from '@oh/yee-tools';

// 存储用户偏好
LocalContext.put('preferences', {
  theme: 'dark',
  language: 'zh-CN',
  fontSize: 14
});

// 获取偏好设置
const prefs = LocalContext.get('preferences');
if (prefs) {
  applyTheme(prefs.theme);
}

// 检查存储空间
if (!LocalContext.checkSize(5000)) {
  console.warn('Storage space is low');
}

// 清除过期数据
LocalContext.remove('oldCache');
```

---

## PageContext

页面级缓存，使用内存 Map，页面刷新后自动清除。

### API

```typescript
// 存储数据
PageContext.put(key: string, value: unknown): void

// 获取数据
PageContext.get<T>(key: string): T | undefined

// 删除数据
PageContext.remove(key: string): void

// 清空所有数据
PageContext.clear(): void

// 获取所有键
PageContext.keys(): IterableIterator<string>

// 获取所有值
PageContext.values(): IterableIterator<unknown>

// 获取所有条目
PageContext.entries(): IterableIterator<[string, unknown]>

// 检查键是否存在
PageContext.has(key: string): boolean

// 获取条目数量
PageContext.size(): number
```

### 示例

```typescript
import { PageContext } from '@oh/yee-tools';

// 存储页面数据
PageContext.put('formData', { name: 'John', email: 'john@example.com' });

// 获取数据
const form = PageContext.get('formData');

// 遍历所有数据
for (const [key, value] of PageContext.entries()) {
  console.log(key, value);
}

// 获取条目数量
console.log(`Cached items: ${PageContext.size()}`);

// 路由切换时清空
function onRouteChange() {
  PageContext.clear();
}
```

## 常见用例

### 用户认证状态管理

```typescript
import { SessionContext } from '@oh/yee-tools';

// 登录
function login(token: string, user: User) {
  SessionContext.put('Authorization', token);
  SessionContext.put('userInfo', user);
}

// 检查登录状态
function isLoggedIn(): boolean {
  return SessionContext.has('Authorization');
}

// 登出
function logout() {
  SessionContext.clear();
}
```

### 用户偏好设置

```typescript
import { LocalContext } from '@oh/yee-tools';

// 保存偏好
function savePreferences(prefs: Preferences) {
  LocalContext.put('preferences', prefs);
}

// 加载偏好
function loadPreferences(): Preferences {
  return LocalContext.get('preferences') || defaultPreferences;
}

// 更新主题
function updateTheme(theme: string) {
  const prefs = loadPreferences();
  prefs.theme = theme;
  LocalContext.put('preferences', prefs);
}
```

### 表单数据临时缓存

```typescript
import { PageContext } from '@oh/yee-tools';

// 保存表单草稿
function saveDraft(formData: FormData) {
  PageContext.put('draftForm', formData);
}

// 恢复表单
function restoreDraft(): FormData | undefined {
  return PageContext.get('draftForm');
}

// 提交后清除
function onSubmit() {
  submitForm(PageContext.get('draftForm'));
  PageContext.remove('draftForm');
}
```

### 混合使用策略

```typescript
import { SessionContext, LocalContext, PageContext } from '@oh/yee-tools';

// 1. 敏感信息用 SessionContext（会话结束自动清除）
SessionContext.put('token', authToken);
SessionContext.put('temporaryState', tempData);

// 2. 用户偏好用 LocalContext（持久化保存）
LocalContext.put('userPreferences', preferences);
LocalContext.put('recentSearches', searches);

// 3. 页面临时数据用 PageContext（刷新后清除）
PageContext.put('currentPageData', pageData);
PageContext.put('formDraft', formData);
```

## 注意事项

1. **存储限制**：localStorage/sessionStorage 通常限制为 5-10MB
2. **敏感数据**：不要在 LocalContext 中存储敏感信息
3. **JSON 序列化**：复杂对象会自动序列化/反序列化
4. **同步操作**：所有操作都是同步的，大量数据可能阻塞
5. **页面刷新**：PageContext 数据会在刷新后丢失
