---
category: Components
title: Grid
subtitle: Grid
group:
  title: Layout
  order: 20
toc: 'content'
---

# Grid <span class="yee-mobile-badge" />

2D grid layout container.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Grid"></code>
<code src="./demo/cols.tsx" title="Columns" description="Adjust column count"></code>
<code src="./demo/colspan.tsx" title="Column Span" description="Items spanning multiple columns"></code>

## API

### GridProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| id | `string` | id | - |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| children | `React.ReactNode[]` | Child elements | - |
| cols | `number \| ResponsiveCols` | Number of columns, supports number or responsive config `{ mobile?: number; desktop?: number }` | `4` |
| rows | `number` | Number of rows | - |
| gap | `number` | Grid gap | `16` |
| colGap | `number` | Column gap | - |
| rowGap | `number` | Row gap | - |

### GridItemProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| colspan | `number` | Number of columns to span | - |
| rowspan | `RowSpan` i.e. `{ start: number; end: number }` | Number of rows to span | - |
| children | `React.ReactNode` | Child elements | - |
| spanStyle | `{ gridColumnStart?: number; gridColumnEnd?: number; gridRowStart?: number; gridRowEnd?: number }` | Span style | - |

## Notes

- Adapted for mobile (`cols` supports responsive config `{ mobile?: number; desktop?: number }`, automatically switches columns based on screen width)