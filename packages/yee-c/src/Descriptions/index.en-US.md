---
category: Components
title: Descriptions
subtitle: Descriptions
group:
  title: Data Display
  order: 9
toc: 'content'
---

# Descriptions

Display read-only detail data in key-value pairs, commonly used in detail pages and info display.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Descriptions"></code>
<code src="./demo/bordered.tsx" title="Bordered" description="Descriptions with bordered style"></code>
<code src="./demo/column.tsx" title="Column & Span" description="Customize column count and item span"></code>
<code src="./demo/vertical.tsx" title="Vertical" description="Vertical layout with label above content"></code>
<code src="./demo/items.tsx" title="Items" description="Configure data via items prop"></code>
<code src="./demo/size.tsx" title="Size" description="Different sizes of Descriptions"></code>

## API

### DescriptionsProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Semantic structure class names | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Semantic structure styles | - |
| bordered | `boolean` | Whether to show bordered style | `false` |
| column | `number` | Number of description items per row | `3` |
| layout | `'horizontal' \| 'vertical'` | Layout mode | `'horizontal'` |
| size | `'small' \| 'default' \| 'large'` | Size | `'default'` |
| title | `React.ReactNode` | Title | - |
| extra | `React.ReactNode` | Action area at top-right | - |
| items | `DescriptionsItem[]` | Description items config (recommended) | - |
| children | `React.ReactNode` | Using Descriptions.Item children | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### DescriptionsItem

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| key | `React.Key` | Unique key | - |
| label | `React.ReactNode` | Label content | - |
| children | `React.ReactNode` | Description content | - |
| span | `number \| 'filled'` | Number of columns to span, `'filled'` fills remaining space | `1` |

### DescriptionsItemProps (Child Component)

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom style | - |
| label | `React.ReactNode` | Label content | - |
| span | `number \| 'filled'` | Number of columns to span | `1` |
| children | `React.ReactNode` | Description content | - |

### SemanticDOM

| Type |
| --- |
| `'header' \| 'title' \| 'extra' \| 'label' \| 'content'` |
