---
category: Components
title: Table
subtitle: Table
group:
  title: Data Display
  order: 41
toc: 'content'
---

# Table

A table displays rows of data.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Table"></code>
<code src="./demo/bordered.tsx" title="Bordered" description="Table with borders"></code>
<code src="./demo/stripe.tsx" title="Striped" description="Striped rows"></code>
<code src="./demo/size.tsx" title="Size" description="Different sizes of Table"></code>
<code src="./demo/selection.tsx" title="Selection" description="Selectable rows"></code>
<code src="./demo/expand.tsx" title="Expandable" description="Expandable rows"></code>
<code src="./demo/pagination.tsx" title="Pagination" description="Table with pagination"></code>
<code src="./demo/column-filter.tsx" title="column filter" description="Table column filter"></code>
<code src="./demo/grouping.tsx" title="Grouping" description="Multi-level header"></code>
<code src="./demo/components-override.tsx" title="components override" description="tbody / row rendering that can be taken over by external libs (e.g. dnd-kit)"></code>
## API

### TableProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<SemanticType, string>>` | Semantic class names | - |
| styles | `Partial<Record<SemanticType, React.CSSProperties>>` | Semantic styles | - |
| components | [`TableComponents`](#tablecomponents) | Custom table elements, can be taken over by external libs (e.g. dnd-kit) | - |
| bordered | `boolean` | Show border | - |
| columns | `ColumnProps[]` | Table column configuration | - |
| children | `Array<React.ReactElement<ColumnProps>> | React.ReactElement<ColumnProps>` | Children elements | - |
| locale | `Record<string, string>` | Locale messages | - |
| noData | `React.ReactNode` | Content displayed when no data is available | - |
| dataSource | `Array<Record<string, any>>` | Data source | - |
| footer | `React.ReactNode \| (() => React.ReactNode)` | Table footer | - |
| loading | `boolean` | Loading state | - |
| stripe | `boolean` | Striped rows | - |
| getPopupContainer | `() => HTMLElement` | Popup container | - |
| rowClassName | `(record: object) => string` | Row class name | - |
| pagination | `Partial<PaginationType> \| boolean` | Pagination configuration | - |
| rowSelection | `RowSelectionType` | Row selection configuration | - |
| expandable | `ExpandableType` | Expandable configuration | - |
| scroll | `{ y?: number; x?: number }` | Scroll configuration | - |
| showHeader | `boolean` | Show header | `true` |
| showSorterTooltip | `boolean` | Show sorter tooltip | - |
| size | `'small' \| 'default' \| 'large'` | Table size | - |
| rowKey | `string \| ((record: Record<string, any>) => string)` | Row key | `id` |
| summary | `(pageData: Array<Record<string, any>>) => React.ReactNode` | Summary row | - |
| tableLayout | `'auto' \| 'fixed'` | Table layout | - |
| virtual | `boolean` | Virtual list | - |
| onChange | `({ pagination, filters, sorter, currentDataSource, action }) => void` | Change callback | - |
| onRow | `(record: Record<string, any>, index: number) => Record<string, any>` | Custom row props | - |
| onHeaderRow | `() => Record<string, any>` | Custom header row props | - |

### ColumnProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom style | - |
| classNames | `Partial<Record<ColumnSemanticType, string>>` | Column semantic class names | - |
| styles | `Partial<Record<ColumnSemanticType, React.CSSProperties>>` | Column semantic styles | - |
| align | `'left' \| 'right' \| 'center'` | Alignment | - |
| fixed | `'left' \| 'right' \| true` | Fixed column | - |
| filter | `object` | Filter configuration | - |
| sorter | `boolean \| object` | Sorter configuration | - |
| dataIndex | `string` | Data index | - |
| key | `string \| number` | Unique key | - |
| width | `number \| string` | Column width | - |
| title | `React.ReactNode` | Column title | - |
| helper | `string \| React.ReactNode` | Help icon for column header | - |
| children | `ColumnProps[]` | Sub-columns for header grouping (multi-level header); use `render` for custom cell content | - |
| onCell | `(record: object, rowIndex: number) => object` | Cell props | - |
| onHeaderCell | `(column: ColumnProps) => object` | Header cell props | - |
| render | `(record: object, rowIndex: number) => React.ReactNode` | Custom render | - |

### RowSelectionType

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| type | `'checkbox' \| 'radio'` | Selection type | - |
| width | `number \| string` | Column width | - |
| selectAll | `React.ReactNode \| boolean` | Select all node | `true` |
| selectedRowKeys | `Array<SelectionKeyType> \| SelectionKeyType` | Selected row keys | - |
| defaultSelectedRowKeys | `string[] \| number[]` | Default selected row keys | - |
| index | `number` | Column index | `1` |
| disabled | `boolean \| Array<boolean> \| ((record: Record<string, unknown>, index: number) => boolean)` | Whether disabled | - |
| onCell | `(record: Record<string, unknown>, rowIndex: number) => Record<string, unknown>` | Cell props | - |
| renderCell | `(record: Record<string, any>, rowIndex: number) => React.ReactNode` | Custom cell render | - |
| onChange | `(selectedRowKeys, selectedRows) => void` | Selection change callback | - |
| onSelectAll | `(selected, selectedRowKeys, selectedRows) => void` | Select all callback | - |
| selections | `Array<any>` | Selections | - |

### ExpandableType

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| index | `number` | Column index | `1` |
| icon | `(expanded: boolean) => React.ReactNode` | Custom icon | - |
| width | `number \| string` | Column width | - |
| defaultExpandAllRows | `boolean` | Default expand all rows | - |
| defaultExpandedRowKeys | `string[]` | Default expanded row keys | - |
| expandedRowKeys | `Array<number \| string>` | Expanded row keys | - |
| visible | `boolean` | Visibility | `true` |
| rowExpandable | `(record: object) => boolean` | Whether row is expandable | - |
| onExpand | `(expanded: boolean, record: Record<string, any>) => void` | Expand callback | - |
| onExpandedRowsChange | `(expandedKeys?: Array<number \| string>) => void` | Expanded rows change callback | - |
| expandedRowRender | `(record, index, page) => React.ReactNode` | Expanded row render | - |

### TableComponents

Seams exposed by Table so an external lib (e.g. dnd-kit) can take over rendering. **Table itself has no dependency on any drag library** — it only provides replacement points; drag logic is owned by the consumer.

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| body | `TableBodyComponents` | Replaceable body elements | - |

#### TableBodyComponents

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| tbody | `React.ElementType` | Replace `<tbody>`; commonly used to wrap a `SortableContext` provider | - |
| row | `React.ComponentType<TableRowRendererProps>` | Full-row takeover: consumer renders the whole `<tr>` + cells (can place a drag handle, etc.) | - |

> Under full-row takeover, the consumer-rendered row **does not** get Table's auto selection / expand / colSpan / stripe row-level features. Table's pagination / sorting / filtering still apply (they mutate `dataSource`).

#### TableRowRendererProps (received by components.body.row)

| Property | Type | Description |
| --- | --- | --- |
| record | `Record<string, any>` | Current row data |
| index | `number` | Current row index |
| columns | `WrapedColumnProps[]` | Table-resolved columns |
| rowKey | `string \| number` | Current row key value; usable as sortable id |