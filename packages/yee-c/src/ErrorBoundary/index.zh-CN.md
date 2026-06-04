---
category: Components
title: ErrorBoundary
subtitle: 错误边界
group:
  title: 其他
  order: 18
toc: 'content'
---

# ErrorBoundary 错误边界

捕获组件树中的错误并显示降级 UI，自动识别错误类型，展示源码定位，支持一键复制错误信息。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="ErrorBoundary的基础用法"></code>
<code src="./demo/callback.tsx" title="错误回调" description="通过回调函数处理错误"></code>

## API

### ErrorBoundaryProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 类名前缀 | `'yee-error-boundary'` |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义样式 | - |
| onError | `(params: { error: Error; errorInfo: React.ErrorInfo }) => void` | 错误事件回调 | - |
| renderError | `() => React.ReactNode` | 自定义错误展示组件，设置后覆盖默认 UI | - |
| onDismiss | `() => void` | 关闭错误面板回调 | - |
| children | `React.ReactNode` | 子元素 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### ErrorCategory

错误类型枚举，由组件自动识别：

| 值 | 对应错误 |
| --- | --- |
| `'type'` | TypeError |
| `'reference'` | ReferenceError |
| `'range'` | RangeError |
| `'syntax'` | SyntaxError |
| `'uri'` | URIError |
| `'chunk'` | ChunkLoadError（动态加载失败） |
| `'network'` | NetworkError（网络请求/超时） |
| `'resource'` | ResourceError（资源加载失败，仅 GlobalErrorListener） |
| `'unknown'` | 其他未知错误 |

### GlobalErrorListenerProps

全局错误监听组件，捕获 ErrorBoundary 无法处理的异步错误、网络错误和资源加载失败。

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| onError | `(params: { category: ErrorCategory; label: string; error: Error; source?: string }) => void` | 全局错误回调 | - |
| children | `React.ReactNode` | 子元素 | - |

```tsx
// 用法：包裹在应用根组件外层
import { GlobalErrorListener } from '@oh/yee-c';

<GlobalErrorListener onError={({ category, error }) => {
  reportToLogService(category, error);
}}>
  <App />
</GlobalErrorListener>
```

### 导出的工具函数

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `classifyError` | `(error: Error \| null) => ErrorCategory` | 根据错误对象识别错误类别 |
| `CATEGORY_LABEL` | `Record<ErrorCategory, string>` | 错误类别到显示名称的映射 |
| `parseSourceLocation` | `(stack: string \| undefined) => SourceLocation \| null` | 从 error.stack 中解析源码位置 |
| `fetchSourceSnippet` | `(location: SourceLocation, contextLines?: number) => Promise<SourceSnippet \| null>` | 获取报错位置附近的源码片段 |
