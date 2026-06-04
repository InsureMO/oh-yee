---
category: Components
title: Menu
subtitle: Menu
group:
  title: Navigation
  order: 26
toc: 'content'
---

# Menu

A versatile menu for navigation.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Menu"></code>
<code src="./demo/mode.tsx" title="Mode" description="Different menu modes"></code>
<code src="./demo/icon.tsx" title="Icon" description="Menu with icons"></code>
<code src="./demo/group.tsx" title="Group & Divider" description="Menu with groups and dividers"></code>
<code src="./demo/collapsed.tsx" title="Collapsed" description="Collapsible to icon-only in inline mode"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled menu"></code>
<code src="./demo/multiple.tsx" title="Multiple" description="Menu with multiple selection"></code>
<code src="./demo/footer.tsx" title="Footer" description="Custom menu footer content"></code>

## API

### MenuProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root node class name | - |
| style | `React.CSSProperties` | Custom root node style | - |
| classNames | `Partial<Record<SemanticType, string>>` | Semantic structure class names | - |
| styles | `Partial<Record<SemanticType, React.CSSProperties>>` | Semantic structure styles | - |
| defaultOpenKeys | `Array<string>` | Default opened menu item key array | - |
| defaultSelectedKeys | `Array<string>` | Initial selected menu item key array | - |
| openKeys | `Array<string>` | Controlled opened menu item key array | - |
| selectedKeys | `Array<string>` | Controlled selected menu item key array | - |
| mode | `'vertical' \| 'inline' \| 'horizontal'` | Menu type, supports vertical, inline and horizontal | - |
| items | [MenuItemCommonType\[\]](#menuitemtype) | Menu items | - |
| multiple | `boolean` | Whether to allow multiple selection | `false` |
| keyboard | `boolean` | Whether to enable keyboard control | - |
| expandedOnHover | `boolean` | Expand submenu on mouse hover | `true` |
| inlineCollapsed | `boolean` | Whether to collapse to icon-only in inline mode | `false` |
| onOpenChange | `(openKeys: Array<string>) => void` | Called when subMenu expands or collapses | - |
| onSelect | `(params: { item: MenuItemType; key: string; keyPath: Array<string>; selectedKeys: Array<string>; event: KeyboardEvent \| MouseEvent }) => void` | Called when selected | - |
| onClick | `(params: { item: MenuItemType; key: string; keyPath: Array<string> }) => void` | Called when menuItem is selected | - |
| onDeselect | `(params: { item: MenuItemType; key: string; keyPath: Array<string>; selectedKeys: Array<string>; event: KeyboardEvent \| MouseEvent }) => void` | Called when deselected (multiple mode) | - |
| openOnly | `boolean` | Only expand one submenu at the same level | - |
| footer | `React.ReactNode` | Menu footer area | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### MenuItemType

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| type | `'item'` | Menu item type | `'item'` |
| disabled | `boolean` | Whether disabled | - |
| icon | `React.ReactNode` | Menu icon | - |
| key | `string` | Unique identifier | - |
| label | `React.ReactNode` | Menu item title | - |
| title | `string` | Hover title | - |
| children | [MenuItemType\[\]](#menuitemtype) | Submenu | - |

### MenuItemGroupType

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| type | `'group'` | Group type | - |
| label | `React.ReactNode` | Group title | - |
| children | [MenuItemType\[\]](#menuitemtype) | Menu items within the group | - |

### MenuDividerType

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| type | `'divider'` | Divider type | - |
| key | `string` | Unique identifier | - |
