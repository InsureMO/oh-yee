---
category: Components
title: Divider
subtitle: Divider
group:
  title: Layout
  order: 15
toc: 'content'
---

# Divider

A divider line separates different content.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Divider"></code>
<code src="./demo/with-text.tsx" title="With Text" description="Divider with inner text"></code>
<code src="./demo/variant.tsx" title="Variants" description="Different line styles"></code>
<code src="./demo/vertical.tsx" title="Vertical" description="Vertical divider"></code>

## API

### DividerProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Semantic structure class names | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Semantic structure styles | - |
| orientation | `'left' \| 'center' \| 'right'` | The position of the dividing line title | `'center'` |
| variant | `'solid' \| 'dashed' \| 'dotted'` | The style of the dividing line | `'solid'` |
| children | `React.ReactNode` | Child elements | - |
| type | `'vertical' \| 'horizontal'` | Horizontal or vertical dividing line | `'horizontal'` |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### SemanticDOM

| Type |
| --- |
| `'text'` |