---
category: Components
title: Transfer
subtitle: Transfer
group:
  title: Data Entry
  order: 4
toc: 'content'
---

# Transfer

A dual-column transfer selection component, commonly used to move multiple items from a left list to a right list.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Transfer"></code>
<code src="./demo/oneWay.tsx" title="One Way" description="One-way transfer mode, only move from left to right"></code>
<code src="./demo/disabled.tsx" title="Disabled Items" description="Disable specific items"></code>
<code src="./demo/search.tsx" title="Searchable" description="Transfer with search functionality"></code>
<code src="./demo/pagination.tsx" title="Pagination" description="Transfer with pagination"></code>
<code src="./demo/draggable.tsx" title="Draggable" description="Transfer with drag and drop sorting"></code>
<code src="./demo/customFields.tsx" title="Custom Fields" description="Custom field names"></code>

## API

### TransferProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Class name prefix | - |
| className | `string` | Class name | - |
| style | `React.CSSProperties` | Style | - |
| dataSource | `DataSource[]` | Data source, each item must contain `key` and `label` fields (customizable via `rowKey` and `rowLabel`) | `[]` |
| titles | `[string, string]` | Title collection, order from left to right | `['UnSelected', 'Selected']` |
| targetKeys | `Array<string \| number>` | Key collection of items displayed in the right column | - |
| defaultTargetKeys | `Array<string \| number>` | Default key collection of items displayed in the right column | - |
| selectedKeys | `Array<string \| number>` | Set which items should be selected | - |
| defaultSelectedKeys | `Array<string \| number>` | Default selected item key collection | - |
| searchable | `boolean` | Whether to show search box | `true` |
| disabled | `boolean` | Whether disabled | - |
| oneWay | `boolean` | Whether in one-way mode, items can only be moved from left to right | - |
| operations | `[React.ReactNode, React.ReactNode]` | Operation button collection, order from top to bottom | - |
| pagination | `PaginationProps` | Pagination configuration, refer to Pagination component | - |
| searchIconPosition | `'left' \| 'right'` | Position of search icon | `'left'` |
| draggable | `boolean` | Whether to support drag and drop sorting | - |
| rowKey | `string \| ((option: DataSource) => string)` | Field name for unique key, defaults to 'key' | `'key'` |
| rowLabel | `string \| ((option: DataSource) => string)` | Field name for display text, defaults to 'label' | `'label'` |
| onChange | `(targetKeys, direction, moveKeys) => void` | Callback when items are transferred between columns | - |
| onSelectChange | `(sourceSelectedKeys, targetSelectedKeys) => void` | Callback when selected items change | - |
| onDrop | `(dropObj, dataSource) => void` | Callback when drag and drop is completed | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### DataSource

```typescript
interface DataSource {
  key: string | number;
  label: string;
  title?: string;
  disabled?: boolean;
  [key: string]: any;
}
```

## Notes

- Each item in `dataSource` must contain a unique identifier field (default is `key`)
- When `oneWay` is set, items in the right column cannot be moved back to the left
- The `draggable` property only works in one-way mode
- Not recommended for mobile. Consider using Checkbox List or Picker instead
