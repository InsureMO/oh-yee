---
category: Components
title: TreeSelect
subtitle: 树选择
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# TreeSelect 树选择 <span class="yee-mobile-badge" />

树型选择控件。

## 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。

## 代码演示

<code src="./demo/basic.tsx" title="基本" description="最简单的用法。"></code>
<code src="./demo/multiple.tsx" title="多选" description="通过设置 `mode` 属性开启多选模式。"></code>
<code src="./demo/checkable.tsx" title="可勾选" description="使用勾选框进行多选。"></code>
<code src="./demo/searchable.tsx" title="可搜索" description="可搜索的树选择。"></code>

## API

### TreeSelectProps

| 属性名 | 类型 | 描述 | 默认值 |
|--------|------|------|--------|
| prefixCls | `string` | 自定义类名前缀 | `'yee-tree-select'` |
| className | `string` | 根元素类名 | - |
| style | `React.CSSProperties` | 根元素行内样式 | - |
| allowClear | `boolean` | 是否显示清除按钮 | `true` |
| defaultOpen | `boolean` | 是否默认展开下拉菜单 | - |
| defaultValue | `string \| number \| Array<string \| number>` | 默认值 | - |
| value | `string \| number \| Array<string \| number>` | 受控值 | - |
| disabled | `boolean` | 是否禁用 | - |
| placeholder | `string` | 选择框默认文本 | - |
| placement | `'top' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | 下拉框弹出位置 | `'bottomLeft'` |
| searchable | `boolean` | 是否可搜索 | `true` |
| mode | `'multiple'` | 选择模式，支持多选 | - |
| checkable | `boolean` | 是否显示复选框 | `false` |
| fieldNames | `{ key?: keyof T; label?: keyof T; children?: keyof T }` | 自定义节点 key、title、children 字段 | `{ key: 'key', label: 'label', children: 'children' }` |
| optionLabelProp | `string \| ((option: T) => string)` | 回填到选择框里的属性 | `'label'` |
| dataSource | `T \| T[]` | 数据源 | - |
| defaultExpandAll | `boolean` | 默认展开所有树节点 | - |
| defaultExpandedKeys | `string[]` | 默认展开指定的树节点 | - |
| expandedKeys | `string[]` | 受控展开的树节点 | - |
| multiple | `boolean` | 树节点数据是否支持多选 | `false` |
| showIcon | `boolean` | 是否显示节点图标 | `true` |
| icon | `React.ReactNode \| ((props: TreeProps<T>) => React.ReactNode)` | 标题前的图标，需设置 showIcon 为 true | - |
| onChange | `(value: string \| number \| Array<string \| number>, nodes?: T \| T[]) => void` | 值改变时的回调函数 | - |
| onFilter | `(value: string, dataSource: Array<T>) => Array<T>` | 搜索时的回调函数 | - |

### Tree 属性

TreeSelect 还支持 Tree 组件的大部分属性，用于控制树的行为。

## 注意事项

- 已适配移动端（弹窗高度自适应视口、限制最大宽度防止溢出）