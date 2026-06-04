---
category: Components
title: JsonViewer
subtitle: JSON Viewer
group:
  title: Data Display
  order: 23
toc: 'content'
---

# JsonViewer

A component for displaying JSON data in a tree structure.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of JsonViewer"></code>
<code src="./demo/colors.tsx" title="Custom Colors" description="JsonViewer with custom colors"></code>
<code src="./demo/complex.tsx" title="Complex Data" description="Displaying complex nested data"></code>

## API

### JsonViewerProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom prefix class name | - |
| data | [JsonValue](#jsonvalue) | Data to display | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom style | - |
| colors | `{ key?: string; array?: Array<string>; object?: Array<string>; string?: string; number?: string; boolean?: string; null?: string; undefined?: string }` | Custom colors | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### JsonValue

```ts
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };
```

### InternalJsonViewer

Internal interface used for recursive rendering.

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| depth | `number` | Current depth level | - |
| name | `string` | Current level key | - |
| latest | `boolean` | Whether it is the last item | - |