---
category: Components
title: Space
subtitle: Space
group:
  title: Layout
  order: 36
toc: 'content'
---

# Space

Set components spacing.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Space"></code>
<code src="./demo/direction.tsx" title="Direction" description="Space direction"></code>
<code src="./demo/gap.tsx" title="Gap" description="Customize spacing"></code>
<code src="./demo/wrap.tsx" title="Wrap" description="Wrap line when space is insufficient"></code>
<code src="./demo/align.tsx" title="Align" description="Alignment of items"></code>
<code src="./demo/compact.tsx" title="Compact" description="Compact layout"></code>

## API

### SpaceProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| children | `Array<React.ReactNode> \| React.ReactNode` | Child components | - |
| gap | `number` | Spacing | - |
| direction | `'horizontal' \| 'vertical'` | Layout direction | `horizontal` |
| wrap | `boolean` | Whether to wrap line | - |
| align | `'center' \| 'start' \| 'end' \| 'baseline' \| 'flex-start'` | Alignment | - |
| block | `boolean` | Whether to occupy the whole line | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom inline style | - |
| classNames | `Partial<Record<'item', string>>` | Semantic class names | - |
| styles | `Partial<Record<'item', React.CSSProperties>>` | Semantic styles | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### SpaceCompactProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| children | `React.ReactElement[]` | Child elements | - |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom class name | - |
| direction | `'horizontal' \| 'vertical'` | Layout direction | `horizontal` |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |