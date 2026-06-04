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

## Notes

- Not yet adapted for mobile. Affix mode relies on hover interaction, which is not supported on touch devices