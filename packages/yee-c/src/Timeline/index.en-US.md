---
category: Components
title: Timeline
subtitle: Timeline
group:
  title: Data Display
  order: 45
toc: 'content'
---

# Timeline <span class="yee-mobile-badge" />

Vertical display timeline.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Timeline"></code>
<code src="./demo/mode.tsx" title="Mode" description="Different modes of Timeline"></code>
<code src="./demo/status.tsx" title="Status" description="Timeline with different status"></code>
<code src="./demo/custom.tsx" title="Custom" description="Timeline with custom dot"></code>
<code src="./demo/reverse.tsx" title="Reverse" description="Reverse order Timeline"></code>
<code src="./demo/pending.tsx" title="Pending" description="Timeline with pending item"></code>

## API

### TimelineProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| mode | `'left' \| 'alternate' \| 'right'` | Position mode | `left` |
| children | `React.ReactElement[]` | Children elements | - |
| items | `Array<TimelineItemProps>` | Timeline items | - |
| reverse | `boolean` | Reverse order | - |
| pending | `boolean` | Last item is pending | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### TimelineItemProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| index | `number` | Index number | - |
| children | `React.ReactNode` | Content | - |
| dot | `React.ReactNode` | Custom dot | - |
| label | `React.ReactNode` | Label content | - |
| status | `TimelineItemStatus` | Status | - |
| color | `string` | Dot color | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### TimelineItemStatus

```typescript
type TimelineItemStatus = 'success' | 'info' | 'error' | 'warning' | 'disabled';
```

## Notes

- Adapted for mobile (alternate/left/right modes fall back to single-column left-aligned)