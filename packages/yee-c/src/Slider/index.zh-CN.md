---
category: Components
title: Slider
subtitle: 滑动输入条
group:
  title: 数据录入
toc: 'content'
---

# Slider

滑动型输入器，展示当前值和可选范围。

## 何时使用

当用户需要在数值区间/自定义区间内进行选择时，可为已有展示用的控件。

## 代码演示

<code src="./demo/basic.tsx">基础用法</code>
<code src="./demo/range.tsx">范围选择</code>
<code src="./demo/disabled.tsx">禁用状态</code>
<code src="./demo/custom.tsx">自定义范围和步长</code>
<code src="./demo/tooltip.tsx">隐藏Tooltip</code>

## API

| 参数              | 说明               | 类型                                        | 默认值     |
| ----------------- | ------------------ | ------------------------------------------- | ---------- |
| defaultValue      | 设置初始的值       | number                                      | 0          |
| value             | 设置当前值         | number                                      | -          |
| min               | 最小值             | number                                      | 0          |
| max               | 最大值             | number                                      | 100        |
| step              | 步长               | number                                      | 1          |
| disabled          | 是否禁用           | boolean                                     | false      |
| range             | 是否为范围选择器   | boolean                                     | false      |
| defaultRangeValue | 范围选择器的默认值 | [number, number]                            | [0, 100]   |
| rangeValue        | 范围选择器的当前值 | [number, number]                            | -          |
| tooltipVisible    | 是否显示Tooltip    | boolean                                     | true       |
| onChange          | 值改变时的回调     | (value: number \| [number, number]) => void | -          |
| onAfterChange     | 鼠标松开时的回调   | (value: number \| [number, number]) => void | -          |
| prefixCls         | 自定义类名前缀     | string                                      | yee-slider |
| className         | 自定义类名         | string                                      | -          |
| style             | 自定义样式         | React.CSSProperties                         | -          |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |
