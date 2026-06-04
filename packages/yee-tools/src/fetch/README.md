# YeeTools Fetch - Modern HTTP Request Library

A TypeScript-based modern HTTP request library that supports both XMLHttpRequest and Fetch API, providing complete type definitions and rich configuration options.

## Features

- Modern design - Built on TypeScript with full type support
- Dual engine support - Supports both XMLHttpRequest and Fetch API
- Progress monitoring - Supports upload and download progress tracking
- Error handling - Comprehensive error handling and retry mechanisms
- Highly configurable - Rich configuration options and interceptors
- Cross-platform - Supports both browser and Node.js environments
- Lightweight - No external dependencies, small footprint

## Installation

```bash
npm install @oh/yee-tools
# or
yarn add @oh/yee-tools
# or
pnpm add @oh/yee-tools
```

## Quick Start

### Basic Usage

```typescript
import { ax, get, post } from "@oh/yee-tools/fetch";

// Use the default instance
const users = await ax.get("/api/users");

// Use convenience functions
const response = await get("/api/users", {
  params: { page: 1, limit: 10 },
});

// POST request
const newUser = await post("/api/users", {
  name: "John Doe",
  email: "john@example.com",
});
```

### Creating a Custom Instance

```typescript
import { createAxInstance } from "@oh/yee-tools/fetch";

const api = createAxInstance({
  baseUrl: "https://api.example.com",
  timeout: 5000,
  headers: {
    Authorization: "Bearer your-token",
    "Content-Type": "application/json",
  },
});

const users = await api.get("/users");
```

## API Documentation

### Request Methods

#### `ax.request(config)`

The core method for making HTTP requests.

```typescript
const response = await ax.request({
  url: "/api/data",
  method: "POST",
  data: { message: "Hello" },
  headers: { "Custom-Header": "value" },
});
```

#### Convenience Methods

- `ax.get(url, config?)` - GET request
- `ax.post(url, data?, config?)` - POST request
- `ax.put(url, data?, config?)` - PUT request
- `ax.delete(url, config?)` - DELETE request
- `ax.patch(url, data?, config?)` - PATCH request
- `ax.head(url, config?)` - HEAD request
- `ax.options(url, config?)` - OPTIONS request

### Configuration Options

```typescript
interface AxConfig {
  url: string; // Request URL
  method?: HttpMethod; // HTTP method
  data?: any; // Request data
  params?: Record<string, any>; // URL parameters
  headers?: Record<string, string>; // Request headers
  timeout?: number; // Timeout duration (ms)
  responseType?: ResponseType; // Response type
  dispatcher?: "xhr" | "fetch"; // Request engine
  withCredentials?: boolean; // Whether to include credentials

  // Event callbacks
  onSuccess?: (response: any, xhr?: XMLHttpRequest) => void;
  onError?: (error: any, xhr?: XMLHttpRequest) => void;
  onProgress?: (event: ProgressEvent, xhr?: XMLHttpRequest) => void;
  onUploadProgress?: (event: ProgressEvent, xhr?: XMLHttpRequest) => void;
  onTimeout?: (event: Event, xhr?: XMLHttpRequest) => void;
  onLoaded?: (event: Event, xhr?: XMLHttpRequest) => void;
}
```

## Usage Examples

### File Upload

```typescript
const formData = new FormData();
formData.append("file", file);
formData.append("description", "File description");

const response = await ax.post("/api/upload", formData, {
  formDataWithBoundary: true,
  onUploadProgress: (event) => {
    const percent = Math.round((event.loaded * 100) / event.total);
    console.log(`Upload progress: ${percent}%`);
  },
});
```

### Download Progress Monitoring

```typescript
const response = await ax.get("/api/large-file", {
  onProgress: (event) => {
    if (event.lengthComputable) {
      const percent = Math.round((event.loaded * 100) / event.total);
      console.log(`Download progress: ${percent}%`);
    }
  },
});
```

### Using the Fetch API

```typescript
const response = await ax.request({
  url: "/api/data",
  method: "GET",
  dispatcher: "fetch", // Use Fetch API
  responseType: "json",
});
```

### Error Handling

```typescript
try {
  const response = await ax.get("/api/data");
} catch (error) {
  if (error.status === "timeout") {
    console.log("Request timed out");
  } else if (error.status === "error") {
    console.log("Request error:", error.error);
  }
}
```

### Concurrent Requests

```typescript
const [users, posts, comments] = await Promise.all([
  ax.get("/api/users"),
  ax.get("/api/posts"),
  ax.get("/api/comments"),
]);
```

### Request Retry

```typescript
async function requestWithRetry(url: string, maxRetries = 3) {
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      return await ax.get(url);
    } catch (error) {
      retryCount++;
      if (retryCount >= maxRetries) throw error;

      // Exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, retryCount) * 1000),
      );
    }
  }
}
```

## Advanced Features

### Custom Request Headers

```typescript
// Global default headers
const api = createAxInstance({
  headers: {
    Authorization: "Bearer token",
    "X-API-Version": "v1",
  },
});

// Per-request custom headers
const response = await ax.get("/api/data", {
  headers: {
    "Custom-Header": "value",
  },
});
```

### Data Transformation

```typescript
const response = await ax.request({
  url: "/api/data",
  method: "POST",
  data: { message: "Hello" },
  transformRequest: (data, headers) => {
    // Custom request data transformation
    return JSON.stringify(data);
  },
  transformResponse: (data) => {
    // Custom response data transformation
    return data.result;
  },
});
```

### Timeout Handling

```typescript
const response = await ax.get("/api/slow-endpoint", {
  timeout: 5000, // 5-second timeout
  onTimeout: (event) => {
    console.log("Request timed out");
  },
});
```

## Type Definitions

The library provides complete TypeScript type definitions:

```typescript
import type {
  AxConfig,
  DefaultAxConfig,
  AxInstance,
  HttpMethod,
  ResponseType,
  ErrorResponse,
  ProgressEvent,
} from "@oh/yee-tools/fetch";
```

## Browser Compatibility

- Chrome >= 60
- Firefox >= 55
- Safari >= 12
- Edge >= 79
- IE >= 11 (requires polyfill)

## License

MIT License

## Contributing

Issues and Pull Requests are welcome!

## Changelog

### v1.0.0

- Initial release
- XMLHttpRequest and Fetch API support
- Complete TypeScript type support
- Progress monitoring and error handling
- File upload and download functionality
