---
category: Components
title: Pagination
subtitle: 分页
group:
  title: 导航
  order: 2
toc: 'content'
---

# Pagination 分页

采用分页的形式分隔长列表，每次只加载一个页面。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Pagination的基础用法"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的Pagination"></code>
<code src="./demo/simple.tsx" title="简单模式" description="简单的分页"></code>
<code src="./demo/showTotal.tsx" title="显示总数" description="显示数据总量"></code>
<code src="./demo/quickJumper.tsx" title="快速跳转" description="快速跳转到某一页"></code>
<code src="./demo/pageSizeChanger.tsx" title="每页条数选择器" description="改变每页显示条目数"></code>

## API

### PaginationProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<SemanticType, string>>` | 语义化类名 | - |
| styles | `Partial<Record<SemanticType, React.CSSProperties>>` | 语义化样式 | - |
| components | `Partial<Record<SemanticType, React.ReactNode>>` | 语义化结构 | - |
| disabled | `boolean` | 是否禁用 | - |
| current | `number` | （受控）当前页数 | - |
| defaultCurrent | `number` | 默认页数 | `1` |
| pageSize | `number` | 每页条数 | - |
| defaultPageSize | `number` | 默认每页条数 | - |
| total | `number` | 总条数 | - |
| hideOnSinglePage | `boolean` | 只有一页时是否隐藏分页器 | - |
| pageSizeOptions | `Array<number>` | 指定每页可以显示多少条 | `[5, 10, 15, 20, 30, 50]` |
| showQuickJumper | `boolean` | 是否可以快速跳转至某页 | - |
| showSizeChanger | `boolean` | 是否显示pageSize切换器 | - |
| showTotal | `boolean \| ((total: number, current: number) => React.ReactNode)` | 是否显示总页数和当前页数 | - |
| simple | `boolean` | 是否开启简单模式 | - |
| size | `'small' \| 'default'` | 设置尺寸 | `default` |
| onChange | `({ current, pageSize }: { current: number; pageSize: number }) => void` | 页码或pageSize变化回调 | - |
| onPageSizeChange | `({ current, pageSize }: { current: number; pageSize: number }) => void` | pageSize变化回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### PaginationItemsProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| classNames | `Partial<Record<SemanticType, string>>` | 语义化类名 | - |
| styles | `Partial<Record<SemanticType, React.CSSProperties>>` | 语义化样式 | - |
| components | `Partial<Record<SemanticType, React.ReactNode>>` | 语义化结构 | - |
| pageCount | `number` | 总页数 | - |
| current | `number` | 当前页数 | - |
| overPage | `number` | - | - |
| onChange | `(current: number) => void` | 页数变化回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### SemanticType

| 类型 |
| --- |
| `'next' \| 'prev' \| 'jumpPrev' \| 'jumpNext' \| 'item'` |