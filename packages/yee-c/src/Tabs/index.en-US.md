---
category: Components
title: Tabs
subtitle: Tabs
group:
  title: Data Display
  order: 42
toc: 'content'
---

# Tabs

Tabs make it easy to switch between different views.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Tabs"></code>
<code src="./demo/position.tsx" title="Position" description="Position of tabs"></code>
<code src="./demo/type.tsx" title="Type" description="Different types of tabs"></code>
<code src="./demo/editable.tsx" title="Editable" description="Add and remove tabs"></code>
<code src="./demo/extra.tsx" title="Extra Content" description="Extra content in tabs"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled tabs"></code>

## API

### TabsProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Custom structure class names | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Custom structure styles | - |
| type | `'card' \| 'editable-card'` | Tab style | - |
| activeKey | `string \| number` | Current active tab key | - |
| defaultActiveKey | `string \| number` | Default active tab key | - |
| items | `Array<TabItemType>` | Tab items | - |
| position | `'top' \| 'bottom' \| 'left' \| 'right'` | Tab position | `top` |
| headerExtra | `{ prefix?: React.ReactNode \| (() => React.ReactNode); suffix?: React.ReactNode \| (() => React.ReactNode) }` | Extra content in tab bar | - |
| children | `Array<React.ReactElement>` | Children elements | - |
| lazy | `boolean` | Lazy load content | - |
| fixedHeader | `boolean` | Whether to fix header area | `false` |
| onEdit | `(type: 'add' \| 'remove', key?: number \| string) => void` | Edit callback | - |
| onChange | `(key: string \| number) => void` | Change callback | - |
| onTabClick | `(key: string \| number) => void \| boolean` | Tab click callback | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### TabItemType

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| key | `string \| number` | Unique key | - |
| label | `React.ReactNode` | Tab label | - |
| icon | `React.ReactNode` | Tab icon | - |
| disabled | `boolean` | Disabled state | - |
| closable | `boolean` | Whether closable (effective when type="editable-card") | `true` |
| badge | `number` | Badge number | - |
| items | `Array<TabItemType>` | Sub tabs | - |
| children | `React.ReactNode` | Tab content | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |