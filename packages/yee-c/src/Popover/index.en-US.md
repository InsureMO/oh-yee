---
category: Components
title: Popover
subtitle: Popover
group:
  title: Data Display
  order: 30
toc: 'content'
---

# Popover

A popup box that displays information when a user clicks, focuses, or hovers over an element.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Popover"></code>
<code src="./demo/trigger.tsx" title="Trigger" description="Different trigger modes"></code>
<code src="./demo/placement.tsx" title="Placement" description="Different placement of Popover"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled Popover"></code>
<code src="./demo/custom.tsx" title="Custom Content" description="Custom content in Popover"></code>
<code src="./demo/arrow.tsx" title="No Arrow" description="Popover without arrow"></code>

## API

### PopoverProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| children | `React.ReactElement` | children | - |
| title | `React.ReactNode \| (() => React.ReactNode)` | title | - |
| content | `React.ReactNode \| (() => React.ReactNode)` | content | - |
| className | `string` | custome popover root element class name | - |
| style | `React.CSSProperties` | custome popover root element style | - |
| styles | `Partial<Record<CompositionDOM, React.CSSProperties>>` | Structured style | - |
| classNames | `Partial<Record<CompositionDOM, string>>` | Structured class name | - |
| onOpenChange | `(open: boolean) => void` | open change callback | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### CompositionDOM

| Type |
| --- |
| `'header' \| 'content'` |

Other properties are inherited from [Trigger](/components/trigger).