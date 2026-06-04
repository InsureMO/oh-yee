---
category: Components
title: Select
subtitle: 选择器
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# Select 选择器

从一组选项中选择一个或多个选项的组件。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Select的基础用法"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的Select"></code>
<code src="./demo/disabled.tsx" title="禁用" description="禁用的Select"></code>
<code src="./demo/allowClear.tsx" title="可清除" description="可清除已选值"></code>
<code src="./demo/multiple.tsx" title="多选" description="多选模式"></code>
<code src="./demo/search.tsx" title="可搜索" description="可搜索的Select"></code>
<code src="./demo/tags.tsx" title="标签模式" description="标签模式的Select"></code>

## API

### SelectProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 根元素类名 | - |
| style | `React.CSSProperties` | 根元素行内样式 | - |
| allowClear | `boolean` | 是否显示清除按钮 | - |
| defaultOpen | `boolean` | 是否默认展开下拉菜单 | - |
| defaultValue | `string \| number \| Array<string \| number>` | 默认值 | - |
| value | `string \| number \| Array<string \| number>` | 受控值 | - |
| disabled | `boolean` | 是否禁用 | - |
| placeholder | `string` | 选择框默认文本 | - |
| placement | `'top' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | 下拉框弹出位置 | - |
| searchable | `boolean` | 是否可搜索 | - |
| options | `Array<Option>` | 下拉框选项 | - |
| mode | `'multiple' \| 'tags'` | 选择模式 | - |
| codeTableName | `string` | 代码表 | - |
| optionFilterProp | `string` | 搜索时对比的属性 | `label` |
| optionLabelProp | `string \| (() => string)` | 回填到选择框里的属性 | - |
| onChange | `(value: string \| number \| Array<string \| number>, options?: Option \| undefined \| Option[]) => void` | 值改变时的回调函数 | - |
| onFilter | `(value: string, options: Array<Option>) => Array<Option>` | 搜索时的回调函数 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### Option

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| disabled | `boolean` | 是否禁用 | - |
| title | `string` | 原生title | - |
| label | `string` | 显示的标题 | - |
| value | `string \| number` | 值 | - |
| [prop: string] | `any` | 其他属性 | - |