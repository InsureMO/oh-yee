---
category: Components
title: Selector
subtitle: 选择器
group:
  title: 数据录入
  order: 12
toc: 'content'
demo:
  cols: 2
---

# Selector 选择器

用于展示已选值的标签选择器输入组件。在 Select、TreeSelect 等选择类组件内部使用。

## 代码演示

<code src="./demo/basic.tsx" title="单选模式" description="基础单值选择器"></code>
<code src="./demo/multiple.tsx" title="多选模式" description="多选模式下的标签选择器"></code>

## API

### SelectorProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `'yee-selector'` |
| searchable | `boolean` | 是否可搜索 | `true` |
| disabled | `boolean` | 是否禁用 | - |
| allowClear | `boolean` | 是否显示清除按钮 | `true` |
| placeholder | `string` | 占位文本 | - |
| closable | `boolean \| ((option: TagType) => boolean)` | 是否可移除标签 | `true` |
| searchOnInput | `boolean` | 是否在输入时搜索 | - |
| maxCount | `number` | 多选/标签模式下的最大可选数量 | - |
| mode | `'multiple' \| 'tags'` | 选择模式 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义行内样式 | - |
| options | `Array<TagType>` | 已选的选项标签 | `[]` |
| selectedKeys | `Array<string \| number>` | 已选项的 key | `[]` |
| suffix | `React.ReactNode \| (() => React.ReactNode)` | 自定义后缀图标 | - |
| open | `boolean` | 下拉是否展开 | - |
| loading | `boolean` | 是否加载中 | - |
| optionLabelProp | `string \| ((option: TagType) => string)` | 自定义选项显示文本 | `'label'` |
| value | `string` | 受控的搜索输入值 | - |
| onOpenChange | `(open: boolean) => void` | 展开状态变化回调 | - |
| onSearch | `(value: string, e?: any) => void` | 搜索值变化回调 | - |
| onClear | `() => void` | 清除回调 | - |
| onRemove | `(option: TagType) => void` | 移除标签回调 | - |
| onClick | `(e: React.MouseEvent<HTMLDivElement>) => void` | 点击回调 | - |

### TagType

| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| label | `React.ReactNode` | 显示文本 |
| value | `string \| number` | 选项值 |
