---
category: Components
title: Rate
subtitle: Rate
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# Rate

Rate component for rating things.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Rate"></code>
<code src="./demo/half.tsx" title="Half Star" description="Support half star"></code>
<code src="./demo/readonly.tsx" title="Readonly" description="Readonly mode"></code>
<code src="./demo/clear.tsx" title="Clear" description="Clear the rating"></code>
<code src="./demo/character.tsx" title="Other Character" description="Replace the default star with other character"></code>
<code src="./demo/tooltip.tsx" title="Tooltip" description="Show tooltip with Rate"></code>

## API

### RateProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | custom class name prefix | - |
| children | `React.ReactElement` | children, used to customize rating icons or content | - |
| style | `React.CSSProperties` | inline style object | - |
| className | `string` | custom CSS class name | - |
| count | `number` | total rating count | `5` |
| value | `number` | current rating value (controlled mode) | - |
| defaultValue | `number` | default rating value (uncontrolled mode) | - |
| disabled | `boolean` | disable rating selection | - |
| allowHalf | `boolean` | allow half star rating | - |
| allowClear | `boolean` | allow clearing selected rating | - |
| character | `React.ReactNode \| ((params: { index: number }) => React.ReactNode)` | customize rating icon or content | - |
| onChange | `(value: number) => void` | rating change callback | - |
| onHoverChange | `(value: number) => void` | mouse hover rating callback | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |