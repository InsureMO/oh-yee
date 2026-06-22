---
category: Components
title: Table
subtitle: 表格
group:
  title: 数据展示
  order: 41
toc: 'content'
---

# Table 表格

展示行列数据。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Table的基础用法"></code>
<code src="./demo/bordered.tsx" title="边框" description="带边框的表格"></code>
<code src="./demo/stripe.tsx" title="斑马纹" description="带斑马纹的表格"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的表格"></code>
<code src="./demo/sorter.tsx" title="排序" description="设置排序功能"></code>
<code src="./demo/selection.tsx" title="可选择" description="可选择行的表格"></code>
<code src="./demo/expand.tsx" title="可展开" description="可展开行的表格"></code>
<code src="./demo/pagination.tsx" title="分页" description="带分页的表格"></code>
<code src="./demo/merge-cell.tsx" title="合并单元格" description="合并单元格的表格"></code>
<code src="./demo/summary.tsx" title="统计" description="表格的统计行"></code>
<code src="./demo/filter.tsx" title="筛选" description="表格的筛选功能"></code>
<code src="./demo/column-filter.tsx" title="列筛选" description="表格的列筛选功能"></code>

## API

### TableProps

| 属性名            | 类型                                                                        | 描述                                 | 默认值 |
| ----------------- | --------------------------------------------------------------------------- | ------------------------------------ | ------ |
| prefixCls         | `string`                                                                    | 自定义类名前缀                       | -      |
| className         | `string`                                                                    | 自定义根类名                         | -      |
| style             | `React.CSSProperties`                                                       | 自定义根样式                         | -      |
| classNames        | `Partial<Record<SemanticType, string>>`                                     | 语义化类名                           | -      |
| styles            | `Partial<Record<SemanticType, React.CSSProperties>>`                        | 语义化样式                           | -      |
| components        | `Partial<Record<SemanticType, React.ReactNode>>`                            | 自定义表格元素                       | -      |
| bordered          | `boolean`                                                                   | 是否展示外边框和列边框               | -      |
| columns           | `ColumnProps[]`                                                             | 表格列的配置信息                     | -      |
| children          | `Array<React.ReactElement<ColumnProps>> \| React.ReactElement<ColumnProps>` | 子元素                               | -      |
| locale            | `Record<string, string>`                                                    | 提示信息                             | -      |
| noData            | `React.ReactNode`                                                           | 无数据时展示的内容                   | -      |
| dataSource        | `Array<Record<string, any>>`                                                | 数据                                 | -      |
| footer            | `React.ReactNode \| (() => React.ReactNode)`                                | 表格底部                             | -      |
| loading           | `boolean`                                                                   | 加载状态                             | -      |
| stripe            | `boolean`                                                                   | 斑马条纹                             | -      |
| getPopupContainer | `() => HTMLElement`                                                         | 设置表格内的弹出组件的渲染节点       | -      |
| rowClassName      | `(record: object) => string`                                                | 每行类名                             | -      |
| pagination        | `Partial<PaginationType> \| boolean`                                        | 分页器配置                           | -      |
| rowSelection      | `RowSelectionType`                                                          | 表格行是否可选中                     | -      |
| expandable        | `ExpandableType`                                                            | 是否可展开                           | -      |
| scroll            | `{ y?: number; x?: number }`                                                | 表格是否可滚动                       | -      |
| showHeader        | `boolean`                                                                   | 是否显示表头                         | `true` |
| showSorterTooltip | `boolean`                                                                   | 配置排序时的提示                     | -      |
| size              | `'small' \| 'default' \| 'large'`                                           | 表格尺寸                             | -      |
| rowKey            | `string \| ((record: Record<string, any>) => string)`                       | 设置行的唯一键                       | `id`   |
| summary           | `(pageData: Array<Record<string, any>>) => React.ReactNode`                 | 总结栏                               | -      |
| tableLayout       | `'auto' \| 'fixed'`                                                         | 设置Table布局                        | -      |
| virtual           | `boolean`                                                                   | 是否开启虚拟列表                     | -      |
| onChange          | `({ pagination, filters, sorter, currentDataSource, action }) => void`      | 分页，排序，筛选发生变化时的回调函数 | -      |
| onRow             | `(record: Record<string, any>, index: number) => Record<string, any>`       | 自定义行属性                         | -      |
| onHeaderRow       | `() => Record<string, any>`                                                 | 自定义表头行属性                     | -      |

### ColumnProps

| 属性名       | 类型                                                                 | 描述                           | 默认值 |
| ------------ | -------------------------------------------------------------------- | ------------------------------ | ------ |
| className    | `string`                                                             | 自定义类名                     | -      |
| style        | `React.CSSProperties`                                                | 自定义样式                     | -      |
| classNames   | `Partial<Record<ColumnSemanticType, string>>`                        | 列结构化类名                   | -      |
| styles       | `Partial<Record<ColumnSemanticType, React.CSSProperties>>`           | 列结构化样式                   | -      |
| align        | `'left' \| 'right' \| 'center'`                                      | 对齐方式                       | -      |
| fixed        | `'left' \| 'right' \| true`                                          | 固定列                         | -      |
| filter       | `object`                                                             | 过滤配置                       | -      |
| sorter       | `boolean \| object`                                                  | 排序配置                       | -      |
| dataIndex    | `string`                                                             | 行数据索引                     | -      |
| key          | `string \| number`                                                   | 唯一key                        | -      |
| width        | `number \| string`                                                   | 设置宽度                       | -      |
| title        | `React.ReactNode`                                                    | 设置列头显示文本               | -      |
| helper       | `string \| React.ReactNode`                                          | 设置表头help 帮助图标          | -      |
| children     | `(record: Record<string, any>, rowIndex: number) => React.ReactNode` | 回调函数，用于自定义单元格内容 | -      |
| onCell       | `(record: object, rowIndex: number) => object`                       | 设置单元格属性                 | -      |
| onHeaderCell | `(column: ColumnProps) => object`                                    | 设置表头单元格属性             | -      |
| render       | `(record: Record<string, any>, rowIndex: number) => React.ReactNode` | 自定义渲染函数                 | -      |

### RowSelectionType

| 属性名                 | 类型                                                                                         | 描述                        | 默认值 |
| ---------------------- | -------------------------------------------------------------------------------------------- | --------------------------- | ------ |
| type                   | `'checkbox' \| 'radio'`                                                                      | 单选/多选                   | -      |
| width                  | `number \| string`                                                                           | 列宽                        | -      |
| selectAll              | `React.ReactNode \| boolean`                                                                 | 设置全选节点                | `true` |
| selectedRowKeys        | `Array<SelectionKeyType> \| SelectionKeyType`                                                | （受控）选中的行的keys      | -      |
| defaultSelectedRowKeys | `string[] \| number[]`                                                                       | 默认选中的行的keys          | -      |
| index                  | `number`                                                                                     | 设置Checkbox或Radio在第几列 | `1`    |
| disabled               | `boolean \| Array<boolean> \| ((record: Record<string, unknown>, index: number) => boolean)` | 是否禁用                    | -      |
| onCell                 | `(record: Record<string, unknown>, rowIndex: number) => Record<string, unknown>`             | 设置Checkbox或Radio属性     | -      |
| renderCell             | `(record: Record<string, any>, rowIndex: number) => React.ReactNode`                         | 渲染checkbox                | -      |
| onChange               | `(selectedRowKeys, selectedRows) => void`                                                    | 选中项发生变化时的回调      | -      |
| onSelectAll            | `(selected, selectedRowKeys, selectedRows) => void`                                          | 全选选中或取消时的回调      | -      |
| selections             | `Array<any>`                                                                                 | 选择配置                    | -      |

### ExpandableType

| 属性名                 | 类型                                                       | 描述                     | 默认值 |
| ---------------------- | ---------------------------------------------------------- | ------------------------ | ------ |
| index                  | `number`                                                   | 设置展开控制元素在第几列 | `1`    |
| icon                   | `(expanded: boolean) => React.ReactNode`                   | 自定义展开收起图标       | -      |
| width                  | `number \| string`                                         | 列宽                     | -      |
| defaultExpandAllRows   | `boolean`                                                  | 初始时，是否展开所有行   | -      |
| defaultExpandedRowKeys | `string[]`                                                 | 默认展开行               | -      |
| expandedRowKeys        | `Array<number \| string>`                                  | 展开行                   | -      |
| visible                | `boolean`                                                  | 展开列是否可见           | `true` |
| rowExpandable          | `(record: object) => boolean`                              | 设置是否允许展开         | -      |
| onExpand               | `(expanded: boolean, record: Record<string, any>) => void` | 点击展开图标时触发       | -      |
| onExpandedRowsChange   | `(expandedKeys?: Array<number \| string>) => void`         | 展开的行变化时触发       | -      |
| expandedRowRender      | `(record, index, page) => React.ReactNode`                 | 额外的展开行             | -      |
