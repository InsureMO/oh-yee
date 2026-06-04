---
category: Components
title: Splitter
subtitle: Splitter
group:
  title: Layout
  order: 38
toc: 'content'
---

# Splitter

Split panels for layout.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Splitter"></code>
<code src="./demo/vertical.tsx" title="Vertical" description="Vertical layout"></code>
<code src="./demo/multiple.tsx" title="Multiple Panels" description="Multiple panels layout"></code>
<code src="./demo/collapsible.tsx" title="Collapsible" description="Collapsible panel"></code>
<code src="./demo/size.tsx" title="Size Control" description="Control panel size"></code>
<code src="./demo/nested.tsx" title="Nested" description="Nested splitters"></code>
<code src="./demo/bordered.tsx" title="Bordered" description="Splitter with borders"></code>

## API

### SplitterProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root element class name | - |
| style | `React.CSSProperties` | Custom root element style | - |
| layout | `'horizontal' \| 'vertical'` | Layout direction | `horizontal` |
| children | `React.ReactElement[]` | Children | - |
| bordered | `boolean` | Display border or not | - |
| itemPadding | `number \| string` | Item padding | - |
| onResize | `(sizes: number[]) => void` | Panel size change event | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### SplitterItemProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom item element class name prefix | - |
| className | `string` | Custom item element class name | - |
| style | `React.CSSProperties` | Custom item element style | - |
| collapsible | `boolean \| { start?: boolean; end?: boolean }` | Quick collapse | - |
| resizable | `boolean` | Enable drag and drop scaling | - |
| children | `React.ReactNode` | Children | - |
| min | `string \| number` | Panel min size | - |
| max | `string \| number` | Panel max size | - |
| size | `string \| number` | Panel size, controlled | - |
| defaultSize | `string \| number` | Default panel size, uncontrolled | - |
| onExpand | `(expanded: boolean) => void` | Expand event | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

## Notes

- Not yet adapted for mobile. Drag interaction has poor experience on touch screens