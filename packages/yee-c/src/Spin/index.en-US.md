---
category: Components
title: Spin
subtitle: Spin
group:
  title: Feedback
  order: 37
toc: 'content'
---

# Spin

Used for page and block loading status.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Spin"></code>
<code src="./demo/types.tsx" title="Types" description="Different types of Spin"></code>
<code src="./demo/size.tsx" title="Size" description="Different sizes of Spin"></code>
<code src="./demo/color.tsx" title="Color" description="Different colors of Spin"></code>
<code src="./demo/custom.tsx" title="Custom Size" description="Custom width and height"></code>
<code src="./demo/container.tsx" title="Container" description="Loading state in container"></code>
<code src="./demo/tip.tsx" title="Tip" description="Loading with tip text"></code>

## API

### SpinProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| type | `SpinType` | Loading type | - |
| color | `'info' \| 'success' \| 'warning' \| 'error' \| 'default' \| string` | Color | - |
| fullscreen | `boolean` | Full screen display | - |
| getContainer | `() => HTMLElement` | Get Spin mount node, only effective when fullscreen is true | - |
| size | `'small' \| 'default' \| 'large'` | Icon size | - |
| spinning | `boolean` | Whether it is loading state | - |
| width | `number` | Custom width | - |
| height | `number \| string` | Custom height | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root inline style | - |
| classNames | `Partial<Record<'tip' \| 'indicator', string>>` | Semantic structure class names | - |
| styles | `Partial<Record<'tip' \| 'indicator', React.CSSProperties>>` | Semantic structure styles | - |
| tip | `React.ReactNode` | Loading tip text | - |
| delay | `number` | Delay in milliseconds to show loading effect | - |
| variant | `'dot' \| 'ring' \| 'spokes'` | Indicator variant, `ring` for rotating circle, `spokes` for radiating lines | `'dot'` |
| indicator | `React.ReactNode` | Loading indicator | - |
| mask | `boolean` | Whether to show mask | - |
| children | `React.ReactNode` | Children elements | - |

### SpinType

| Type | Description |
| --- | --- |
| blank | Blank type |
| balls | Balls type |
| bars | Bars type |
| bubbles | Bubbles type |
| cubes | Cubes type |
| cylon | Cylon type |
| spin | Spin type |
| spinningBubbles | Spinning bubbles type |
| spokes | Spokes type |