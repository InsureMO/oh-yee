---
category: Components
title: TreeSelect
subtitle: Tree Select
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# TreeSelect <span class="yee-mobile-badge" />

Tree selection control.

## When To Use

`TreeSelect` is similar to `Select`, but the values are provided in a tree like structure. Any data whose entries are defined in a hierarchical manner is fit to use this control. Examples of such case may include a corporate hierarchy, a directory structure, and so on.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="The most basic usage."></code>
<code src="./demo/multiple.tsx" title="Multiple Selection" description="Multiple selection with `mode` prop."></code>
<code src="./demo/checkable.tsx" title="Checkable" description="Show checkbox on each tree node, makes multiple selection easier."></code>
<code src="./demo/searchable.tsx" title="Searchable" description="Search the tree nodes."></code>

## API

### TreeSelectProps

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| prefixCls | `string` | Custom class name prefix | `'yee-tree-select'` |
| className | `string` | Root element class name | - |
| style | `React.CSSProperties` | Root element inline style | - |
| allowClear | `boolean` | Show clear button | `true` |
| defaultOpen | `boolean` | Default expand dropdown | - |
| defaultValue | `string \| number \| Array<string \| number>` | Default selected value | - |
| value | `string \| number \| Array<string \| number>` | Selected value (controlled) | - |
| disabled | `boolean` | Disable the component | - |
| placeholder | `string` | Placeholder text | - |
| placement | `'top' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | Dropdown placement | `'bottomLeft'` |
| searchable | `boolean` | Enable search functionality | `true` |
| mode | `'multiple'` | Selection mode | - |
| checkable | `boolean` | Show checkbox on tree nodes | `false` |
| fieldNames | `{ key?: keyof T; label?: keyof T; children?: keyof T }` | Custom field names for tree data | `{ key: 'key', label: 'label', children: 'children' }` |
| optionLabelProp | `string \| ((option: T) => string)` | Property to use as label | `'label'` |
| dataSource | `T \| T[]` | Tree data | - |
| defaultExpandAll | `boolean` | Expand all tree nodes by default | - |
| defaultExpandedKeys | `string[]` | Default expanded tree nodes | - |
| expandedKeys | `string[]` | Controlled expanded tree nodes | - |
| multiple | `boolean` | Allow multiple selection | `false` |
| showIcon | `boolean` | Show tree node icons | `true` |
| icon | `React.ReactNode \| ((props: TreeProps<T>) => React.ReactNode)` | Custom tree node icon | - |
| onChange | `(value: string \| number \| Array<string \| number>, nodes?: T \| T[]) => void` | Callback when selection changes | - |
| onFilter | `(value: string, dataSource: Array<T>) => Array<T>` | Custom filter function for search | - |

### Tree Props

TreeSelect also supports most props from the Tree component for controlling tree behavior.

## Notes

- Adapted for mobile (popup height adapts to viewport, max-width to prevent overflow)