---
category: Components
title: Select
subtitle: Select
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# Select

Select component for choosing from a set of options.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Select"></code>
<code src="./demo/size.tsx" title="Size" description="Different sizes of Select"></code>
<code src="./demo/disabled.tsx" title="Disabled" description="Disabled Select"></code>
<code src="./demo/allowClear.tsx" title="Allow Clear" description="Allow clear selected value"></code>
<code src="./demo/multiple.tsx" title="Multiple" description="Multiple selection mode"></code>
<code src="./demo/search.tsx" title="Search" description="Searchable Select"></code>
<code src="./demo/tags.tsx" title="Tags" description="Tags mode Select"></code>
<code src="./demo/virtual.tsx" title="Virtual Scroll" description="Virtual scrolling for large datasets (thousands of options)"></code>

## API

### SelectProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Root element class name | - |
| style | `React.CSSProperties` | Root element inline style | - |
| allowClear | `boolean` | Whether to show clear button | - |
| defaultOpen | `boolean` | Whether dropdown menu is open by default | - |
| defaultValue | `string \| number \| Array<string \| number>` | Default value | - |
| value | `string \| number \| Array<string \| number>` | Controlled value | - |
| disabled | `boolean` | Whether disabled | - |
| placeholder | `string` | Placeholder text | - |
| placement | `'top' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | Dropdown position | - |
| searchable | `boolean` | Whether searchable | - |
| options | `Array<Option>` | Dropdown options | - |
| mode | `'multiple' \| 'tags'` | Selection mode | - |
| codeTableName | `string` | Code table name | - |
| optionFilterProp | `string` | Property to filter by when searching | `label` |
| optionLabelProp | `string \| (() => string)` | Property to display in the input box | - |
| onChange | `(value: string \| number \| Array<string \| number>, options?: Option \| undefined \| Option[]) => void` | Value change callback | - |
| onFilter | `(value: string, options: Array<Option>) => Array<Option>` | Search callback | - |
| virtual | `boolean` | Enable virtual scrolling. Only the options in the visible window are rendered, so the DOM node count stays constant regardless of the total. Recommended for hundreds or thousands of options | `false` |
| itemHeight | `number` | Fixed height of each option in pixels. Must be a fixed value when `virtual` is enabled | `32` |
| listHeight | `number` | Max height of the dropdown popup in pixels | `200` |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### Option

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| disabled | `boolean` | Whether disabled | - |
| title | `string` | Native title | - |
| label | `string` | Display label | - |
| value | `string \| number` | Value | - |
| [prop: string] | `any` | Other properties | - |