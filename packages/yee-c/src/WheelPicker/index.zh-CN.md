---
category: Components
title: WheelPicker
subtitle: 滚轮选择器
group:
  title: 数据录入
  order: 13
toc: 'content'
demo:
  cols: 2
---

# WheelPicker 滚轮选择器 <span class="yee-mobile-badge" />

移动端风格的滚动选择器，用于从多列选项中选择值。

## 代码演示

<code src="./demo/basic.tsx" title="单列选择" description="基础的单列滚轮选择器"></code>
<code src="./demo/multi-column.tsx" title="多列选择" description="多列选择器，如日期选择"></code>

## API

### WheelPickerProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `'yee-wheel-picker'` |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义行内样式 | - |
| columns | `WheelColumn[]` | 列定义及选项 | - |
| value | `number[]` | 每列选中项的索引 | - |
| onChange | `(value: number[]) => void` | 值变化回调 | - |
| itemHeight | `number` | 每项高度（像素） | `40` |
| visibleItemCount | `number` | 可见项数量 | `5` |

### WheelColumn

| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| options | `WheelColumnOption[]` | 列选项 |

### WheelColumnOption

| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| label | `string` | 显示文本 |
| value | `string \| number` | 选项值 |
