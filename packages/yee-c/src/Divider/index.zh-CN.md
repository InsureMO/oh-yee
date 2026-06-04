---
category: Components
title: Divider
subtitle: 分割线
group:
  title: 布局
  order: 15
toc: 'content'
---

# Divider 分割线

区隔内容的分割线。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Divider的基础用法"></code>
<code src="./demo/with-text.tsx" title="带文字" description="带文字的分割线"></code>
<code src="./demo/variant.tsx" title="不同样式" description="不同样式的分割线"></code>
<code src="./demo/vertical.tsx" title="垂直分割线" description="垂直分割线"></code>

## API

### DividerProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 语义结构类名 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 语言结构样式 | - |
| orientation | `'left' \| 'center' \| 'right'` | 分割线标题的位置 | `'center'` |
| variant | `'solid' \| 'dashed' \| 'dotted'` | 分割线的样式，实线，虚线，点线 | `'solid'` |
| children | `React.ReactNode` | 子元素 | - |
| type | `'vertical' \| 'horizontal'` | 分割线是水平还是垂直 | `'horizontal'` |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### SemanticDOM

| 类型 |
| --- |
| `'text'` |