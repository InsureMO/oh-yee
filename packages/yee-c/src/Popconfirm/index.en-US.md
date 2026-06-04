---
category: Components
title: Popconfirm
subtitle: Popconfirm
group:
  title: Feedback
  order: 29
toc: 'content'
---

# Popconfirm

A simple and compact confirmation dialog of an action.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Popconfirm"></code>
<code src="./demo/placement.tsx" title="Placement" description="Different placement of Popconfirm"></code>
<code src="./demo/customText.tsx" title="Custom Text" description="Custom confirm and cancel button text"></code>
<code src="./demo/icon.tsx" title="Custom Icon" description="Custom icon in Popconfirm"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled Popconfirm"></code>
<code src="./demo/disabled.tsx" title="Disabled" description="Disabled Popconfirm"></code>

## API

### PopconfirmProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| children | `React.ReactNode` | children | - |
| disabled | `boolean` | disabled children click | - |
| icon | `React.ReactNode` | icon | - |
| title | `React.ReactNode \| (() => React.ReactNode)` | title | - |
| description | `React.ReactNode \| (() => React.ReactNode)` | description | - |
| style | `React.CSSProperties` | confirm popup style | - |
| className | `string` | confirm popup class name | - |
| styles | `Partial<Record<CompositionDOM, React.CSSProperties>>` | Structured style | - |
| classNames | `Partial<Record<CompositionDOM, string>>` | Structured class name | - |
| open | `boolean` | open, controllered | - |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | placement | - |
| confirmText | `string` | set confirm button text | - |
| cancelText | `string` | set cancel button text | - |
| onConfirm | `() => void` | confirm callback | - |
| onCancel | `() => void` | cancel callback | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### CompositionDOM

| Type |
| --- |
| `'header' \| 'title' \| 'description' \| 'footer'` |