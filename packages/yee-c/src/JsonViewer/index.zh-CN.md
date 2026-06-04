---
category: Components
title: JsonViewer
subtitle: JSON查看器
group:
  title: 数据展示
  order: 23
toc: 'content'
---

# JsonViewer JSON查看器

用于以树形结构显示JSON数据的组件。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="JsonViewer的基础用法"></code>
<code src="./demo/colors.tsx" title="自定义颜色" description="自定义颜色的JsonViewer"></code>
<code src="./demo/complex.tsx" title="复杂数据" description="显示复杂的嵌套数据"></code>

## API

### JsonViewerProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义前缀类名 | - |
| data | [JsonValue](#jsonvalue) | 显示数据 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义样式 | - |
| colors | `{ key?: string; array?: Array<string>; object?: Array<string>; string?: string; number?: string; boolean?: string; null?: string; undefined?: string }` | 自定义颜色 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

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

用于递归渲染的内部接口。

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| depth | `number` | 当前层级 | - |
| name | `string` | 当前层级的key | - |
| latest | `boolean` | 是否是最后一项 | - |