---
category: Components
title: Anchor
subtitle: Anchor
group:
  title: Navigation
  order: 2
toc: 'content'
---

# Anchor

Anchor component for linking to specific sections within a page.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Anchor"></code>
<code src="./demo/direction.tsx" title="Direction" description="Vertical and horizontal directions"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled mode with activeKey"></code>
<code src="./demo/auto.tsx" title="Auto" description="Generate the anchor list from the DOM"></code>

## API

### AnchorProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root element class name | - |
| style | `React.CSSProperties` | Custom root element style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Semantic class names | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Semantic styles | - |
| items | `Array<AnchorItemType>` | Anchor items configuration | - |
| children | `React.ReactNode` | Children elements | - |
| auto | `boolean` | Whether to auto-generate anchors | `false` |
| name | `string` | Anchor group name (for auto-generation) | - |
| defaultActiveKey | `string` | Default active anchor key | - |
| activeKey | `string` | Active anchor key (controlled) | - |
| affix | `boolean` | Whether to fix position | `true` |
| direction | `'vertical' \| 'horizontal'` | Navigation direction | `'vertical'` |
| offsetTop | `number` | Offset top to trigger anchor change | `0` |
| getContainer | `() => HTMLElement \| Window` | Get scroll container | - |
| onChange | `(key: string) => void` | Callback when anchor changes | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### AnchorItemType

| Property | Type | Description |
| --- | --- | --- |
| key | `string` | Unique key |
| title | `React.ReactNode` | Title |
| status | `'success' \| 'error' \| 'warning'` | Status |

### AnchorItemProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| targetKey | `string` | Target element key | - |
| title | `React.ReactNode` | Title | - |
| status | `'success' \| 'error' \| 'warning'` | Status | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom style | - |
| level | `number` | Level | - |
| children | `React.ReactNode` | Children elements | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### SemanticDOM

| Type |
| --- |
| `'item' \| 'active' \| 'content'` |

## Auto mode

When `auto` is set together with `name`, the component scans the DOM for elements tagged with `data-anchor-group="<name>"` and generates the anchor list automatically. Each target element must be annotated with:

| Attribute | Description |
| --- | --- |
| `data-anchor-group` | Group name, must equal `name` |
| `id` | Used as the anchor key and scroll target (required) |
| `data-anchor-title` | Nav item label (required; a section without it is skipped) |
| `data-anchor-status` | Optional status, `success` / `error` / `warning` |

Notes:

- `auto` and `items` are mutually exclusive; when both are provided, the `auto` scan result wins and `items` is ignored.
- The DOM is scanned once on mount. If the target sections are rendered asynchronously, make sure they exist in the DOM at mount time, otherwise they will not be picked up.

## Notes

- Not yet adapted for mobile. Affix mode relies on hover interaction, which is not supported on touch devices