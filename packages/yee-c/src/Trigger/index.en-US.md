---
category: Components
title: Trigger
subtitle: Trigger
group:
  title: Other
  order: 61
toc: 'content'
demo:
  cols: 2
---

# Trigger

A trigger component for showing popups on hover, click, or focus events. Serves as the foundation for Tooltip, Popover, Dropdown, and other overlay components.

## Code Demo

<code src="./demo/basic.tsx" title="Click Trigger" description="Show popup on click"></code>
<code src="./demo/hover.tsx" title="Hover Trigger" description="Show popup on hover"></code>

## API

### TriggerProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | `'yee-trigger'` |
| popup | `ReactNode \| (() => ReactNode)` | Popup content | - |
| popupClassName | `string` | Popup class name | - |
| popupStyle | `React.CSSProperties` | Popup inline style | - |
| popupAlign | `{ points?: [Point, Point]; offset?: [number, number] }` | Popup alignment | - |
| children | `React.ReactNode` | Trigger element | - |
| trigger | `Array<'hover' \| 'click' \| 'focus'> \| 'hover' \| 'click' \| 'focus'` | Actions that trigger the popup | `'click'` |
| open | `boolean` | Controlled popup visibility | - |
| defaultOpen | `boolean` | Default popup visibility | - |
| placement | `Placement` | Popup placement relative to the trigger | `'top'` |
| destroyPopupOnHide | `boolean` | Whether to destroy the popup on hide | - |
| zIndex | `number` | Popup z-index | - |
| mouseEnterDelay | `number` | Delay (seconds) before showing on mouse enter | `0` |
| mouseLeaveDelay | `number` | Delay (seconds) before hiding on mouse leave | `0.2` |
| hideOnClick | `boolean` | Whether to hide when clicking inside the popup | `true` |
| alignPoint | `boolean` | Align popup to mouse position instead of trigger node | - |
| forceRender | `boolean` | Render popup to DOM on first mount | `false` |
| stretch | `'width' \| 'minWidth' \| 'height' \| 'minHeight'` | Make popup follow trigger dimensions | - |
| getPopupContainer | `(trigger: HTMLElement) => HTMLElement` | Custom popup render container | - |
| onOpenChange | `(visible: boolean) => void` | Callback when popup visibility changes | - |

### Placement

| Type |
| --- |
| `'top' \| 'bottom' \| 'left' \| 'right' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom'` |

### Point

| Type |
| --- |
| `'tl' \| 'tc' \| 'tr' \| 'bl' \| 'bc' \| 'br' \| 'lt' \| 'lc' \| 'lb' \| 'rt' \| 'rc' \| 'rb' \| 'cc' \| 'cl' \| 'cr'` |
