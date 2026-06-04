---
category: Components
title: TableSelect
subtitle: Table Selector
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# TableSelect Table Selector <span class="yee-mobile-badge" />

A component for selecting one or more options from table data, combining features of Table and Select.

## When To Use

- When you have a large number of options that need to be displayed in a table format
- When you need to show more column information (such as age, address, department, etc.)
- When you need to sort, filter, or paginate table data

## Examples

<code src="./demo/basic.tsx" title="Basic" description="Single selection mode table selector"></code>
<code src="./demo/multiple.tsx" title="Multiple Selection" description="Multiple selection mode table selector"></code>
<code src="./demo/searchable.tsx" title="Searchable" description="Table selector with search functionality"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled single and multiple selection"></code>
<code src="./demo/disabled.tsx" title="Disabled and Other Features" description="Disabled, clearable, and custom placement"></code>
<code src="./demo/callbacks.tsx" title="Callbacks and Data Fetching" description="Complete onChange callback and selected data display"></code>

## API

### TableSelectProps

| Property | Type | Description | Default Value |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | `'yee-table-select'` |
| className | `string` | Root element class name | - |
| style | `React.CSSProperties` | Root element inline styles | - |
| rowKey | `string \| ((record: any) => string)` | Unique identifier field name for data | `'id'` |
| columns | `Array<any>` | Table column configuration | - |
| dataSource | `Array<InDataType>` | Data source | - |
| rowSelection | `RowSelectionType` | Row selection configuration | - |
| value | `SelectionKeyType \| SelectionKeyType[]` | Controlled value | - |
| defaultValue | `SelectionKeyType \| SelectionKeyType[]` | Default value | - |
| disabled | `boolean` | Whether disabled | - |
| placement | `'bottomLeft' \| 'topLeft'` | Popup placement | `'bottomLeft'` |
| searchable | `boolean` | Whether searchable | `true` |
| searchOnInput | `boolean` | Whether to search while typing | `true` |
| allowClear | `boolean` | Whether allow clear | `true` |
| closable | `boolean` | Whether tags are closable | `true` |
| placeholder | `string` | Placeholder text | - |
| optionLabelProp | `string \| ((option: InDataType) => string)` | Option label property | `'name'` |
| type | `'radio' \| 'checkbox'` | Selection type | `'radio'` |
| options | `TagType[]` | Preset options | - |
| isShowFilter | `boolean` | Whether to show filter (All/Selected for multiple) | `true` |
| containerId | `string` | Container ID (for popup mounting) | - |
| io | `'out'` | Input direction | - |
| onChange | `(keys, data, checked, changeData) => void` | Selection change callback | - |
| onSearch | `(value: string, e?) => void` | Search callback | - |
| onOpenChange | `(open: boolean) => void` | Popup state change callback | - |

### RowSelectionType

Row selection configuration, inherited from Table component's RowSelectionType.

| Property | Type | Description | Default Value |
| --- | --- | --- | --- |
| type | `'radio' \| 'checkbox'` | Single/multiple selection | - |
| selectedRowKeys | `Array<SelectionKeyType> \| SelectionKeyType` | (Controlled) selected row keys | - |
| defaultSelectedRowKeys | `Array<SelectionKeyType> \| SelectionKeyType` | Default selected row keys | - |
| onChange | `(selectedRowKeys, selectedRows) => void` | Callback when selection changes | - |

## Methods

### InternalTable

InternalTable is an internal component of TableSelect and typically doesn't need to be used directly.

| Property | Type | Description | Default Value |
| --- | --- | --- | --- |
| rowKey | `string` | Unique identifier field name for data | - |
| columns | `Array<any>` | Table column configuration | - |
| dataSource | `Array<InDataType>` | Data source | - |
| rowSelection | `RowSelectionType` | Row selection configuration | - |
| type | `'radio' \| 'checkbox'` | Selection type | - |
| value | `SelectedKeyType \| Array<SelectedKeyType>` | Selected value | - |
| isShowFilter | `boolean` | Whether to show filter | `true` |
| visible | `boolean` | Whether popup is visible | - |

## Notes

- Adapted for mobile (popup constrained with max-width/height and scrollable)
