---
category: Components
title: Segmented
subtitle: 分段选择器
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# Segmented 分段选择器

展示一组互斥选项，选中项以高亮滑块（thumb）跟随切换，常用于视图切换、模式切换等场景。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Segmented 的基础用法，支持受控与非受控，options 支持配置对象或原始值简写"></code>
<code src="./demo/disabled.tsx" title="禁用" description="禁用单个选项或整组"></code>
<code src="./demo/size.tsx" title="尺寸" description="small / default / large 三种尺寸"></code>
<code src="./demo/block.tsx" title="撑满与图标" description="block 撑满容器宽度，选项可带图标"></code>

## API

### SegmentedProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<'item' \| 'thumb', string>>` | 语义化结构类名 | - |
| styles | `Partial<Record<'item' \| 'thumb', React.CSSProperties>>` | 语义化结构样式 | - |
| options | `Array<SegmentedOption>` | 选项，支持配置对象或 `string \| number` 简写 | - |
| value | `string \| number` | 受控选中值 | - |
| defaultValue | `string \| number` | 默认选中值 | - |
| onChange | `(value: string \| number) => void` | 值改变时的回调 | - |
| disabled | `boolean` | 是否禁用所有选项 | - |
| size | `'small' \| 'default' \| 'large'` | 尺寸 | - |
| block | `boolean` | 是否撑满容器宽度，选项等分 | - |
| name | `string` | 底层 radio input 的 name，用于表单分组 | - |

### SegmentedOption

| 类型 | 描述 |
| --- | --- |
| `SegmentedLabeledOption` | `{ label?: ReactNode; value: string \| number; disabled?: boolean; icon?: ReactNode; className?: string }` |
| `SegmentedRawOption` | `string \| number`，简写形式，label 取值转字符串 |
