---
category: Components
title: TableSelect
subtitle: 表格选择器
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# TableSelect 表格选择器 <span class="yee-mobile-badge" />

从表格数据中选择一个或多个选项的组件，结合了 Table 和 Select 的特性。

## 何时使用

- 当选项数据量较大时，需要以表格形式展示
- 需要展示更多列信息时（如年龄、地址、部门等）
- 需要对表格数据进行排序、筛选、分页时

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="单选模式的表格选择器"></code>
<code src="./demo/multiple.tsx" title="多选" description="多选模式的表格选择器"></code>
<code src="./demo/searchable.tsx" title="可搜索" description="带搜索功能的表格选择器"></code>
<code src="./demo/controlled.tsx" title="受控模式" description="受控模式的单选和多选"></code>
<code src="./demo/disabled.tsx" title="禁用与其他特性" description="禁用、可清除、自定义弹出位置"></code>
<code src="./demo/callbacks.tsx" title="回调与数据获取" description="完整的 onChange 回调和选中数据展示"></code>

## API

### TableSelectProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `'yee-table-select'` |
| className | `string` | 根元素类名 | - |
| style | `React.CSSProperties` | 根元素行内样式 | - |
| rowKey | `string \| ((record: any) => string)` | 数据的唯一标识字段名 | `'id'` |
| columns | `Array<any>` | 表格列的配置信息 | - |
| dataSource | `Array<InDataType>` | 数据源 | - |
| rowSelection | `RowSelectionType` | 行选择配置 | - |
| value | `SelectionKeyType \| SelectionKeyType[]` | 受控值 | - |
| defaultValue | `SelectionKeyType \| SelectionKeyType[]` | 默认值 | - |
| disabled | `boolean` | 是否禁用 | - |
| placement | `'bottomLeft' \| 'topLeft'` | 弹出层位置 | `'bottomLeft'` |
| searchable | `boolean` | 是否可搜索 | `true` |
| searchOnInput | `boolean` | 是否边输入边搜索 | `true` |
| allowClear | `boolean` | 是否允许清除 | `true` |
| closable | `boolean` | 标签是否可关闭 | `true` |
| placeholder | `string` | 占位符文本 | - |
| optionLabelProp | `string \| ((option: InDataType) => string)` | 选项标签属性 | `'name'` |
| type | `'radio' \| 'checkbox'` | 选择类型 | `'radio'` |
| options | `TagType[]` | 预设选项 | - |
| isShowFilter | `boolean` | 是否显示过滤器(多选时 All/Selected) | `true` |
| containerId | `string` | 容器 ID(用于弹出层挂载) | - |
| io | `'out'` | 输入方向 | - |
| onChange | `(keys, data, checked, changeData) => void` | 选中变更回调 | - |
| onSearch | `(value: string, e?) => void` | 搜索回调 | - |
| onOpenChange | `(open: boolean) => void` | 弹出层状态变更回调 | - |

### RowSelectionType

表格行选择配置，继承自 Table 组件的 RowSelectionType。

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| type | `'radio' \| 'checkbox'` | 单选/多选 | - |
| selectedRowKeys | `Array<SelectionKeyType> \| SelectionKeyType` | (受控)选中的行keys | - |
| defaultSelectedRowKeys | `Array<SelectionKeyType> \| SelectionKeyType` | 默认选中的行keys | - |
| onChange | `(selectedRowKeys, selectedRows) => void` | 选中项发生变化时的回调 | - |

## 方法

### InternalTable

InternalTable 组件是 TableSelect 的内部组件，通常不需要直接使用。

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| rowKey | `string` | 数据的唯一标识字段名 | - |
| columns | `Array<any>` | 表格列的配置信息 | - |
| dataSource | `Array<InDataType>` | 数据源 | - |
| rowSelection | `RowSelectionType` | 行选择配置 | - |
| type | `'radio' \| 'checkbox'` | 选择类型 | - |
| value | `SelectedKeyType \| Array<SelectedKeyType>` | 选中的值 | - |
| isShowFilter | `boolean` | 是否显示过滤器 | `true` |
| visible | `boolean` | 弹出层是否可见 | - |

## 注意事项

- 已适配移动端（弹窗限制最大宽高并支持滚动）
