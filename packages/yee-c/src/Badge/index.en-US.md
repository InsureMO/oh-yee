---
category: Components
title: Badge
subtitle: Badge
group:
  title: Data Display
  order: 3
toc: 'content'
---

# Badge <span class="yee-mobile-badge" />

Badges are used to display small amounts of information such as unread counts or status indicators.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Badge"></code>
<code src="./demo/status.tsx" title="Status" description="Different status of Badge"></code>
<code src="./demo/dot.tsx" title="Red Dot" description="Show red dot badge"></code>
<code src="./demo/size-color.tsx" title="Size & Color" description="Different sizes and custom colors"></code>
<code src="./demo/ribbon.tsx" title="Ribbon" description="Ribbon badge for special emphasis"></code>

## API

### BadgeProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<BadgeSemanticDOM, string>>` | Semantic class names | - |
| styles | `Partial<Record<BadgeSemanticDOM, React.CSSProperties>>` | Semantic styles | - |
| children | `React.ReactNode` | Child elements | - |
| count | `number \| React.ReactNode` | Number or custom content to display | - |
| showZero | `boolean` | Whether to show badge when count is zero | `false` |
| active | `boolean` | Whether to show breathing effect | `false` |
| dot | `boolean` | Show red dot | `false` |
| size | `'default' \| 'small' \| 'large'` | Badge size | `'default'` |
| status | `'success' \| 'info' \| 'warning' \| 'error' \| 'processing'` | Status type | - |
| color | `string` | Custom color | - |
| offset | `[number, number]` | Custom badge offset | - |
| overflowCount | `number` | Max count to show | `99` |
| text | `string` | Status point text (used with status) | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### RibbonProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom style | - |
| text | `React.ReactNode` | Description text | - |
| placement | `'start' \| 'end'` | Ribbon placement | `'end'` |
| color | `string` | Custom color | - |
| children | `React.ReactNode` | Child elements | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |