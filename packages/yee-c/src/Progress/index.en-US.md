---
category: Components
title: Progress
subtitle: Progress
group:
  title: Feedback
  order: 31
toc: 'content'
---

# Progress

Display the current progress of an operation flow.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Progress"></code>
<code src="./demo/type.tsx" title="Type" description="Different types of Progress"></code>
<code src="./demo/size.tsx" title="Size" description="Different sizes of Progress"></code>
<code src="./demo/color.tsx" title="Color" description="Custom colors of Progress"></code>
<code src="./demo/steps.tsx" title="Steps" description="Step progress bar"></code>
<code src="./demo/format.tsx" title="Format" description="Custom text format"></code>

## API

### ProgressProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root inline style | - |
| percent | `number` | Completion percentage | - |
| status | `'info' \| 'success' \| 'error' \| 'default' \| 'warning'` | Status | - |
| type | `'circle' \| 'line' \| 'dashboard'` | Progress bar type | - |
| showInfo | `boolean` | Whether to show progress number or tip | `true` |
| strokeColor | `string | { '0%': string; '100%': string }` | Progress bar color | - |
| children | `React.ReactNode` | Children | - |
| format | `(percent: number) => React.ReactNode` | Format display content | - |
| strokeWidth | `number` | Stroke width | - |
| width | `number` | Width of circular progress bar | - |
| done | `{ percent: number }` | Done state | - |
| onMouseEnter | `(event: React.MouseEvent<HTMLDivElement>) => void` | Mouse enter callback | - |
| onMouseLeave | `(event: React.MouseEvent<HTMLDivElement>) => void` | Mouse leave callback | - |
| onClick | `(event: React.MouseEvent<HTMLDivElement>) => void` | Click callback | - |

### LineProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| steps | `number` | Total steps of progress bar | - |
| strokeColor | `string \| gradientColorType` | Progress bar color | - |
| children | `React.ReactNode` | Children | - |

### StepsProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| steps | `number` | Number of segments | `5` |
| strokeColor | `string \| string[]` | Progress bar color | - |
| children | `React.ReactNode` | Children | - |

### CircleProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| strokeColor | `string \| Record<string, string>` | Progress bar color | - |
| children | `React.ReactNode` | Children | - |