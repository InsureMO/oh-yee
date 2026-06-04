# Fetch

Modern HTTP request library based on XMLHttpRequest and Fetch API.

## Installation

```bash
npm install @rainbow-oh/yee-tools
```

## Import

```typescript
import { ax, get, post, put, del, patch, createAxInstance } from '@rainbow-oh/yee-tools/fetch';
```

## API

### ax - Default Instance

Default Axios-style instance ready to use.

```typescript
// GET request
ax.get(url: string, config?: AxConfig): Promise<any>

// POST request
ax.post(url: string, data?: any, config?: AxConfig): Promise<any>

// PUT request
ax.put(url: string, data?: any, config?: AxConfig): Promise<any>

// DELETE request
ax.delete(url: string, config?: AxConfig): Promise<any>

// PATCH request
ax.patch(url: string, data?: any, config?: AxConfig): Promise<any>

// Generic request
ax.request(config: AxConfig): Promise<any>
```

### Convenience Methods

```typescript
import { get, post, put, del, patch } from '@rainbow-oh/yee-tools/fetch';

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

### createAxInstance - Create Custom Instance

```typescript
function createAxInstance(defaultConfig?: DefaultAxConfig): Ax
```

## Basic Examples

### GET Request

```typescript
import { ax } from '@rainbow-oh/yee-tools/fetch';

// Simple GET
const users = await ax.get('/api/users');

// With query parameters
const user = await ax.get('/api/users/1');

// With config
const data = await ax.get('/api/data', {
  params: { page: 1, size: 10 },
  headers: { 'Authorization': 'Bearer token' }
});
```

### POST Request

```typescript
import { ax } from '@rainbow-oh/yee-tools/fetch';

// Send JSON data
const newUser = await ax.post('/api/users', {
  name: 'John',
  email: 'john@example.com'
});

// With config
const response = await ax.post('/api/users', userData, {
  headers: { 'Content-Type': 'application/json' }
});
```

### PUT Request

```typescript
import { ax } from '@rainbow-oh/yee-tools/fetch';

const updatedUser = await ax.put('/api/users/1', {
  name: 'John Doe'
});
```

### DELETE Request

```typescript
import { ax } from '@rainbow-oh/yee-tools/fetch';

await ax.delete('/api/users/1');
```

### PATCH Request

```typescript
import { ax } from '@rainbow-oh/yee-tools/fetch';

const partialUpdate = await ax.patch('/api/users/1', {
  status: 'active'
});
```

## Advanced Usage

### Create Custom Instance

```typescript
import { createAxInstance } from '@rainbow-oh/yee-tools/fetch';

// Create API instance
const api = createAxInstance({
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  }
});

// Use custom instance
const users = await api.get('/users');
```

### Request Configuration

```typescript
import { ax } from '@rainbow-oh/yee-tools/fetch';

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
  dispatcher: 'fetch'  // or 'xhr'
});
```

### Error Handling

```typescript
import { ax } from '@rainbow-oh/yee-tools/fetch';

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

### Request/Response Interception

```typescript
import { ax } from '@rainbow-oh/yee-tools/fetch';

const response = await ax.request({
  url: '/api/data',
  beforeRequest: (config) => {
    // Pre-request processing
    console.log('Making request:', config);
    return config;
  },
  onSuccess: (data, xhr) => {
    // Success callback
    console.log('Response:', data);
    return data;
  },
  onError: (error) => {
    // Error handling
    console.error('Error:', error);
    throw error;
  }
});
```

### Upload Progress

```typescript
import { ax } from '@rainbow-oh/yee-tools/fetch';

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

## Common Use Cases

### RESTful API Client

```typescript
import { createAxInstance } from '@rainbow-oh/yee-tools/fetch';

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

### Auth Interceptor

```typescript
import { createAxInstance } from '@rainbow-oh/yee-tools/fetch';

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

### Parallel Requests

```typescript
import { ax } from '@rainbow-oh/yee-tools/fetch';

const [users, posts, comments] = await Promise.all([
  ax.get('/api/users'),
  ax.get('/api/posts'),
  ax.get('/api/comments')
]);
```

## Configuration Options

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

## Notes

1. **Dispatcher selection**: Default is `fetch`, use `xhr` for synchronous requests
2. **Timeout handling**: Set reasonable `timeout` values to avoid hanging requests
3. **Error handling**: Always use `try-catch` or `onError` for error handling
4. **Type definitions**: Full TypeScript type definitions supported
