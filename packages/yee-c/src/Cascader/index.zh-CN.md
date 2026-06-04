---
category: Components
title: Cascader
subtitle: 级联选择
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# Cascader 级联选择

级联选择框，用于多层级数据选择。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Cascader的基础用法"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的Cascader"></code>
<code src="./demo/fieldNames.tsx" title="自定义字段名" description="使用自定义字段名的Cascader"></code>
<code src="./demo/search.tsx" title="搜索" description="带搜索功能的Cascader"></code>
<code src="./demo/multiple.tsx" title="多选" description="支持多选的Cascader"></code>

## API

### CascaderProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根元素类名 | - |
| style | `React.CSSProperties` | 自定义根元素样式 | - |
| options | `Option[]` | 数据选项 | - |
| expandTrigger | `'hover' \| 'click'` | 展开触发方式 | - |
| defaultValue | `Array<string \| number> \| Array<Array<string \| number>>` | 默认值，非受控 | - |
| value | `Array<string \| number> \| Array<Array<string \| number>>` | 值，受控 | - |
| disabled | `boolean` | 禁用状态 | - |
| children | `React.ReactNode` | 自定义触发节点 | - |
| loading | `boolean` | 数据加载中 | - |
| multiple | `boolean` | 多选 | - |
| searchable | `boolean` | 是否可搜索 | - |
| placement | `CascaderPlacementType` | 弹出位置 | - |
| suffix | `React.ReactNode \| (() => React.ReactNode)` | 输入框后缀 | - |
| changeOnSelect | `boolean` | 点击每级菜单选项都会导致值发生变化 | - |
| fieldNames | `FieldNames` | 自定义选项字段名 | `{ label: 'label', value: 'value', children: 'children' }` |
| fullNode | `boolean` | 完整节点 | - |
| onlyParentNode | `boolean` | 仅父节点 | - |
| optionLabelProp | `string \| ((obj: object) => any)` | 选项标签属性 | - |
| popupClassName | `string` | 弹出层类名 | - |
| loadData | `(option: Option) => Promise<Array<Option>>` | 加载数据函数 | - |
| onChange | `(value: Array<Array<string \| number>> \| Array<string \| number> \| undefined, options: Array<Option>) => void` | 值变化回调 | - |
| onOpenChange | `(open: boolean) => void` | 显示隐藏回调 | - |

### CascaderPlacementType

| 类型 |
| --- |
| `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomRight' \| 'bottomLeft'` |

### Option

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| label | `string` | 标签 | - |
| value | `string \| number` | 值 | - |
| children | `Option[]` | 子选项 | - |
| disabled | `boolean` | 禁用状态 | - |
| isLeaf | `boolean` | 是否为叶子节点 | - |
| level | `number` | 层级 | - |
| [prop: string] | `unknown` | 其他属性 | - |

### FieldNames

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| label | `string` | 标签字段名 | - |
| value | `string` | 值字段名 | - |
| children | `string` | 子项字段名 | - |

## 注意事项

- 移动端不推荐使用级联选择，建议使用 WheelPicker 或 Picker 替代