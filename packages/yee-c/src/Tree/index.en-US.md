---
category: Components
title: Tree
subtitle: Tree
group:
  title: Data Display
  order: 47
toc: 'content'
---

# Tree

Tree is a hierarchical data display component.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Tree"></code>
<code src="./demo/selectable.tsx" title="Selectable" description="Selectable tree"></code>
<code src="./demo/checkable.tsx" title="Checkable" description="Checkable tree"></code>
<code src="./demo/icon.tsx" title="Icon" description="Tree with custom icons"></code>
<code src="./demo/line.tsx" title="Line" description="Tree with connecting lines"></code>
<code src="./demo/expanded.tsx" title="Expanded" description="Controlled expanded tree"></code>

## API

### TreeProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| checkable | `boolean` | Add Checkbox before nodes | - |
| defaultExpandAll | `boolean` | Expand all tree nodes by default | - |
| defaultExpandedKeys | `string[]` | Default expanded tree nodes | - |
| expandedKeys | `string[]` | Controlled expanded tree nodes | - |
| disabled | `boolean` | Disabled | - |
| draggable | `boolean` | Whether allow drag | - |
| showLine | `boolean` | Show connecting lines | - |
| showIcon | `boolean` | Show node icons | `true` |
| icon | `React.ReactNode \| ((props: TreeProps<T>) => React.ReactNode)` | Icon before title (requires showIcon) | - |
| switcherIcon | `[React.ReactNode, React.ReactNode]` | Expand/collapse switcher icons | - |
| multiple | `boolean` | Whether tree node supports multiple selection | `false` |
| fieldNames | `{ key?: keyof T; label?: keyof T; children?: keyof T }` | Custom key, label, children fields | - |
| loadData | `() => void` | Async load data | - |
| dataSource | `Array<T> \| T` | Data source | - |
| checkedKeys | `Array<string \| number>` | Checked tree nodes (controlled) | - |
| defaultCheckedKeys | `Array<string \| number>` | Default checked tree nodes | - |
| selectedKeys | `Array<string \| number>` | Selected tree nodes (requires multiple for multi-select) | - |
| defaultSelectedKeys | `Array<string \| number>` | Default selected tree nodes | - |
| onCheck | `(checkedKeys: Array<string \| number>, params: { checked: boolean; checkedNodes: T[]; node: T }) => void` | Callback when checkbox is checked | - |
| onSelect | `(selectedKeys: Array<string \| number>, params: { selected: boolean; selectedNodes: T[]; node: T }) => void` | Callback when tree node is clicked | - |
| onExpand | `(expandedKeys: Array<string \| number>, params: { expanded: boolean; expandedNodes: T[]; node: T[] }) => void` | Callback when expand/collapse | - |