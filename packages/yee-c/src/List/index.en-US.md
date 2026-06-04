---
category: Components
title: List
subtitle: List
group:
  title: Data Display
  order: 25
toc: 'content'
---

# List <span class="yee-mobile-badge" />

A list component for displaying a collection of items.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of List"></code>
<code src="./demo/bordered.tsx" title="Bordered" description="List with border"></code>
<code src="./demo/renderItem.tsx" title="Custom Render" description="List with custom item rendering"></code>
<code src="./demo/disabled.tsx" title="Disabled Items" description="List with disabled items"></code>

## API

### ListProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom inline style | - |
| items | [ListItemProps\[\]](#listitemprops) | List collection | - |
| bordered | `boolean` | Whether to show border | - |
| focusedKey | `string \| number` | Key of the focused item | - |
| itemRender | `(item: ListItemProps) => React.ReactNode` | Function to render list items | - |
| onClick | `(item: ListItemProps) => void` | Click event for list items | - |

### ListItemProps

ListItemProps extends React.HtmlHTMLAttributes<`HTMLLIElement`>

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| key | `string \| number` | Unique key | - |
| label | `React.ReactNode` | Display content | - |
| value | `unknown` | Value | - |
| disabled | `boolean` | Whether disabled | - |
| className | `string` | Custom class name | - |
| [prop: string] | `any` | Other custom properties | - |