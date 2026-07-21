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
<code src="./demo/orphan.tsx" title="Orphan Value" description="Display and custom styling when the value is not in options"></code>
<code src="./demo/virtual.tsx" title="Virtual Scroll" description="Virtual scrolling for large datasets (thousands of options)"></code>
<code src="./demo/columns.tsx" title="Multi-Column" description="Dropdown panel supports multi-column grid display to save vertical space when there are many options"></code>

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
| orphanClassName | `string` | Extra class name for the displayed value when it is not in `options` (orphan value). An orphan value is shown as the raw value itself by default | - |
| orphanStyle | `React.CSSProperties` | Extra inline style for the displayed value when it is not in `options` (orphan value) | - |
| onChange | `(value: string \| number \| Array<string \| number>, options?: Option \| undefined \| Option[]) => void` | Value change callback | - |
| onFilter | `(value: string, options: Array<Option>) => Array<Option>` | Search callback | - |
| virtual | `boolean` | Enable virtual scrolling. Only the options in the visible window are rendered, so the DOM node count stays constant regardless of the total. Recommended for hundreds or thousands of options | `false` |
| itemHeight | `number` | Fixed height of each option in pixels. Must be a fixed value when `virtual` is enabled | `32` |
| listHeight | `number` | Max height of the dropdown popup in pixels | `200` |
| columns | `number` | Number of columns in the dropdown panel. Enables grid layout when greater than 1 | `1` |
| popupWidth | `number` | Fixed width of the dropdown popup in pixels. When set, the popup does not stretch to match the trigger width. Useful with multi-column layout | - |
| looseMatch | `boolean` | Enable loose value matching. When enabled, value comparison uses `String()` conversion instead of strict equality, resolving number/string type mismatch between `value` and `options`. Note: when enabled, `onChange` returns the option's value type, not the originally passed value type | `false` |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### Option

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| disabled | `boolean` | Whether disabled | - |
| title | `string` | Native title | - |
| label | `string` | Display label | - |
| value | `string \| number` | Value | - |
| [prop: string] | `any` | Other properties | - |