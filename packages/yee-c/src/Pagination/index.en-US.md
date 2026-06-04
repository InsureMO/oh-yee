---
category: Components
title: Pagination
subtitle: Pagination
group:
  title: Navigation
  order: 2
toc: 'content'
---

# Pagination

A long list can be divided into several pages using Pagination.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Pagination"></code>
<code src="./demo/size.tsx" title="Size" description="Different sizes of Pagination"></code>
<code src="./demo/simple.tsx" title="Simple Mode" description="Simple mode of Pagination"></code>
<code src="./demo/showTotal.tsx" title="Show Total" description="Show total number of data"></code>
<code src="./demo/quickJumper.tsx" title="Quick Jumper" description="Quick jump to a page"></code>
<code src="./demo/pageSizeChanger.tsx" title="Page Size Changer" description="Change page size"></code>

## API

### PaginationProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<SemanticType, string>>` | Semantic class names | - |
| styles | `Partial<Record<SemanticType, React.CSSProperties>>` | Semantic styles | - |
| components | `Partial<Record<SemanticType, React.ReactNode>>` | Semantic structure | - |
| disabled | `boolean` | Whether disabled | - |
| current | `number` | (Controlled) current page number | - |
| defaultCurrent | `number` | Default page number | `1` |
| pageSize | `number` | Number of data items per page | - |
| defaultPageSize | `number` | Default number of data items per page | - |
| total | `number` | Total number of data items | - |
| hideOnSinglePage | `boolean` | Whether to hide pagination when there is only one page | - |
| pageSizeOptions | `Array<number>` | Specify the sizeChanger options | `[5, 10, 15, 20, 30, 50]` |
| showQuickJumper | `boolean` | Whether to show quick jump input | - |
| showSizeChanger | `boolean` | Whether to show page size changer | - |
| showTotal | `boolean \| ((total: number, current: number) => React.ReactNode)` | Whether to show total number and current page | - |
| simple | `boolean` | Whether to use simple mode | - |
| size | `'small' \| 'default'` | Set size | `default` |
| onChange | `({ current, pageSize }: { current: number; pageSize: number }) => void` | Page number or pageSize change callback | - |
| onPageSizeChange | `({ current, pageSize }: { current: number; pageSize: number }) => void` | Page size change callback | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### PaginationItemsProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| classNames | `Partial<Record<SemanticType, string>>` | Semantic class names | - |
| styles | `Partial<Record<SemanticType, React.CSSProperties>>` | Semantic styles | - |
| components | `Partial<Record<SemanticType, React.ReactNode>>` | Semantic structure | - |
| pageCount | `number` | Total pages | - |
| current | `number` | Current page number | - |
| overPage | `number` | - | - |
| onChange | `(current: number) => void` | Page change callback | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### SemanticType

| Type |
| --- |
| `'next' \| 'prev' \| 'jumpPrev' \| 'jumpNext' \| 'item'` |