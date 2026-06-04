---
category: Components
title: ErrorBoundary
subtitle: Error Boundary
group:
  title: Other
  order: 18
toc: 'content'
---

# ErrorBoundary

Capture errors in component tree and display fallback UI. Automatically classifies error types, shows source code location, and supports one-click copy of error information.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of ErrorBoundary"></code>
<code src="./demo/callback.tsx" title="Error Callback" description="Handle error with callback function"></code>

## API

### ErrorBoundaryProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Class name prefix | `'yee-error-boundary'` |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom style | - |
| onError | `(params: { error: Error; errorInfo: React.ErrorInfo }) => void` | Error event callback | - |
| renderError | `() => React.ReactNode` | Custom error component, overrides default UI | - |
| onDismiss | `() => void` | Callback when error overlay is dismissed | - |
| children | `React.ReactNode` | Children | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### ErrorCategory

Error type enum, automatically classified by the component:

| Value | Error Type |
| --- | --- |
| `'type'` | TypeError |
| `'reference'` | ReferenceError |
| `'range'` | RangeError |
| `'syntax'` | SyntaxError |
| `'uri'` | URIError |
| `'chunk'` | ChunkLoadError (dynamic import failure) |
| `'network'` | NetworkError (request/timeout failure) |
| `'resource'` | ResourceError (resource load failure, GlobalErrorListener only) |
| `'unknown'` | Other unknown errors |

### GlobalErrorListenerProps

Global error listener component that catches async errors, network errors, and resource load failures that ErrorBoundary cannot handle.

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| onError | `(params: { category: ErrorCategory; label: string; error: Error; source?: string }) => void` | Global error callback | - |
| children | `React.ReactNode` | Children | - |

```tsx
// Usage: wrap outside the app root
import { GlobalErrorListener } from '@rainbow-oh/yee-c';

<GlobalErrorListener onError={({ category, error }) => {
  reportToLogService(category, error);
}}>
  <App />
</GlobalErrorListener>
```

### Exported Utilities

| Name | Type | Description |
| --- | --- | --- |
| `classifyError` | `(error: Error \| null) => ErrorCategory` | Classify error by its type |
| `CATEGORY_LABEL` | `Record<ErrorCategory, string>` | Mapping from error category to display name |
| `parseSourceLocation` | `(stack: string \| undefined) => SourceLocation \| null` | Parse source location from error stack |
| `fetchSourceSnippet` | `(location: SourceLocation, contextLines?: number) => Promise<SourceSnippet \| null>` | Fetch source code snippet around the error line |
