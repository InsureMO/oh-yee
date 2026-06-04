# 请求工具 (Fetch)

现代化的 HTTP 请求库，基于 XMLHttpRequest 和 Fetch API。

## 安装

```bash
npm install @oh/yee-tools
```

## 引入方式

```typescript
import { ax, get, post, put, del, patch, createAxInstance } from '@oh/yee-tools/fetch';
```

## API

### ax - 默认实例

默认的 Axios 风格实例，可直接使用。

```typescript
// GET 请求
ax.get(url: string, config?: AxConfig): Promise<any>

// POST 请求
ax.post(url: string, data?: any, config?: AxConfig): Promise<any>

// PUT 请求
ax.put(url: string, data?: any, config?: AxConfig): Promise<any>

// DELETE 请求
ax.delete(url: string, config?: AxConfig): Promise<any>

// PATCH 请求
ax.patch(url: string, data?: any, config?: AxConfig): Promise<any>

// 通用请求
ax.request(config: AxConfig): Promise<any>
```

### 便捷方法

```typescript
import { get, post, put, del, patch } from '@oh/yee-tools/fetch';

// GET
get(url, config?)

// POST
post(url, data?, config?)

// PUT
put(url, data?, config?)

// DELETE
del(url, config?)

// PATCH
patch(url, data?, config?)
```

### createAxInstance - 创建自定义实例

```typescript
function createAxInstance(defaultConfig?: DefaultAxConfig): Ax
```

## 基础示例

### GET 请求

```typescript
import { ax } from '@oh/yee-tools/fetch';

// 简单 GET
const users = await ax.get('/api/users');

// 带查询参数
const user = await ax.get('/api/users/1');

// 带配置
const data = await ax.get('/api/data', {
  params: { page: 1, size: 10 },
  headers: { 'Authorization': 'Bearer token' }
});
```

### POST 请求

```typescript
import { ax } from '@oh/yee-tools/fetch';

// 发送 JSON 数据
const newUser = await ax.post('/api/users', {
  name: 'John',
  email: 'john@example.com'
});

// 带配置
const response = await ax.post('/api/users', userData, {
  headers: { 'Content-Type': 'application/json' }
});
```

### PUT 请求

```typescript
import { ax } from '@oh/yee-tools/fetch';

const updatedUser = await ax.put('/api/users/1', {
  name: 'John Doe'
});
```

### DELETE 请求

```typescript
import { ax } from '@oh/yee-tools/fetch';

await ax.delete('/api/users/1');
```

### PATCH 请求

```typescript
import { ax } from '@oh/yee-tools/fetch';

const partialUpdate = await ax.patch('/api/users/1', {
  status: 'active'
});
```

## 高级用法

### 创建自定义实例

```typescript
import { createAxInstance } from '@oh/yee-tools/fetch';

// 创建 API 实例
const api = createAxInstance({
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  }
});

// 使用自定义实例
const users = await api.get('/users');
```

### 请求配置

```typescript
import { ax } from '@oh/yee-tools/fetch';

const response = await ax.request({
  url: '/api/data',
  method: 'POST',
  data: { key: 'value' },
  params: { page: 1 },
  headers: {
    'Custom-Header': 'value'
  },
  timeout: 10000,
  responseType: 'json',
  dispatcher: 'fetch'  // 或 'xhr'
});
```

### 错误处理

```typescript
import { ax } from '@oh/yee-tools/fetch';

try {
  const response = await ax.get('/api/data', {
    onError: (error) => {
      console.error('Request failed:', error);
    }
  });
} catch (error) {
  console.error('Unexpected error:', error);
}
```

### 请求/响应拦截

```typescript
import { ax } from '@oh/yee-tools/fetch';

const response = await ax.request({
  url: '/api/data',
  beforeRequest: (config) => {
    // 请求前处理
    console.log('Making request:', config);
    return config;
  },
  onSuccess: (data, xhr) => {
    // 成功回调
    console.log('Response:', data);
    return data;
  },
  onError: (error) => {
    // 错误处理
    console.error('Error:', error);
    throw error;
  }
});
```

### 上传进度

```typescript
import { ax } from '@oh/yee-tools/fetch';

const formData = new FormData();
formData.append('file', file);

await ax.post('/api/upload', formData, {
  onUploadProgress: (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(`Upload: ${percentCompleted}%`);
  }
});
```

## 常见用例

### RESTful API 客户端

```typescript
import { createAxInstance } from '@oh/yee-tools/fetch';

const api = createAxInstance({
  baseUrl: 'https://api.example.com',
  timeout: 10000
});

export const userApi = {
  getAll: () => api.get('/users'),
  getById: (id: number) => api.get(`/users/${id}`),
  create: (data: User) => api.post('/users', data),
  update: (id: number, data: User) => api.put(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`)
};
```

### 认证拦截器

```typescript
import { createAxInstance } from '@oh/yee-tools/fetch';

const authApi = createAxInstance({
  beforeRequest: (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`
      };
    }
    return config;
  }
});
```

### 并发请求

```typescript
import { ax } from '@oh/yee-tools/fetch';

const [users, posts, comments] = await Promise.all([
  ax.get('/api/users'),
  ax.get('/api/posts'),
  ax.get('/api/comments')
]);
```

## 配置选项

```typescript
interface AxConfig {
  url?: string;
  method?: HttpMethod;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  responseType?: ResponseType;
  dispatcher?: 'xhr' | 'fetch';
  async?: boolean;
  withCredentials?: boolean;
  beforeRequest?: (config: AxConfig) => AxConfig;
  onSuccess?: (data: any, xhr?: XMLHttpRequest) => void;
  onError?: (error: ErrorResponse) => void;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  onDownloadProgress?: (progressEvent: ProgressEvent) => void;
}
```

## 注意事项

1. **调度器选择**：默认使用 `fetch`，如需同步请求可使用 `xhr`
2. **超时处理**：设置合理的 `timeout` 值避免请求挂起
3. **错误处理**：始终使用 `try-catch` 或 `onError` 处理错误
4. **类型定义**：支持完整的 TypeScript 类型定义
