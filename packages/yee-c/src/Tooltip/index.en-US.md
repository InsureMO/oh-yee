---
category: Components
title: Tooltip
subtitle: Tooltip
group:
  title: Data Display
  order: 46
toc: 'content'
---

# Tooltip <span class="yee-mobile-badge" />

A simple text popup tip.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Tooltip"></code>
<code src="./demo/placement.tsx" title="Placement" description="Different placement of Tooltip"></code>
<code src="./demo/trigger.tsx" title="Trigger" description="Different trigger modes"></code>
<code src="./demo/custom.tsx" title="Custom Content" description="Custom tooltip content"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled tooltip"></code>

## API

### TooltipProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| title | `React.ReactNode \| (() => React.ReactNode)` | Tooltip content | - |
| mouseEnterDelay | `number` | Mouse enter delay time (seconds) | `0.1` |
| color | `string` | Custom tooltip background color (applies to both the bubble and the arrow) | - |

Other properties are inherited from [Trigger](/components/trigger), including:

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| popupClassName | `string` | Popup class name | - |
| popupStyle | `React.CSSProperties` | Popup style | - |
| popupAlign | `{ points?: [Point, Point]; offset?: [number, number] }` | Popup alignment | - |
| children | `React.ReactNode` | Trigger element | - |
| trigger | `Array<'hover' \| 'click' \| 'focus'> \| 'hover' \| 'click' \| 'focus'` | Trigger actions | - |
| open | `boolean` | Control popup visibility | - |
| defaultOpen | `boolean` | Default popup visibility | - |
| placement | `Placement` | Popup placement relative to trigger | `top` |
| destroyPopupOnHide | `boolean` | Destroy popup on hide | - |
| zIndex | `number` | Popup z-index | - |
| mouseLeaveDelay | `number` | Mouse leave delay time (seconds) | `0.1` |
| hideOnClick | `boolean` | Hide popup on click | `true` |
| getPopupContainer | `() => HTMLElement` | Custom popup container | - |
| onOpenChange | `(visible: boolean) => void` | Popup visibility change callback | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### Placement

```typescript
type Placement = 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
```

## Notes

- Adapted for mobile (max-width constrained to prevent viewport overflow)
```