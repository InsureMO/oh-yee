---
category: Components
title: Steps
subtitle: Steps
group:
  title: Navigation
  order: 2
toc: 'content'
---

# Steps

Steps is a navigation bar that guides users through the steps of a task.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Steps"></code>
<code src="./demo/vertical.tsx" title="Vertical" description="Vertical direction steps"></code>
<code src="./demo/size.tsx" title="Size" description="Small size steps"></code>
<code src="./demo/dot.tsx" title="Dot" description="Dot style steps"></code>
<code src="./demo/icon.tsx" title="Icon" description="Custom icon steps"></code>
<code src="./demo/error.tsx" title="Error" description="Error status steps"></code>

## API

### StepsProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| items | `Array<StepItem>` | Step items | - |
| children | `React.ReactNode` | Children | - |
| current | `number` | Current step | `0` |
| size | `'small'` | Specify size | - |
| status | `'error' \| 'wait' \| 'process' \| 'finish'` | Current step status | - |
| dot | `boolean` | Dot style | - |
| direction | `'vertical' \| 'horizontal'` | Steps direction | `horizontal` |
| type | `'navigation' \| 'ribbon'` | Steps type | - |
| onChange | `(value: number) => void` | Change event | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### StepItem

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| icon | `React.ReactNode` | Custom icon | - |
| disabled | `boolean` | Whether disabled | - |
| title | `React.ReactNode` | Title | - |
| subTitle | `React.ReactNode` | Sub title | - |
| description | `React.ReactNode` | Description | - |
| status | `'wait' \| 'process' \| 'finish' \| 'error'` | Status | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### StepProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| index | `number` | Step index | - |
| icon | `React.ReactNode` | Custom icon | - |
| disabled | `boolean` | Whether disabled | - |
| title | `React.ReactNode` | Title | - |
| subTitle | `React.ReactNode` | Sub title | - |
| description | `React.ReactNode` | Description | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom style | - |
| status | `'wait' \| 'process' \| 'finish' \| 'error'` | Step status | - |
| onChange | `() => void` | Change event | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |