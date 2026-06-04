---
category: Components
title: Selector
subtitle: Selector
group:
  title: Data Entry
  order: 12
toc: 'content'
demo:
  cols: 2
---

# Selector

A selector input component for displaying selected values with tags. Used internally by Select, TreeSelect, and other picker components.

## Code Demo

<code src="./demo/basic.tsx" title="Single Selection" description="Basic single-value selector"></code>
<code src="./demo/multiple.tsx" title="Multiple Selection" description="Selector in multiple mode with tags"></code>

## API

### SelectorProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | `'yee-selector'` |
| searchable | `boolean` | Whether the selector is searchable | `true` |
| disabled | `boolean` | Whether the selector is disabled | - |
| allowClear | `boolean` | Whether to show a clear button | `true` |
| placeholder | `string` | Placeholder text | - |
| closable | `boolean \| ((option: TagType) => boolean)` | Whether tags can be removed | `true` |
| searchOnInput | `boolean` | Whether to search while typing | - |
| maxCount | `number` | Max selectable items in multiple/tags mode | - |
| mode | `'multiple' \| 'tags'` | Selection mode | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom inline style | - |
| options | `Array<TagType>` | Selected option tags to display | `[]` |
| selectedKeys | `Array<string \| number>` | Keys of selected items | `[]` |
| suffix | `React.ReactNode \| (() => React.ReactNode)` | Custom suffix icon | - |
| open | `boolean` | Whether the dropdown is open | - |
| loading | `boolean` | Whether loading | - |
| optionLabelProp | `string \| ((option: TagType) => string)` | Custom display text for options | `'label'` |
| value | `string` | Controlled search input value | - |
| onOpenChange | `(open: boolean) => void` | Callback when open state changes | - |
| onSearch | `(value: string, e?: any) => void` | Callback when search value changes | - |
| onClear | `() => void` | Callback when cleared | - |
| onRemove | `(option: TagType) => void` | Callback when a tag is removed | - |
| onClick | `(e: React.MouseEvent<HTMLDivElement>) => void` | Click callback | - |

### TagType

| Property | Type | Description |
| --- | --- | --- |
| label | `React.ReactNode` | Display text |
| value | `string \| number` | Option value |
